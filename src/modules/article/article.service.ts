import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '../../entities/article.entity';
import { Repository } from 'typeorm';
import { Tag } from '../../entities/tag.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAll() {
    const value = await this.articleRepository.find();
    // TODO
    if (!value) {
    }
    return value;
  }

  async getArticleById(id) {
    const value = await this.articleRepository.findOne({
      where: { id },
      relations: ['create_by', 'tags'],
    });
    // TODO
    if (!value) {
    }
    return value;
  }

  async createArticle(article: Article) {
    const user = await this.userRepository.findOneBy(article.create_by);
    // TODO
    if (!user) {
    }
    const getTags = async () => {
      const promiseList = <any>[];
      article.tags.forEach((item) => {
        promiseList.push(this.tagRepository.findOne({ where: item }));
      });
      //   since findOne is async function(return promise), you should use promise.all
      const value = await Promise.all(promiseList);
      // TODO
      if (!value) {
      }
      return value;
    };

    const allTags = await getTags();
    article.create_by = user;
    article.tags = allTags;
    const value = await this.articleRepository.save(article);
    // TODO
    if (!value) {
    }
    return value;
  }

  async updateArticleById(id, article: Article) {
    const value = await this.articleRepository.update(id, article);
    // TODO
    if (!value) {
    }
    return value;
  }

  async deleteArticle(id) {
    const value = await this.articleRepository.delete(id);
    // TODO
    if (!value) {
    }
    return value;
  }
}
