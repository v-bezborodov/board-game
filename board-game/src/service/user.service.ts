import bcrypt from "bcrypt-nodejs";
import {Role} from "../enum/role";
import {IGameAdminInfo, IGameAdminProfileDto} from "../model/dto/user.dto";
import {IUser, IUserModel} from "../model/user";
import {UserRepository} from "../repository/user.repository";
import {GameService} from "./game.service";
import {PatternService} from "./pattern.service";

export class UserService {

    public static async isExistByEmail(email: string): Promise<boolean> {
        return await UserRepository.isExistByEmail(email);
    }

    public static async findById(id: string): Promise<IUserModel | null> {
        return await UserRepository.findById(id).catch(() => {
            throw new Error("User with this id is not found.");
        });
    }

    public static async getGameAdminProfile(id: string) : Promise<IGameAdminProfileDto | null> {
        const user =  await UserRepository.findById(id).catch(() => {
            throw new Error("Game admin with this id is not found.");
        });
        if (user!.role !== 'GAME ADMIN') {
            throw new Error("Game admin with this id is not found.");
        }

        const games = await GameService.getAllByUserId(user!._id);
        games.sort((a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString()));
        const pattern = await PatternService.getAllPublishingByUserId(user!._id);
        return {
            _id: user!._id,
            name: user!.name,
            role: user!.role,
            email: user!.email,
            avatar: user!.avatar,
            gameAdminInfo: user!.gameAdminInfo,
            country: user!.country,
            city: user!.city,
            nearestGame: games[0],
            patterns: pattern
        };

    }

    public static async findAll(id: string): Promise<IUserModel[]> {
        const user = await UserRepository.findById(id).catch(() => {
            throw new Error("User with this id is not found.");
        });

        // if (user!.role != Role.ADMIN) {
        //     throw new Error("You have not permissions");
        // }

        return (await UserRepository.findAll()).filter(temp => temp._id != user!._id);
    }

    public static async findByEmail(email: string): Promise<IUser | null> {
        return await UserRepository.findByEmail(email).catch(() => {
            throw new Error("User with this email is not found.");
        });
    }

    public static async create(user: IUser): Promise<IUser> {
        return await UserRepository.create(user);
    }

    public static async updatePersonalData(user: any): Promise<IUser> {
        const currentUser: any = await this.findById(user._id)!;

        currentUser!.name = user.name;
        currentUser!.avatar = user.avatar;
        return await currentUser!.save();
    }

    public static async updateGameAdminInfo(userId: string, gameAdminInfo: IGameAdminInfo): Promise<IUser> {
        const user = await this.findById(userId);

        user!.gameAdminInfo = gameAdminInfo.gameAdminInfo;
        user!.country = gameAdminInfo.country;
        user!.city = gameAdminInfo.city;
        return await user!.save();
    }

    public static async updatePassword(user: any) {
        let currentUser = await this.findById(user._id);

        if (!user || !bcrypt.compareSync(user.password, currentUser!.password)) {
            throw new Error("Password is incorrect");
        }

        const salt = bcrypt.genSaltSync(12);

        currentUser!.password = bcrypt.hashSync(user.newPassword, salt);

        return await currentUser!.save();
    }

}
