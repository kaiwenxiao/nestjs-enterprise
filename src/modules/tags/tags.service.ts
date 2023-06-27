import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../../entities/tag.entity';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
// import { CreateTagDto } from './dto/create-tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  // create(createTagDto: CreateTagDto) {
  //   return 'This action adds a new tag';
  // }
  constructor(
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRespository: Repository<User>,
  ) {}

  getAll() {
    // relations - left join
    return this.tagRepository.find({ relations: ['create_by'] });
  }

  async create(tag: Tag) {
    //   多表关联
    // 错误
    // const user = await this.userRespository.findOne(tag.create_by);
    // 1.
    // const user = await this.userRespository.findOne({ where: tag.create_by });
    // 2.
    const user = await this.userRespository.findOneBy(tag.create_by);
    // TODO 异常操作
    if (!user) {
    }
    tag.create_by = user;
    return this.tagRepository.save(tag);
  }

  updateById(id, tag: Tag) {
    return this.tagRepository.update(id, tag);
  }

  deleteById(id) {
    return this.tagRepository.delete(id);
  }

  // findAll() {
  //   return `This action returns all tags`;
  // }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} tag`;
  // }

  // update(id: number, updateTagDto: UpdateTagDto) {
  //   return `This action updates a #${id} tag`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} tag`;
  // }
}
