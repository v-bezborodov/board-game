import {GameService} from "./game.service";
import {PatternService} from "./pattern.service";
import {UserService} from "./user.service";
const axios = require('axios');
const crypto = require('crypto')



export class SocketService {
    private static _io: any;
    private static rooms: any = {};

    public static setIo(io: any) {
        this._io = io;
        // this.setListener();
    }

    public static async createRoom(gameId: string) {
        if (this.rooms[gameId]) {
            return;
        }

        const room = this._io.of(`/${gameId}`);
        this.rooms[gameId] = room;

        const game = await GameService.getById(gameId);
        const pattern = await PatternService.findById(game.patternId);

        pattern._doc.decks.forEach((deck: any) => {
            deck.cards.forEach((card: any) => {
                card.position = {x: 0, y: 0};
            });
        });

        game.decks = pattern._doc.decks;
        game.save();

        room.on('connection', async (socket: any) => {
            const userId = socket.handshake.query.userId;
            const user = await UserService.findById(userId);
            let game = await GameService.getById(gameId);

            for (const member of game.activeMembers) {
                if (member.id === userId) {
                    return;
                }
            }

            const newMember = {
                id: userId,
                color: this.getRandomColor(),
                name: user?.name,
                position: {x: 0, y: 0},
                isAdmin: userId === game.userId
            };

            game.activeMembers.push(newMember);
            const pattern = await PatternService.findById(game.patternId);
            await GameService.updatePosition(game);

            const timestamp = new Date().getTime() - 30000
            const msg = Buffer.from('vaK6r6SuQVOUGrRnV-c6Gw' + game.meetingId + timestamp + 0).toString('base64')
            const hash = crypto.createHmac('sha256', 'BunEnI7Gxe2nkRsF0TG51SkoTicJvrFC7azi').update(msg).digest('base64')
            const signature = Buffer.from(`vaK6r6SuQVOUGrRnV-c6Gw.${game.meetingId}.${timestamp}.${0}.${hash}`).toString('base64')

            socket.json.send({
                'event': 'connected',
                'background': pattern._doc.avatar,
                'signature': signature,
                'meetingId': game.meetingId,
                'members': game.activeMembers,
                'decks': game.decks,
                'adminId': pattern._doc.userId
            });

            socket.broadcast.json.send({'event': 'user_join', 'members': game.activeMembers});

            socket.on('move-chip', async (msg: any) => {
                socket.broadcast.json.send({'event': 'moved-chip', ...msg});
                game = await GameService.getById(gameId);
                game.activeMembers.filter(member => member.id == userId)[0].position = {
                    x: msg.position.x,
                    y: msg.position.y
                };
                GameService.updatePosition(game);
            });

            socket.on('move-card', async (msg: any) => {
                socket.broadcast.json.send({'event': 'moved-card', ...msg});
                game = await GameService.getById(gameId);
                game.decks
                    .find(deck => deck._id === msg.deckId).cards
                    .find((card: any) => card._id === msg.cardId)
                    .position = msg.position;

                GameService.updatePosition(game);
            });

            socket.on('state-card-change', async (msg: any) => {
                socket.broadcast.json.send({'event': 'state-card-changed', ...msg});
                game = await GameService.getById(gameId);
                game.decks
                    .find(deck => deck._id === msg.deckId).cards
                    .find((card: any) => card._id === msg.cardId)
                    .isOpen = msg.state;

                GameService.updatePosition(game);
            });

            socket.on('close-game', async (msg: any) => {
                socket.broadcast.json.send({'event': 'game-closed', ...msg});
                game = await GameService.getById(gameId);
                game.decks = [];
                game.activeMembers = [];
                game.status = 'INACTIVE';

                this.rooms[gameId] = undefined;
                this.deleteMeeting(game.meetingId);


                GameService.updatePosition(game);
            });

            socket.on('disconnect', async () => {
                socket.broadcast.json.send({'event': 'user_disconnect', 'id': userId});
                game = await GameService.getById(gameId);
                game.activeMembers = game.activeMembers.filter(member => member.id !== userId);
                GameService.updatePosition(game);
            });
        });
    }

    private static async deleteMeeting(meetingId: number) {
        const response = axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`,
            {
                headers: {
                    "User-Agent": "Zoom-api-Jwt-Request",
                    "content-type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZhSzZyNlN1UVZPVUdyUm5WLWM2R3ciLCJleHAiOjE3NTEyNDIyNjAsImlhdCI6MTU5MzQ3MDUxNH0.8VgusCIxo7RKPAYbvK-qziQmy1Rkeo-Re8lMKQ8NEOE"
                }
            });

        console.log(response);
    }

    private static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
