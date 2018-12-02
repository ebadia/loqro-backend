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

import { Pedido } from '@entities/Pedido.entity'
import { Utils } from '@common/utils'
import { CreatePedidoDto } from './dto/create-pedido.dto'
import { UpdatePedidoDto } from './dto/update-pedido.dto'

@Injectable()
export class PedidosService {
  constructor(
    @InjectRepository(Pedido) private readonly repo: Repository<Pedido>
  ) {}

  async findAll(page: number = 0, size: number = 10): Promise<any[]> {
    return await this.repo.findAndCount({
      skip: page * size,
      take: size,
      order: {
        id: 'ASC'
      }
    })
  }

  async countAll(): Promise<number> {
    return await this.repo.count()
  }

  async findOne(id: number): Promise<Pedido> {
    const anItem = await this.repo.findOne(id)
    if (!anItem) {
      throw new NotFoundException()
    }
    return anItem
  }

  async create(product: CreatePedidoDto): Promise<Pedido> {
    const err = await validate(product)
    if (err.length > 0) {
      Utils.sendErr('Validation error.')
    }
    const anItem = Object.assign(new Pedido(), product)
    return await this.repo.save(anItem)
  }

  async update(id: number, product: UpdatePedidoDto): Promise<Pedido> {
    console.log('product :', product)
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

  async upload(file: any, pedido: number, req: any): Promise<Pedido> {
    const item = await this.repo.findOne(pedido)
    if (!item) {
      throw new NotFoundException()
    }

    try {
      return await this.repo.save({ ...item, imagen: req.file.url })
    } catch (err) {
      throw new BadRequestException(err.message)
    }
  }
}
