import { Account } from './../../entities/Account.entity'
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Res,
  Param,
  Body,
  UseGuards
} from '@nestjs/common'
import {
  ForbiddenException,
  BadRequestException,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import * as _ from 'lodash'

import { AccountsService } from './accounts.service'
import { LoginUserDto } from './dto/login-user.dto'
import { AuthGuard } from '@nestjs/passport'
import { ApiUseTags } from '@nestjs/swagger'

@ApiUseTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: LoginUserDto, @Res() res) {
    try {
      const response = await this.accountsService.login(user)
      if (response && !_.isNull(response)) {
        const theUser = await this.accountsService.findUserByEmail(user.email)
        return res
          .set('Access-Control-Expose-Headers', 'Authorization')
          .set('Authorization', 'Bearer ' + response)
          .send(theUser.user)
      }
    } catch (error) {
      throw error
    }
  }

  @Post('loginQR')
  @HttpCode(HttpStatus.OK)
  async loginQR(@Body() card: any, @Res() res) {
    try {
      const response = await this.accountsService.loginQR(card)
      if (response && !_.isNull(response)) {
        const theUser = await this.accountsService.findUserByQR(card.qr)
        return res
          .set('Access-Control-Expose-Headers', 'Authorization')
          .set('Authorization', 'Bearer ' + response)
          .send(theUser.user)
      }
    } catch (error) {
      throw error
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<any[]> {
    return this.accountsService.findAll()
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() user: LoginUserDto) {
    try {
      return await this.accountsService.create(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  @Get('authorized')
  // @UseGuards(AuthGuard('jwt'))
  async authorized() {
    return 'Authorized route...!'
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findUser(@Param('id') id: number): Promise<any> {
    return await this.accountsService.findUser(id)
  }

  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  async findUserByUserId(@Param('id') id: number): Promise<any> {
    return await this.accountsService.findUserByUserId(id)
  }

  @Get('user/email/:email')
  @UseGuards(AuthGuard('jwt'))
  async findUserByEmail(@Param('email') email: string): Promise<any> {
    return await this.accountsService.findUserByEmail(email)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Body() payload): Promise<any> {
    return await this.accountsService.update(id, payload)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.accountsService.delete(id)
  }

  @Post('primer')
  async createFirst(@Body() acc: LoginUserDto): Promise<Account> {
    return this.accountsService.createFirst(acc)
  }
}
