import request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AccountsModule } from '../src/controllers/accounts/accounts.module'
import { AccountsService } from '../src/controllers/accounts/accounts.service'

describe('AccountsController (e2e)', () => {
  let app: INestApplication
  const accountsService = { findAll: () => ['test'] }

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AccountsModule]
    })
      .overrideProvider(AccountsService)
      .useValue(accountsService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('GET/ /users/authorized', () => {
    return request(app.getHttpServer())
      .get('/users/authorized')
      .expect(200)
  })
})
