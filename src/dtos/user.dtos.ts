import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  username: string;

  @IsString()
  @IsNotEmpty({
    message: 'All fields are required!',
  })
  @IsUrl()
  avatar: string;
}
