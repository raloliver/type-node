/*
 * File: email-validator.adapter.spec.ts
 * Project: type-node
 * Created: Monday, July 26th 2021, 4:11:58 pm
 * Last Modified: Thursday, July 29th 2021, 8:08:23 pm
 * Copyright © 2021 AMDE Agência
 */

import validator from 'validator'
import {EmailValidatorAdapter} from './email-validator.adapter'

// Dependency Mock just for test (the way to validate an email must be unknow)
jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const emailValidatorAdapter = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('should return false when validator also returns false', () => {
    const sut = emailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@domain.com.br')

    expect(isValid).toBe(false)
  })

  test('should return true when validator also returns true', () => {
    const sut = emailValidatorAdapter()
    const isValid = sut.isValid('domain@mail.co')

    expect(isValid).toBe(true)
  })

  test('should call validator with correct email', () => {
    const sut = emailValidatorAdapter()
    sut.isValid('domain@mail.co')
    const isEmailSpy = jest
      .spyOn(validator, 'isEmail')
      .mockReturnValueOnce(false)

    expect(isEmailSpy).toHaveBeenCalledWith('domain@mail.co')
  })
})
