/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Tuesday, June 29th 2021, 2:12:20 pm
 * Copyright © 2021 AMDE Agência
 */

import {InvalidParamError} from '../errors/invalid-param.error'
import {MissingParamError} from '../errors/missing-param.error'
import {badRequest} from '../helpers/http.helper'
import {Controller} from '../interfaces/controller.interface'
import {EmailValidator} from '../interfaces/emailValidator.interface'
import {HttpRequest, HttpResponse} from '../interfaces/http.interface'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!isValid) {
      return badRequest(new InvalidParamError('email'))
    }
  }
}
