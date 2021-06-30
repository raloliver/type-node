/*
 * File: signup.controller.spec.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:10:16 am
 * Last Modified: Wednesday, June 30th 2021, 2:57:39 pm
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
    add(account: AddAccountModel): AccountModel {
      const fakeAccount = {
        id: 'id',
        name: 'name',
        email: 'email@domain.co',
        password: 'password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

describe('SignupController', () => {
  test('should return 400 status if no name is not provided', () => {
    // SUT: system under testing
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 status if no email is provided', () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 status if no password is provided', () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        passwordConfirm: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('should return 400 status if no password confirm is provided', () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirm'))
  })

  test('should return 400 status if password does not match', () => {
    const {sut} = factorySut()
    const httpRequest = {
      body: {
        name: 'name',
        email: 'email@domain.co',
        password: 'password',
        passwordConfirm: 'Password'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirm'))
  })

  test('should return 400 status if an invalid email is provided', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('should call email validator with a valid email', () => {
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

  test('should return 500 status if email validator throws', () => {
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
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('should call add account with valid values', () => {
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
})
