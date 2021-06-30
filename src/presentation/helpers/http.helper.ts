/*
 * File: http.helper.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:11:59 am
 * Last Modified: Wednesday, June 30th 2021, 3:05:34 pm
 * Copyright © 2021 AMDE Agência
 */

import {ServerError} from '../errors/server.error'
import {HttpResponse} from '../interfaces/http.interface'

/** o parenteses envolta das chaves é um sintax sugar e a função entende que é necessário retornar o objeto */
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
