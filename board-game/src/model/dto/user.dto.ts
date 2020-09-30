import {IGameDto} from "./game.dto";
import {IPatternShortDto} from "./pattern.dto";

export interface IGameAdminProfileDto {
    _id: any;
    name: string;
    role: string;
    email: string;
    avatar: string;
    gameAdminInfo: string;
    country: string;
    city: string;

    nearestGame: IGameDto;
    patterns: IPatternShortDto[];
}
export interface IGameAdminInfo {
    gameAdminInfo: string;
    country: string;
    city: string;
}
