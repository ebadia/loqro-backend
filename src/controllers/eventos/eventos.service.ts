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

import { Evento } from '@entities/Evento.entity'
import { Utils } from '@common/utils'
import { CreateEventoDto } from './dto/create-Evento.dto'
import { UpdateEventoDto } from './dto/update-Evento.dto'
import { Producto } from '@entities/Producto.entity'

@Injectable()
export class EventosService {
  constructor(
    @InjectRepository(Evento) private readonly repo: Repository<Evento>
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

  async findOne(id: number): Promise<Evento> {
    const anItem = await this.repo.findOne(id)
    if (!anItem) {
      throw new NotFoundException()
    }
    return anItem
  }

  async create(product: CreateEventoDto): Promise<Evento> {
    const err = await validate(product)
    if (err.length > 0) {
      Utils.sendErr('Validation error.')
    }
    const anItem = Object.assign(new Evento(), product)
    return await this.repo.save(anItem)
  }

  async createFromProduct(productId: number, tipo: Evento): Promise<Evento> {
    const product = await getConnection()
      .getRepository(Producto)
      .findOne(productId)
    if (!product) {
      Utils.sendErr('El producto no existe.')
    }
    const evento = {
      fecha: moment().format('YYYY-MM-DD'),
      hora: moment().format('HH:mm:ss'),
      evento: tipo.evento,
      producto: product
    }
    const anItem = Object.assign(new Evento(), evento)
    return await this.repo.save(anItem)
  }

  async update(id: number, product: UpdateEventoDto): Promise<Evento> {
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
