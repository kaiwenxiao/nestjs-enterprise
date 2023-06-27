import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  // ArgumentMetadata - the class instance type
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
      // if not validation rule, return data directly
      return value;
    }
    // plainToInstance - for your api request param/data (JSON format) to DTO format
    const object = plainToInstance(metadata.metatype, value);
    // validate the 'class-validator' rules you defined in dto
    // @/src/dto/user.dto.ts
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0];
      Logger.error(`Validation failed: ${msg}`);
      // 1.
      // throw new BadRequestException(`Validation failed: ${msg}`);
      // 2.
      throw new HttpException(
        `Validation failed: ${msg}`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: any) {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
