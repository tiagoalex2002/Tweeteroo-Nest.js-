import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessagesDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  tweet: string;

  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;
}
