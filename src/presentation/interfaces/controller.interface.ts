/*
 * File: controller.interface.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:28:57 am
 * Last Modified: Wednesday, June 30th 2021, 3:09:25 pm
 * Copyright © 2021 AMDE Agência
 */

import {HttpRequest, HttpResponse} from './http.interface'

export interface Controller {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
