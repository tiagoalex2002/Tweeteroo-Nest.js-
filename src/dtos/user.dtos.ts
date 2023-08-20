import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({
    message: 'All filed are required!',
  })
  name: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty({
    message: 'All filed are required!',
  })
  avatar: string;
}
