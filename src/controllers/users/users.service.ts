import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  HttpStatus,
  HttpException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Connection, Repository, getRepository, getConnection } from 'typeorm'
import { validate } from 'class-validator'
import * as moment from 'moment'
import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

import { User } from '../../entities/User.entity'
import { Utils } from '../../common/utils'
import { LoginUserDto } from './dto/login-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

const token_secret = process.env.TOKEN_SECRET || 'mamamia'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly UserRepo: Repository<User>
  ) {}

  async validateUser(signedUser): Promise<boolean> {
    const user = await this.UserRepo.findOne({
      where: { email: signedUser.email }
    })

    if (_.isEmpty(user)) {
      return false
    } else {
      return true
    }
  }

  async findAll(page: number = 0, size: number = 10): Promise<any[]> {
    return await this.UserRepo.findAndCount({
      relations: ['account', 'cliente'],
      skip: page * size,
      take: size
    })
  }

  async countAll(): Promise<number> {
    return await this.UserRepo.count()
  }

  async findOne(id: number): Promise<User> {
    const anUser = await this.UserRepo.findOne(id, {
      relations: ['account', 'cliente']
    })
    if (!anUser) {
      throw new NotFoundException()
    }
    return anUser
  }

  async create(user: CreateUserDto): Promise<User> {
    let anUser = Object.assign(new User(), user)
    anUser = await this.UserRepo.save(anUser)
    return this.UserRepo.findOne(anUser.id, {
      relations: ['account', 'cliente']
    })
  }

  async update(id: number, user: UpdateUserDto): Promise<User> {
    console.log('user :', user)
    // parse user to update
    const userTmp = await this.UserRepo.findOne(id)
    if (!userTmp) {
      throw new NotFoundException('Ususario no encontrado')
    }
    // create updatable user
    const anUser = { ...userTmp, ...user }
    await this.UserRepo.save(anUser)

    return await this.UserRepo.findOne(id, {
      relations: ['account', 'cliente']
    })
  }

  async delete(id: number) {
    const obj = await this.UserRepo.findOne(id)
    if (!obj) {
      throw new NotFoundException()
    }
    await this.UserRepo.remove(obj)
  }

  async findUserByEmail(email: string): Promise<User> {
    const acc = await this.UserRepo.findOne({
      where: { email },
      relations: ['cliente']
    })
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async findUserByUsername(username: string): Promise<any> {
    const acc = await this.UserRepo.findOne({ where: { username } })
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async findUserByMobile(mobile: string): Promise<any> {
    const acc = await this.UserRepo.findOne({ where: { mobile } })
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }
}
