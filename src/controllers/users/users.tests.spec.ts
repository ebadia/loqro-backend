import * as request from 'supertest'
import * as superagent from 'superagent'
import { expect } from 'chai'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '@nestjs/testing'
import * as express from 'express'
import { getConnection } from 'typeorm'

// module
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

// entities
import { User } from '../../entities/User.entity'

const entities = [User]

describe('>>> USERS TESTS', () => {
  const instance = express()

  before(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'tincfeina',
          database: 'loqro_test',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: true,
          logging: false
        }),
        TypeOrmModule.forFeature(entities)
      ],
      controllers: [UsersController],
      providers: [UsersService]
    }).compile()

    const application = moduleFixture.createNestApplication(instance)
    await application.init()
  })

  after(async () => {
    await getConnection().synchronize(true)
    await getConnection().close()
  })

  describe('***** Users Module Endpoints ', () => {
    it('should  GET /users', done => {
      request(instance)
        .get('/users')
        .end((err, res: superagent.Response) => {
          expect(res.status).to.be.equal(200)
          done()
        })
    })

    it('should pass POST /users', done => {
      request(instance)
        .post('/users')
        .send({
          firstName: 'John',
          lastName: 'Doe',
          email: null,
          password: null
        })
        .end((err, res: superagent.Response) => {
          expect(res.status).to.be.equal(201)
          done()
        })
    })

    it('should  GET /users/id', done => {
      request(instance)
        .get('/users/1')
        .end((err, res: superagent.Response) => {
          expect(res.status).to.be.equal(200)
          done()
        })
    })

    it('should  PATCH /users/id', done => {
      request(instance)
        .patch('/users/1')
        .send({ firstName: 'Foo' })
        .end((err, res: superagent.Response) => {
          expect(res.status).to.be.equal(200)
          done()
        })
    })

    it('should  DELETE /users/id', done => {
      request(instance)
        .delete('/users/1')
        .end((err, res: superagent.Response) => {
          expect(res.status).to.be.equal(200)
          done()
        })
    })
  })
})
