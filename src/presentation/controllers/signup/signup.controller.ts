/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Wednesday, June 30th 2021, 2:56:10 pm
 * Copyright © 2021 AMDE Agência
 */

import {InvalidParamError, MissingParamError} from '../../errors'
import {badRequest, serverError} from '../../helpers/http.helper'
import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
  AddAccount
} from '../signup/signup.protocols'

export class SignupController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
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

      const {name, email, password, passwordConfirm} = httpRequest.body
      if (password !== passwordConfirm) {
        return badRequest(new InvalidParamError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
