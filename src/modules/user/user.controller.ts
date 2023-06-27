import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from 'src/pipe/validation.pipe';
import { UserInfoDTO } from '../../dto/user.dto';
import { User } from 'src/entities/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO
  // @Post('/math/wordcount')
  // async wordCount(@Body() { text }: { text: string }) {
  //   const value2 = await this.client.send('math:wordcount', text).toPromise();
  //   await this.client.emit('math:log', text).toPromise();
  //
  //   return value2;
  // }

  @Get('/user')
  async getHello() {
    const value = await this.userService.getAll();
    // TODO
    if (!value) {
    }
    return value;
  }

  @Get('/:id')
  async getUserById(@Param() params: { id: number }) {
    const value = await this.userService.getUerById(params.id);
    // TODO
    if (!value) {
    }
    return value;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() userInfo: UserInfoDTO) {
    const value = await this.userService.create(userInfo);
    // TODO
    if (!value) {
    }
    return value;
  }

  @Put('/:id')
  async updateUser(@Param() params: { id: number }, @Body() userInfo: User) {
    const value = await this.userService.updateById(params.id, userInfo);
    // TODO
    if (!value) {
    }
    return value;
  }

  @Delete('/:id')
  async deleteUser(@Param() params: { id: number }) {
    const value = await this.userService.deleteById(params.id);
    // TODO
    if (!value) {
    }
    return value;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.userService.create(createUserDto);
  // }
  //
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
