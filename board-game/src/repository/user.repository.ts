import {IUser, IUserModel, User} from "../model/user";

export class UserRepository {

    public static async create(user: IUser): Promise<IUser> {
        return await User.create(user);
    }

    public static async isExistByEmail(email: string): Promise<boolean> {
        return User.exists({email: email});
    }

    public static async findById(userId: string): Promise<IUserModel | null> {
        return User.findById(userId);
    }

    public static async findAll(): Promise<IUserModel[]> {
        return await User.find({});
    }

    public static async findByEmail(email: string): Promise<IUser | null> {
        return (await User.find({email: email}))[0];
    }

    public static async delete(userId: string): Promise<any> {
        return User.deleteOne({_id: userId});
    }
}
