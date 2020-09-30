import {Game, IGame, IGameModel} from "../model/game";

export class GameRepository {

    public static create(game: IGame): Promise<IGame> {
        return Game.create(game);
    }

    public static async getAll(): Promise<IGame[]> {
        return await Game.find({});
    }

    public static async getAllByUserId(userId: string): Promise<IGame[]> {
        return await Game.find({userId: userId});
    }

    public static async updatePosition(game: any) {
        await Game.update({_id: game._id}, {"activeMembers": game.activeMembers, "decks": game.decks, "status": game.status});
    }

    public static async getById(gameId: string): Promise<IGameModel | null> {
        return await Game.findById(gameId);
    }

    public static async delete(gameId: string): Promise<any> {
        return Game.deleteOne({_id: gameId});
    }
}
