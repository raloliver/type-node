/*
 * File: db-add-account.spec.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:04:47 pm
 * Last Modified: Thursday, July 29th 2021, 8:06:09 pm
 * Copyright © 2021 AMDE Agência
 */

import {Encrypter} from './db-add-account.protocols'
import {DbAddAccount} from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const encrypterFactory = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const factorySut = (): SutTypes => {
  const encrypterStub = encrypterFactory()
  const sut = new DbAddAccount(encrypterStub)

  return {
    sut,
    encrypterStub
  }
}
describe('DbAddAccount Usecase', () => {
  test('Shoul call Encryper with correct password', async () => {
    const {sut, encrypterStub} = factorySut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData = {
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('password')
  })

  test('Shoul throw of Encryper throws', async () => {
    const {sut, encrypterStub} = factorySut()
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      )
    const accountData = {
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'password'
    }

    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow()
  })
})
