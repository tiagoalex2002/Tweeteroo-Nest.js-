import { User } from './user.entity';

export class Messages {
  private user: User;
  private tweet: string;

  constructor(user: User, message: string) {
    this.user = user;
    this.tweet = message;
  }

  get _user() {
    return this.user;
  }
  get _message() {
    return this.tweet;
  }
}
