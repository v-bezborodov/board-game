export class Game {
  _id: string;
  name: string;
  patternId: string;
  patternName: string;
  date: Date;
  description: string;
  price: string;
  avatar: string;
}

export class GameDto {
  _id: string;
  name: string;
  patternId: string;
  patternName: string;
  userId: string;
  date: Date;
  adminName: string;
  hasRequest: boolean;
  isMember: boolean;
  membersCount: number;
  status: string;
  description: string;
  price: string;
  avatar: string;
}

export class GameProfileDto {
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
