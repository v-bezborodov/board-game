import {IGameDto, IGameProfileDto} from "../model/dto/game.dto";
import {IRequestDto} from "../model/dto/request.dto";
import {IGame, IGameModel} from "../model/game";
import {GameRepository} from "../repository/game.repository";
import {SocketService} from "./socket.service";
import {UserService} from "./user.service";

const axios = require('axios');

export class GameService {

    public static async create(game: any): Promise<IGame> {
        game.requests = [];
        game.members = [];
        game.activeMembers = [];
        game.status = 'UNACTIVE';
        return await GameRepository.create(game);
    }

    public static async deleteById(id: string): Promise<IGame> {
        return await GameRepository.delete(id);
    }

    public static async getProfileById(id: string): Promise<IGameProfileDto> {
        const game = await GameRepository.getById(id);

        if (!game) {
            throw new Error("Игра не была найдена");
        }
        const gameDto: IGameProfileDto = {
            _id: game._id,
            name: game.name,
            patternId: game.patternId,
            patternName: game.patternName,
            date: game.date,
            userId: game.userId,
            adminName: (await UserService.findById(game.userId))!.name,
            status: game.status,
            price: game.price,
            description: game.description,
            avatar: game.avatar
        };
        return gameDto;
    }

    public static async getById(id: string): Promise<IGameModel> {
        const game = await GameRepository.getById(id);

        if (!game) {
            throw new Error("Игра не была найдена");
        }

        return game;
    }

    public static async createRequest(gameId: string, userId: string) {
        const game = await this.getById(gameId);

        if (game.requests.includes(userId) || game.members.includes(userId)) {
            return;
        }

        game.requests.push(userId);
        await game.save();
    }

    public static async acceptRequest(gameId: string, userId: string) {
        const game = await this.getById(gameId);

        game.requests = game.requests.filter(requestUserId => requestUserId !== userId);
        game.members = [...game.members, userId];

        await game.save();
    }

    public static async updatePosition(game: any) {
        await GameRepository.updatePosition(game);
    }

    public static async declineRequest(gameId: string, userId: string) {
        const game = await this.getById(gameId);

        game.requests = game.requests.filter(requestUserId => requestUserId !== userId);

        await game.save();
    }

    public static async getRequests(userId: string): Promise<IRequestDto[]> {
        const games = await GameRepository.getAllByUserId(userId);
        const requests: IRequestDto[] = [];

        for (const game of games) {
            for (const requestUserId of game.requests) {
                requests.push({
                    gameId: game._id,
                    gameName: game.name,
                    patternName: game.patternName,
                    userId: requestUserId,
                    userName: (await UserService.findById(requestUserId))!.name
                });
            }
        }

        return requests;
    }

    public static async getAll(userId: string): Promise<IGameDto[]> {
        const games = await GameRepository.getAll();

        const gameDtos: IGameDto[] = [];

        for (const game of games) {
            gameDtos.push({
                _id: game._id,
                name: game.name,
                patternId: game.patternId,
                patternName: game.patternName,
                userId: game.userId,
                date: game.date,
                adminName: (await UserService.findById(game.userId))!.name,
                hasRequest: game.requests.includes(userId),
                isMember: game.members.includes(userId),
                membersCount: game.members.length,
                status: game.status,
                price: game.price,
                description: game.description,
                avatar: game.avatar
            });
        }

        return gameDtos;
    }

    public static async getAllByUserId(userId: string): Promise<IGameDto[]> {
        const games = await GameRepository.getAllByUserId(userId);

        const gameDtos: IGameDto[] = [];

        for (const game of games) {
            gameDtos.push({
                _id: game._id,
                name: game.name,
                patternId: game.patternId,
                patternName: game.patternName,
                userId: game.userId,
                date: game.date,
                adminName: (await UserService.findById(game.userId))!.name,
                hasRequest: game.requests.includes(userId),
                isMember: game.members.includes(userId),
                membersCount: game.members.length,
                status: game.status,
                price: game.price,
                description: game.description,
                avatar: game.avatar
            });
        }

        return gameDtos;
    }

    public static async start(id: string) {
        const game = await this.getById(id);

        const meetingId = await this.getMeetingId(game.name);

        game.status = 'ACTIVE';
        game.meetingId = meetingId;
        await game.save();

        SocketService.createRoom(game.id);
    }

    private static async getMeetingId(name: string) {
        const response = await axios.post('https://api.zoom.us/v2/users/c.amazon@yandex.ru/meetings', {
                topic: name,
                type: 1,
                settings: {
                    host_video: "true",
                    participant_video: "true"
                }
            },
            {
                headers: {
                    "User-Agent": "Zoom-api-Jwt-Request",
                    "content-type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZhSzZyNlN1UVZPVUdyUm5WLWM2R3ciLCJleHAiOjE1OTYyOTMxMzcsImlhdCI6MTU5NTY4ODMzN30.kqFzwqozSefClw2YYvjd0KNNWVGPGzE2wDUBdo3U9Eg"
                }
            });

        return response.data.id;
    }

}
