import { Test, TestingModule } from '@nestjs/testing'
import { EventosService } from './Eventos.service'

describe('EventosService', () => {
  let service: EventosService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventosService]
    }).compile()
    service = module.get<EventosService>(EventosService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
