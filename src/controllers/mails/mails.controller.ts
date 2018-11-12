import {
  Controller,
  Get,
  Post,
  Req,
  Param,
  Body,
  Query,
  UseGuards,
  NotFoundException
} from '@nestjs/common'
import { MailsService } from './mails.service'
import { ApiUseTags } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@ApiUseTags('Mails')
@UseGuards(AuthGuard('jwt'))
@Controller('mails')
export class MailsController {
  constructor(private readonly mailsService: MailsService) {}
}
