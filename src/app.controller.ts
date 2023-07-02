import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import { HttpReqTransformInterceptor } from './interceptor/http-req.interceptor';

@Controller()
@UseInterceptors(new HttpReqTransformInterceptor<any>()) // 统一返回体
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get()
  sendMessage(): string {
    return '222';
  }

  @Get('/getReq')
  getReq(@Req() request: Request, @Res() response: Response): any {
    // console.log('request', request);
    response.status(HttpStatus.OK).send();
  }

  @Get('/getReq2')
  getReq2(
    @Req() request: Request,
    // TODO
    @Res({ passthrough: true }) response: Response,
  ): any {
    // console.log('request', request);
    response.status(HttpStatus.OK);
    return [];
  }

  @Get('getQueryAndParam/:id?')
  getQuery(
    @Param('id') params: string,
    @Query() query: { value: number; qx: number },
  ): any {
    console.log('params', params);
    console.log('query', query);
    return '222';
  }

  @Post('postQuery/:id?')
  postQuery(
    @Param('id') params: string,
    @Body() body: { value: number; qx: number },
  ): any {
    console.log('params', params);
    console.log('body', body);
    return 'PostQuery';
  }

  @Get('userState')
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  userState(): any {
    return 'userState';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5' };
    }
  }
}
