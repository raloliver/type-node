/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Wednesday, June 30th 2021, 5:45:08 am
 * Copyright © 2021 AMDE Agência
 */

import {InvalidParamError, MissingParamError} from '../errors'
import {badRequest, serverError} from '../helpers/http.helper'
import {
  HttpRequest,
  HttpResponse,
  EmailValidator,
  Controller
} from '../interfaces'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  /**
   *
   *
   * @param {HttpRequest} httpRequest
   * @return {*}  {HttpResponse}
   * @memberof SignupController
   */
  handle(httpRequest: HttpRequest): HttpResponse {
    try {
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
    } catch (error) {
      return serverError()
    }
  }
}
