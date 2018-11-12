import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import * as _ from 'lodash'
import * as bcrypt from 'bcrypt'

import { Account } from '../../entities/Account.entity'
import { User } from '../../entities/User.entity'
import { LoginUserDto } from './dto/login-user.dto'

const token_secret = process.env.TOKEN_SECRET || 'mamamia'

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepo: Repository<Account>
  ) {}

  async login(account: LoginUserDto): Promise<any> {
    const user = await this.accountsRepo.findOne({
      select: ['email', 'password'],
      where: { email: account.email }
    })
    if (user) {
      const passwOk = await this.compareHash(account.password, user.password)
      if (!passwOk) {
        throw new UnauthorizedException()
      } else {
        return this.createToken(user)
      }
    } else {
      throw new NotFoundException()
    }
  }

  async loginQR(card: any): Promise<any> {
    const user = await this.accountsRepo
      .createQueryBuilder('account')
      .select()
      .leftJoinAndSelect('account.user', 'user')
      .where('user.qr = :qr', { qr: card.qr })
      .getOne()

    if (user) {
      return this.createToken(user)
    } else {
      throw new NotFoundException()
    }
  }

  async findUser(id: number): Promise<any> {
    const acc = await this.accountsRepo
      .createQueryBuilder('account')
      .select(['account.id', 'account.email'])
      .where('account.id=:id', { id })
      .leftJoinAndSelect('account.user', 'user')
      .getOne()
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async findUserByUserId(id: number): Promise<any> {
    const acc = await this.accountsRepo
      .createQueryBuilder('account')
      .select(['account.id', 'account.email'])
      .leftJoinAndSelect('account.user', 'user')
      .where('account.user.id=:id', { id })
      .getOne()
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async findUserByEmail(email: string): Promise<any> {
    const acc = await this.accountsRepo
      .createQueryBuilder('account')
      .select(['account.id', 'account.email'])
      .where('email=:email', { email })
      .leftJoinAndSelect('account.user', 'user')
      .getOne()
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async findUserByQR(qr: string): Promise<any> {
    const acc = await this.accountsRepo
      .createQueryBuilder('account')
      .select()
      .leftJoinAndSelect('account.user', 'user')
      .where('user.qr = :qr', { qr })
      .getOne()
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async create(user: LoginUserDto): Promise<Account> {
    const existe = await this.accountsRepo.findOne({ email: user.email })

    if (existe) {
      throw new ConflictException('La cuenta ya esiste')
    }
    // create new user
    try {
      // add void user associated with this account
      const userCreated = await this.createVoidUser(user)
      // create account with user created
      const createAccount = Object.assign(user, {
        user: { id: userCreated.id }
      })
      const newAccount = await this.accountsRepo.create(createAccount)

      return await this.accountsRepo.save(newAccount)
    } catch (error) {
      console.log('ERROR', error)
      return null
    }
  }

  private async createVoidUser(user: LoginUserDto) {
    const newUser = await getConnection()
      .getRepository(User)
      .create(new User())
    return await getConnection()
      .getRepository(User)
      .save(newUser)
  }

  async compareHash(
    password: string | undefined,
    hash: string | undefined
  ): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  private createToken(user: Account) {
    const expiresIn = 60 * 60 * 10
    return jwt.sign(Object.assign({}, user), token_secret, { expiresIn })
  }

  async validateUser(signedUser): Promise<boolean> {
    const user = await this.accountsRepo.findOne({
      where: { email: signedUser.email }
    })

    if (_.isEmpty(user)) {
      return false
    } else {
      return true
    }
  }

  async findAll(): Promise<Account[]> {
    return this.accountsRepo.find()
  }

  async findOne(user: LoginUserDto): Promise<Account> {
    const acc = await this.accountsRepo
      .createQueryBuilder()
      .select()
      .where('email=:email', { email: user.email })
      .getOne()
    if (!acc) {
      throw new NotFoundException()
    }
    return acc
  }

  async update(id: number, payload: Account): Promise<Account> {
    const anAcc = await this.accountsRepo.findOne(id)
    if (!anAcc) {
      throw new NotFoundException('Cuenta no encontrada')
    }
    // if no email in payload, load from actual account
    if (!payload.email) {
      payload.email = anAcc.email
    }
    const acc = await this.accountsRepo.update(id, payload)
    return await this.accountsRepo.findOne(id)
  }

  async delete(id: number) {
    const acc = await this.accountsRepo.findOne(id)
    if (!acc) {
      throw new NotFoundException()
    }
    this.accountsRepo.remove(acc)
  }

  async createFirst(acc: LoginUserDto): Promise<Account> {
    // const anAcc = Object.assign(new Account(), acc)
    // return await this.accountsRepo.save(anAcc)
    return await this.create(acc)
  }
}
