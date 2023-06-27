import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserInfoDTO } from '../../dto/user.dto';
import { encryptPassword } from '../../utils/crypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    // three methods for DB query, the first and second is prefer
    // 1. Repository API
    // 2. Query Builder
    // 3. getManager().query(/*sql sentence*/)
    const list = await this.userRepository.find();
    if (!list) {
      //   TODO 异常处理
    }
    return list;
  }

  async getUerById(id: number) {
    // return await getRepository(User)
    //   .createQueryBuilder('User')
    //   .where('User.id = :id', { id: id })
    //   .leftJoinAndSelect('User.tags', 'ta.create_by')
    //   .getOne();
    return this.userRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
  }

  create(user: UserInfoDTO) {
    user.password = encryptPassword(user.password);
    return this.userRepository.save(user);
  }

  updateById(id: number, data: User) {
    return this.userRepository.update(id, data);
  }

  deleteById(id: number) {
    return this.userRepository.delete(id);
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  //
  // findAll() {
  //   return `This action returns all user`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
