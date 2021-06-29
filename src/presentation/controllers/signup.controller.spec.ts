/*
 * File: signup.controller.spec.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:10:16 am
 * Last Modified: Tuesday, June 29th 2021, 2:10:57 pm
 * Copyright © 2021 AMDE Agência
 */

import {InvalidParamError} from '../errors/invalid-param.error'
import {MissingParamError} from '../errors/missing-param.error'
import {EmailValidator} from '../interfaces/emailValidator.interface'
import {SignupController} from './signup.controller'

interface SutTypes {
  sut: SignupController
  emailValidatorStub: EmailValidator
}

/**
 * Factory helper method
 *
 * @return {*}  {SignupController}
 */
const factorySut = (): SutTypes => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  // SUT: system under test
  const sut = new SignupController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
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
})
