/*
 * File: signup.controller.spec.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:10:16 am
 * Last Modified: Thursday, May 6th 2021, 11:26:29 am
 * Copyright © 2021 AMDE Agência
 */

import {MissingParamError} from '../errors/missing-param.error'
import {SignupController} from './signup.controller'

describe('SignupController', () => {
  test('should return 400 status if no name is not provided', () => {
    // SUT: system under testing
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
    const sut = new SignupController()
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
})
