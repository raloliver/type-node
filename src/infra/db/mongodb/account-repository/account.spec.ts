/*
 * File: account.spec.ts
 * Project: type-node
 * Created: Sunday, December 11th 2022, 6:50:54 am
 * Last Modified: Sunday, December 11th 2022, 7:16:40 am
 * Copyright © 2022 AMDE Agência
 */

import {MongoDBHelper} from '../helpers/mongodb.helper'

describe('Account MongoDB Repository', () => {
  //connect on DB before and desconect after
  beforeAll(async () => {
    await MongoDBHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoDBHelper.close()
  })

  test('Should create an account success', async () => {
    const sut = new AccountMongoDBRepository()
    const account = await sut.add({
      name: 'João da Silva (Integration Test)',
      email: 'joao_test@joaodasilva.com.br',
      password: '123456!Qw'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('João da Silva (Integration Test)')
    expect(account.email).toBe('joao_test@joaodasilva.com.br')
    expect(account.password).toBe('123456!Qw')
  })
})
