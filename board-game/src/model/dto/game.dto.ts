export interface IGameDto {
    _id: any;
    name: string;
    patternId: string;
    patternName: string;
    userId: string;
    adminName: string;
    hasRequest: boolean;
    isMember: boolean;
    membersCount: number;
    status: string;
    date: Date;
    price: string;
    description: string;
    avatar: string;
}

export interface IGameProfileDto {
    _id: any;
    name: string;
    patternId: string;
    patternName: string;
    userId: string;
    adminName: string;
    status: string;
    date: Date;
    price: string;
    description: string;
    avatar: string;
}
