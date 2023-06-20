import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // forRootAsync 对比 forRoot 可以注入依赖，inject
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          database: configService.get('DB_NAME'),
          host: configService.get('DB_HOST', '127.0.0.1'),
          port: configService.get('DB_PROT', 3306),
          username: configService.get('DB_USER', 'root'),
          password: configService.get('DB_PASSWORD', 'root'),
          timezone: '+08:00',
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class CoreModule {}
