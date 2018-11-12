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
  UseGuards,
  Query
} from '@nestjs/common'
import {
  ForbiddenException,
  BadRequestException,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import * as _ from 'lodash'
import { AuthGuard } from '@nestjs/passport'

import { UsersService } from './users.service'
import { User } from '../../entities/User.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly UsersService: UsersService) {}

  @Get()
  async findAll(@Query('page') page, @Query('size') size): Promise<any[]> {
    return await this.UsersService.findAll(page, size)
  }

  @Get('count')
  async countAll(): Promise<number> {
    return await this.UsersService.countAll()
  }

  @Get(':id')
  async finOne(@Param('id') id): Promise<User> {
    return await this.UsersService.findOne(id)
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.UsersService.create(user)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Body() User: UpdateUserDto): Promise<User> {
    return await this.UsersService.update(id, User)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.UsersService.delete(id)
  }
}
