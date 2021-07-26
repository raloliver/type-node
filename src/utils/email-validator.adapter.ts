/*
 * File: email-validator.adapter.ts
 * Project: type-node
 * Created: Monday, July 26th 2021, 4:11:43 pm
 * Last Modified: Monday, July 26th 2021, 4:34:46 pm
 * Copyright © 2021 AMDE Agência
 */

import validator from 'validator'
import {EmailValidator} from '../presentation/interfaces/emailValidator.interface'

export class EmailValidatorAdapter implements EmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email)
  }
}
