/*
 * File: signup.controller.spec.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:10:16 am
 * Last Modified: Thursday, May 6th 2021, 11:10:23 am
 * Copyright © 2021 AMDE Agência
 */

import {MissingParamError} from '../errors/missing-param.error'
import {SignupController} from './signup.controller'

describe('SignupController', () => {
  test('should return 400 status if no name is provided', () => {
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
    // SUT: system under testing
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
})
