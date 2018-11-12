import * as dotenv from 'dotenv'

import { Observable } from 'rxjs'
import { Injectable, Inject, NotFoundException } from '@nestjs/common'
import { WelcomeMailDto } from './dto/welcome-mail.dto'
import { Compra } from '../../entities/Compra.entity'
import { ClientRMQ } from 'nestjs-rmq'

dotenv.config()
@Injectable()
export class MailsService {
  client: ClientRMQ

  constructor() {
    this.client = new ClientRMQ({
      urls: [`${process.env.CLOUDAMQP_URL}`],
      queue: 'ampanova_mails',
      queueOptions: { durable: false }
    })
  }

  send(msg: any): Observable<string> {
    console.log('OBJ MSG TO SEND ******** ', JSON.stringify(msg))
    try {
      return this.client.send<string, string>(
        { cmd: 'ampanova_mails' },
        JSON.stringify(msg)
      )
    } catch (error) {
      console.log('Message server is down')
    }
  }
}
