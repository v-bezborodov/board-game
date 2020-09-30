import {Role} from '../enums/role.enum';
import {GameDto} from './game.model';
import {PatternShortDto} from './pattern.model';

export class User {
  _id: string;
  role: Role;
  name: string;
  email: string;
  password: string;
  avatar: string;
  gameAdminInfo: string;
  country: string;
  city: string;
}

export class GameAdminProfile {
  _id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  gameAdminInfo: string;
  country: string;
  city: string;

  nearestGame: GameDto;
  patterns: PatternShortDto[];
}

export class GameAdminInfo {
  gameAdminInfo: string;
  country: string;
  city: string;
}
