import { Test, TestingModule } from '@nestjs/testing'
import { ClientesService } from './Clientes.service'

describe('ClientesService', () => {
  let service: ClientesService
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesService]
    }).compile()
    service = module.get<ClientesService>(ClientesService)
  })
  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
