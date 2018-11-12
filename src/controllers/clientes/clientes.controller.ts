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
import { ClientesService } from './Clientes.service'
import { Cliente } from '@entities/Cliente.entity'
import { CreateClienteDto } from './dto/create-cliente.dto'
import { UpdateClienteDto } from './dto/update-cliente.dto'

@Controller('Clientes')
@UseGuards(AuthGuard('jwt'))
export class ClientesController {
  constructor(private readonly service: ClientesService) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async finOne(@Param('id') id): Promise<Cliente> {
    return await this.service.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() Cliente: CreateClienteDto): Promise<Cliente> {
    return this.service.create(Cliente)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id,
    @Body() Cliente: UpdateClienteDto
  ): Promise<Cliente> {
    return await this.service.update(id, Cliente)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }
}
