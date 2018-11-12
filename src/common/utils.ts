import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
} from '@nestjs/common'

export class Utils {
  static sendErr(msg: string) {
    throw new HttpException(msg, HttpStatus.BAD_REQUEST)
  }
}
