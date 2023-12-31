import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../../entities/tag.entity';
import { User } from '../../entities/user.entity';
import { Article } from '../../entities/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, User])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
