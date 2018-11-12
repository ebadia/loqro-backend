import * as dotenv from 'dotenv'
dotenv.config()
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
  Query,
  UseInterceptors,
  FileInterceptor,
  UploadedFile
} from '@nestjs/common'
import {
  ForbiddenException,
  BadRequestException,
  HttpCode,
  HttpStatus
} from '@nestjs/common'
import * as _ from 'lodash'
import { AuthGuard } from '@nestjs/passport'
import { ProductosService } from './productos.service'
import { Producto } from '@entities/Producto.entity'
import { CreateProductoDto } from './dto/create-producto.dto'
import { UpdateProductoDto } from './dto/update-producto.dto'

import * as cloudinary from 'cloudinary'
import * as cloudinaryStorage from 'multer-storage-cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
})

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'loqro',
  allowedFormats: ['jpg', 'png'],
  filename: (req, file, cb) => {
    cb(undefined, file.originalname)
  }
})

@Controller('productos')
@UseGuards(AuthGuard('jwt'))
export class ProductosController {
  constructor(private readonly service: ProductosService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query('page') page, @Query('size') size): Promise<any[]> {
    return await this.service.findAll(page, size)
  }

  @Get('count')
  @UseGuards(AuthGuard('jwt'))
  async countAll(): Promise<number> {
    return await this.service.countAll()
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async finOne(@Param('id') id): Promise<Producto> {
    return await this.service.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() Producto: CreateProductoDto): Promise<Producto> {
    return this.service.create(Producto)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id,
    @Body() producto: UpdateProductoDto
  ): Promise<Producto> {
    return await this.service.update(id, producto)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }

  @Post('upload/:producto')
  @UseInterceptors(FileInterceptor('file', { storage }))
  async upload(
    @UploadedFile() file,
    @Param('producto') producto,
    @Req() req
  ): Promise<Producto> {
    return this.service.upload(file, producto, req)
  }
}
