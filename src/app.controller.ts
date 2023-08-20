import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dtos';
import { CreateMessagesDto } from './dtos/messages.dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: CreateUserDto) {
    return this.appService.signUp(body);
  }

  @Post('/tweets')
  @HttpCode(HttpStatus.CREATED)
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
  getTweets(@Query('page') page: string) {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  getUserTweets(@Param('username') username: string) {
    return this.appService.getUserTweets(username);
  }
}
