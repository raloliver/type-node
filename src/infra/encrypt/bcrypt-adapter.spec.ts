/*
 * File: bcrypt-adapter.spec.ts
 * Project: type-node
 * Created: Friday, December 9th 2022, 9:55:39 am
 * Last Modified: Friday, December 9th 2022, 10:28:30 am
 * Copyright © 2022 AMDE Agência
 */

import bcrypt from 'bcrypt'
import {BcryptAdapter} from './bcrypt-adapter'

const salt = 12
const bcryptFactory = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}
/**
 * it is import the mocks place it out of the describe
 */
jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise((resolve) => resolve('hash'))
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = bcryptFactory()
    const hashSpy = jest.spyOn(bcrypt, 'hash')

    await sut.encrypt('value')
    expect(hashSpy).toHaveBeenCalledWith('value', salt)
  })

  test('Should return a hash success', async () => {
    const sut = bcryptFactory()
    const hash = await sut.encrypt('value')

    expect(hash).toBe('hash')
  })
})
