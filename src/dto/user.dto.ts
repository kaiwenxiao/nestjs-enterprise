import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserInfoDTO {
  @ApiProperty({
    description: 'name',
    default: 'user1',
  })
  // class-validator working for API request and check the API request format (JSON) whether allowed
  // different with typescript which static check, not api check
  @IsNotEmpty({ message: "user name can't be empty" })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: "password can't be empty" })
  password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'update time is required' })
  @IsNumber()
  update_time: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'create time is required' })
  create_time: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'state is required' })
  state: number;
}
