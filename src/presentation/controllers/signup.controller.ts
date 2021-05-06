/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Thursday, May 6th 2021, 11:30:02 am
 * Copyright © 2021 AMDE Agência
 */

import {MissingParamError} from '../errors/missing-param.error'
import {badRequest} from '../helpers/http.helper'
import {Controller} from '../interfaces/controller.interface'
import {HttpRequest, HttpResponse} from '../interfaces/http.interface'

export class SignupController implements Controller {
  handle(httpRequest: HttpRequest): HttpResponse {
    const response: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return response
  }
}
