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

import { Producto } from '@entities/Producto.entity'
import { Utils } from '@common/utils'
import { CreateProductoDto } from './dto/create-producto.dto'
import { UpdateProductoDto } from './dto/update-producto.dto'

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private readonly repo: Repository<Producto>
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

  async findOne(id: number): Promise<Producto> {
    const anItem = await this.repo.findOne(id)
    if (!anItem) {
      throw new NotFoundException()
    }
    return anItem
  }

  async create(product: CreateProductoDto): Promise<Producto> {
    const err = await validate(product)
    if (err.length > 0) {
      Utils.sendErr('Validation error.')
    }
    const anItem = Object.assign(new Producto(), product)
    return await this.repo.save(anItem)
  }

  async update(id: number, product: UpdateProductoDto): Promise<Producto> {
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

  async upload(file: any, producto: number, req: any): Promise<Producto> {
    const item = await this.repo.findOne(producto)
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
