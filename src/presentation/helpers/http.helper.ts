/*
 * File: http.helper.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:11:59 am
 * Last Modified: Thursday, May 6th 2021, 11:17:04 am
 * Copyright © 2021 AMDE Agência
 */

import {HttpResponse} from '../services/http.service'

/** o parenteses envolta das chaves é um sintax sugar e a função entende que é necessário retornar o objeto */
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})
