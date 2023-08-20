import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Messages } from './entities/messages.entity';
import { CreateUserDto } from './dtos/user.dtos';

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
}
