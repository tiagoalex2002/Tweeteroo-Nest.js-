import { IsString, IsNotEmpty } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class CreateMessagesDto {
  @IsString()
  @IsNotEmpty({
    message: 'All filed are required!',
  })
  message: string;

  @IsNotEmpty({
    message: 'All filed are required!',
  })
  user: User;
}
