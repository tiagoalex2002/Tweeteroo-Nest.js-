import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateMessagesDto } from './dtos/messages.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sign-up')
  signUp(@Body() body: CreateUserDto) {
    return this.appService.signUp(body);
  }

  @Post('/tweets')
  postTweets(@Body() body: CreateMessagesDto) {
    try {
      return this.appService.postTweets(body);
    } catch (error) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }
  }

  @Get()
  getHello() {}

  @Get('/tweets')
  getTweets() {
    return this.appService.getTweets();
  }

  @Get('/tweets/:username')
  getUserTweets(@Param('username') username: string) {
    return this.appService.getUserTweets(username);
  }
}
