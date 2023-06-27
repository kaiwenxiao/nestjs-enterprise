import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagsModule } from './modules/tags/tags.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './modules/user/user.module';
import { ArticleModule } from "./modules/article/article.module";

@Module({
  imports: [CoreModule, TagsModule, UserModule, ArticleModule],
  controllers: [AppController],
  // 1.
  // providers: [AppService],
  // 2.
  providers: [
    {
      provide: AppService,
      useClass: AppService,
    },
    // 3.useFactory 传入工厂函数provider
    //   {
    //     provide: 'CONNECTION',
    //     useFactory: async () => {
    //       const connection = await createConnection(options)
    //       return connection
    //     },
    //     inject 的其它提供者可以作为参数传递给工厂函数
    //     inject: []
    //   }
    //   然后在controll中使用
    //   private readonly appService;
    // constructor(@Inject('CONNECTION') appService: AppService) {
    //   this.appService = appService;
    // }
  ],
})
export class AppModule {}
