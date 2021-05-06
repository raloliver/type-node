/*
 * File: controller.interface.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:28:57 am
 * Last Modified: Thursday, May 6th 2021, 11:29:44 am
 * Copyright © 2021 AMDE Agência
 */

import {HttpRequest, HttpResponse} from './http.interface'

export interface Controller {
  handle(httpRequest: HttpRequest): HttpResponse
}
