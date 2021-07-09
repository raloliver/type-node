/*
 * File: signup.controller.spec.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:10:16 am
 * Last Modified: Friday, July 9th 2021, 3:31:20 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  EmailValidator,
  AddAccount,
  AddAccountModel,
  AccountModel
} from '../signup/signup.protocols'
import {InvalidParamError, MissingParamError, ServerError} from '../../errors'
import {SignupController} from './signup.controller'

interface SutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

/**
 * Factory helper method
 *
 * @return {*}  {SignupController}
 */
const factorySut = (): SutTypes => {
  const emailValidatorStub = emailValidatorFactory()
  const addAccountStub = addAccountFactory()
  // SUT: system under test
  const sut = new SignupController(emailValidatorStub, addAccountStub)
  return {
    sut,
    emailValidatorStub,
    addAccountStub
  }
}

const emailValidatorFactory = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const addAccountFactory = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add(account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'id',
        name: 'name',
        email: 'email@domain.co',
        password: 'password'
      }
      return new Promise((resolve) => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

describe('SignupController', () => {
  test('should return 400 status if no name is not provided', async () => {
    // SUT: system under testing
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 status if no email is provided', async () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 status if no password is provided', async () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 status if no password confirm is provided', async () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirm'))
  })

  test('should return 400 status if password does not match', async () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'Password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirm'))
  })

  test('should return 400 status if an invalid email is provided', async () => {
    const {sut, emailValidatorStub} = factorySut()

    // for this test it is necessary to mock as false
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('should call email validator with a valid email', async () => {
    const {sut, emailValidatorStub} = factorySut()

    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('email@domain.co')
  })

  test('should return 500 status if email validator throws', async () => {
    // SUT: system under test
    const {sut, emailValidatorStub} = factorySut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call add account with valid values', async () => {
    const {sut, addAccountStub} = factorySut()

    const addSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'name',
      email: 'email@domain.co',
      password: 'password'
    })
  })

  test('should return 500 status if add account throws', async () => {
    // SUT: system under test (it is not necessary to use promise here, but it is the righ way)
    const {sut, addAccountStub} = factorySut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Promise((resolve, reject) => reject(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should return 200 status if valid data is provided', async () => {
    const {sut} = factorySut()

    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'id',
      name: 'name',
      email: 'email@domain.co',
      password: 'password'
    })
  })
})
