import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Messages } from './entities/messages.entity';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateMessagesDto } from './dtos/messages.dtos';

@Injectable()
export class AppService {
  private users: User[];
  private messages: Messages[];

  constructor() {
    this.users = [];
    this.messages = [];
  }

  signUp(body: CreateUserDto) {
    const user = new User(body.name, body.avatar);
    return this.users.push(user);
  }

  postTweets(body: CreateMessagesDto) {
    if (this.users.includes(body.user)) {
      const message = new Messages(body.user, body.message);
      return this.messages.push(message);
    } else {
      throw new UnauthorizedException('Unauthorized User');
    }
  }

  getTweets() {
    const tweets = [];
    if (this.messages.length === 0) {
      return this.messages;
    } else if (this.messages.length > 15) {
      for (let i = 1; i < 15; i++) {
        const tweet = this.messages[this.messages.length - i];
        tweets.push(tweet);
      }
      return tweets;
    } else {
      return this.messages;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getUserTweets(username: string) {}
}
