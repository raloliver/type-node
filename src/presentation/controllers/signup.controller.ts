/*
 * File: signup.controller.ts
 * Project: type-node
 * Created: Tuesday, May 4th 2021, 11:25:17 am
 * Last Modified: Thursday, May 6th 2021, 11:14:24 am
 * Copyright © 2021 AMDE Agência
 */

import {MissingParamError} from '../errors/missing-param.error'
import {badRequest} from '../helpers/http.helper'
import {HttpRequest, HttpResponse} from '../services/http.service'

export class SignupController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const response: HttpResponse = {
      statusCode: 200,
      body: {}
    }
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    return response
  }
}
