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

import { Cliente } from '@entities/Cliente.entity'
import { Utils } from '@common/utils'
import { CreateClienteDto } from './dto/create-Cliente.dto'
import { UpdateClienteDto } from './dto/update-Cliente.dto'

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Cliente) private readonly repo: Repository<Cliente>
  ) {}

  async findAll(page: number = 0, size: number = 10): Promise<any[]> {
    return await this.repo.findAndCount({
      skip: page * size,
      take: size
    })
  }

  async countAll(): Promise<number> {
    return await this.repo.count()
  }

  async findOne(id: number): Promise<Cliente> {
    const anItem = await this.repo.findOne(id)
    if (!anItem) {
      throw new NotFoundException()
    }
    return anItem
  }

  async create(product: CreateClienteDto): Promise<Cliente> {
    const err = await validate(product)
    if (err.length > 0) {
      Utils.sendErr('Validation error.')
    }
    const anItem = Object.assign(new Cliente(), product)
    return await this.repo.save(anItem)
  }

  async update(id: number, product: UpdateClienteDto): Promise<Cliente> {
    const productTmp = await this.repo.findOne(id)
    if (!productTmp) {
      throw new NotFoundException('Ususario no encontrado')
    }
    // create updatable Product
    const anItem = { ...productTmp, ...product }
    await this.repo.save(anItem)

    return await this.repo.findOne(id)
  }

  async delete(id: number) {
    const obj = await this.repo.findOne(id)
    if (!obj) {
      throw new NotFoundException()
    }
    await this.repo.remove(obj)
  }
}
