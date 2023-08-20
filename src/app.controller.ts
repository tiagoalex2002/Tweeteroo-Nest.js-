import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  signUp(body: CreateUserDto) {
    return this.appService.signUp(body);
  }

  @Get()
  getHello() {}
}
