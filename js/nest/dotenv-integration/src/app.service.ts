import { Injectable } from '@nestjs/common';
import * as process from 'node:process';

@Injectable()
export class AppService {
  getHello() {
    return {
      a: process.env.EXAMPLE_ENV_VAR,
      b: process.env.EXAMPLE_ENV_VAR_WITH_DEFAULT,
    };
  }
}
