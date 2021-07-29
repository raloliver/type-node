/*
 * File: db-add-account.spec.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:04:47 pm
 * Last Modified: Thursday, July 29th 2021, 8:43:12 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  AccountModel,
  AddAccountModel,
  AddAccountRepository,
  Encrypter
} from './db-add-account.protocols'
import {DbAddAccount} from './db-add-account'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
  addAccountRepositoryStub: AddAccountRepository
}

const encrypterFactory = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    encrypt(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const addAccountRespositoryFactory = (): AddAccountRepository => {
  class AddAccountRespositoryStub implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: '76d2635c-fe63-42d2-b6d0-866e7cd750e8',
        name: 'John Doe',
        email: 'email@domain.co',
        password: 'hashed_password'
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountRespositoryStub()
}

const factorySut = (): SutTypes => {
  const encrypterStub = encrypterFactory()
  const addAccountRepositoryStub = addAccountRespositoryFactory()
  const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    sut,
    encrypterStub,
    addAccountRepositoryStub
  }
}
describe('DbAddAccount Usecase', () => {
  test('should call Encryper with correct password', async () => {
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
  // avoid to use try/catch block in the main class
  test('should throw of Encryper throws', async () => {
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

  test('should call AddAccountRepository with correct input values', async () => {
    const {sut, addAccountRepositoryStub} = factorySut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    const accountData = {
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'hashed_password'
    })
  })

  test('should throw of AddAccountRepository throws', async () => {
    const {sut, addAccountRepositoryStub} = factorySut()
    jest
      .spyOn(addAccountRepositoryStub, 'add')
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
  // you do not mock the success case, the default of mock must be do that, we only mock when do you wanna return an error
  test('should return an account on sucess', async () => {
    const {sut} = factorySut()
    const accountData = {
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'password'
    }

    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: '76d2635c-fe63-42d2-b6d0-866e7cd750e8',
      name: 'John Doe',
      email: 'email@domain.co',
      password: 'hashed_password'
    })
  })
})
