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
import { EventosService } from './Eventos.service'
import { Evento } from '@entities/Evento.entity'
import { CreateEventoDto } from './dto/create-evento.dto'
import { UpdateEventoDto } from './dto/update-evento.dto'

@Controller('Eventos')
@UseGuards(AuthGuard('jwt'))
export class EventosController {
  constructor(private readonly service: EventosService) {}

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
  async finOne(@Param('id') id): Promise<Evento> {
    return await this.service.findOne(id)
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() Evento: CreateEventoDto): Promise<Evento> {
    return this.service.create(Evento)
  }

  @Post('producto/:id')
  @UseGuards(AuthGuard('jwt'))
  async createFromProduct(
    @Param('id') id: number,
    @Body() evento: Evento
  ): Promise<Evento> {
    return this.service.createFromProduct(id, evento)
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id,
    @Body() Evento: UpdateEventoDto
  ): Promise<Evento> {
    return await this.service.update(id, Evento)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id) {
    await this.service.delete(id)
  }
}
