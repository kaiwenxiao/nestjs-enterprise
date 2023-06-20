import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from '../../entities/tag.entity';
import { InterParams } from '../../types/controller';
// import { CreateTagDto } from './dto/create-tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('/tags')
  async getAll() {
    const value = await this.tagsService.getAll();
    // TODO 异常操作
    if (!value) {
    }
    return value;
  }

  @Post()
  async createTag(@Body() tagInfo: Tag) {
    const value = await this.tagsService.create(tagInfo);
    // TODO 异常操作
    if (!value) {
    }
    return value;
  }

  @Put('/:id')
  async updateTag(@Param() params: InterParams) {
    const value = this.tagsService;
    // TODO 异常操作
    if (!value) {
    }
    return value;
  }

  @Delete('/:id')
  async deleteTag(@Param() params: InterParams) {
    const value = this.tagsService.deleteById(params.id);
    // TODO 异常操作
    if (!value) {
    }
    return value;
  }

  // TODO
  // @Post('/job')
  // async stopJob(@Body() body: {start: boolean}) {
  //
  // }

  // @Post()
  // create(@Body() createTagDto: CreateTagDto) {
  //   return this.tagsService.create(createTagDto);
  // }

  // @Get()
  // findAll() {
  //   return this.tagsService.findAll();
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagsService.update(+id, updateTagDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.tagsService.remove(+id);
  // }
}
