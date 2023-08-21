import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
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

  getHealth(): string {
    return "I'm okay!";
  }

  signUp(body: CreateUserDto) {
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user._username === body.username) {
        throw new ConflictException('User already exists');
      }
    }
    const usuario = new User(body.username, body.avatar);
    return this.users.push(usuario);
  }

  postTweets(body: CreateMessagesDto) {
    let h = 0;
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user._username === body.username) {
        const message = new Messages(user, body.tweet);
        this.messages.push(message);
        h = 1;
      }
    }
    if (h === 0) {
      throw new UnauthorizedException('Unauthorized User');
    } else {
      return this.messages;
    }
  }

  getTweets(page: string) {
    const number = Number(page);
    if (number < 1) {
      throw new BadRequestException('BAD_REQUEST');
    } else if (number >= 1) {
      const tweets = [];
      if (this.messages.length === 0) {
        return tweets;
      }
      let start;
      if (number === 1) {
        start = 1;
      } else {
        start = 15 * (number - 1) + 1;
      }
      const limit = 15 * number;
      for (let i = start; i < limit && i < this.messages.length + 1; i++) {
        const tweet = this.messages[this.messages.length - i];
        tweets.push({
          username: tweet._user._username,
          avatar: tweet._user._avatar,
          tweet: tweet._message,
        });
      }
      return tweets;
    }
    const tweets = [];
    if (this.messages.length === 0) {
      return tweets;
    } else if (this.messages.length > 15) {
      for (let i = 1; i < 16; i++) {
        const tweet = this.messages[this.messages.length - i];
        tweets.push({
          username: tweet._user._username,
          avatar: tweet._user._avatar,
          tweet: tweet._message,
        });
      }
      return tweets;
    } else {
      return this.messages;
    }
  }

  getUserTweets(username: string) {
    const tweets = [];
    for (let i = 0; i < this.messages.length; i++) {
      const tweet = this.messages[i];
      if (tweet._user._username === username) {
        tweets.push({
          username: tweet._user._username,
          avatar: tweet._user._avatar,
          tweet: tweet._message,
        });
      }
    }
    return tweets;
  }
}
