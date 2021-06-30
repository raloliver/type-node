/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Wednesday, June 30th 2021, 3:09:37 pm
 * Copyright © 2021 AMDE Agência
 */

import {InvalidParamError, MissingParamError} from '../../errors'
import {badRequest, ok, serverError} from '../../helpers/http.helper'
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
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const newAccount = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(newAccount)
    } catch (error) {
      return serverError()
    }
  }
}
