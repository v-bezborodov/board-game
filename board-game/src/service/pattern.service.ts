import {Role} from "../enum/role";
import {PatternRepository} from "../repository/pattern.repository";
import {UserService} from "./user.service";

export class PatternService {

    public static async create(pattern: any): Promise<any> {
        pattern.isPublish = false;
        return await PatternRepository.create(pattern);
    }

    public static async publish(patternId: string): Promise<any> {
        await PatternRepository.publish(patternId);
    }

    public static async update(pattern: any): Promise<any> {
        return await PatternRepository.update(pattern);
    }

    public static async deleteById(id: string) {
        await PatternRepository.deleteById(id);
    }

    public static async getAllByUserId(userId: string): Promise<any> {
        const user = await UserService.findById(userId);

        if (user!.role == Role.ADMIN) {
            return PatternRepository.getAll();
        }

        return PatternRepository.getAllByUserId(userId);
    }

    public static async getAllPublishingByUserId(userId: string): Promise<any> {
        return await PatternRepository.getAllPublishingByUserId(userId);
    }

    public static async copy(id: string, name: string): Promise<any> {
        const pattern = await this.findById(id);
        const newPattern = pattern._doc;
        newPattern._id = undefined;
        newPattern.name = name;

        return this.create(newPattern);
    }

    public static async findById(patternId: string): Promise<any> {
        const pattern = await PatternRepository.findById(patternId);

        if (pattern == null) {
            throw new Error("Pattern was not found");
        }

        return pattern;
    }
}


