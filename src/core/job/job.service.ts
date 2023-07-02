import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { join } from 'path';

@Injectable()
export class JobService {
  emptyDir = (fileUrl) => {
    // read directory
    const files = fs.readdirSync(fileUrl);
    files.forEach((file) => {
      // get file status
      const stats = fs.statSync(fileUrl + '/' + file);
      if (stats.isDirectory()) {
        this.emptyDir(fileUrl + '/' + file);
      } else {
        // delete file
        fs.unlinkSync(fileUrl + '/' + file);
      }
    });
  };

  @Cron(CronExpression.EVERY_DAY_AT_11PM)
  handleCron() {
    // delete OSS file and log files
    const OSSRootDir = join(__dirname, '../../../upload-oss');

    // commonly we re-store the log files, not delete
    const accesslogDir = join(__dirname, '../../../logs/access');
    const appOutDir = join(__dirname, '../../../logs/app-out');
    const errorsDir = join(__dirname, '../../../logs/errors');

    this.emptyDir(OSSRootDir);
    this.emptyDir(accesslogDir);
    this.emptyDir(appOutDir);
    this.emptyDir(errorsDir);
  }

  // @Cron('10 * * * * *', {
  //   name: 'notifications',
  // })
  // manually
  @Interval('notifications', 5000)
  handleTimeout() {
    // console.log('66666');
  }
}
