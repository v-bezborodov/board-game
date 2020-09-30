import {DocumentQuery} from "mongoose";
import { Pattern} from "../model/pattern";

export class PatternRepository {

    public static create(pattern: any): Promise<any> {
        return Pattern.create(pattern);
    }

    public static async update(pattern: any): Promise<any> {
        return Pattern.update({_id: pattern._id}, pattern);
    }

    public static async publish(patternId: string) {
        await Pattern.update({_id: patternId}, {isPublish: true},  {upsert:true});
    }

    public static getAll(): DocumentQuery<any[], any> & {} {
        return Pattern.find({});
    }

    public static getAllByUserId(userId: string): DocumentQuery<any[], any> & {} {
        return Pattern.find({userId: userId});
    }

    public static async getAllPublishingByUserId(userId: string): Promise<any> {
        return Pattern.find({userId: userId, isPublish: true});
    }

    public static async deleteById(id: string) {
        (await Pattern.findOne({_id: id}))!.remove()
    }

    public static async findById(id: string): Promise<any | null> {
        return Pattern.findOne({_id: id});
    }

}
