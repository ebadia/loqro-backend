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
import { PedidosService } from './pedidos.service'
import { Pedido } from '@entities/Pedido.entity'
import { CreatePedidoDto } from './dto/create-pedido.dto'
import { UpdatePedidoDto } from './dto/update-pedido.dto'

@Controller('pedidos')
// @UseGuards(AuthGuard('jwt'))
export class PedidosController {
  constructor(private readonly service: PedidosService) {}

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
  async finOne(@Param('id') id): Promise<Pedido> {
    return await this.service.findOne(id)
  }

  @Post()
  // @UseGuards(AuthGuard('jwt'))
  async create(@Body() Pedido: CreatePedidoDto): Promise<Pedido> {
    return this.service.create(Pedido)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id,
    @Body() pedido: UpdatePedidoDto
  ): Promise<Pedido> {
    return await this.service.update(id, pedido)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }
}
