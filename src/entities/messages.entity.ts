import { User } from './user.entity';

export class Messages {
  private user: User;
  private message: string;

  constructor(user: User, message: string) {
    this.user = user;
    this.message = message;
  }
}
