/*
 * File: http.service.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 10:59:27 am
 * Last Modified: Thursday, May 6th 2021, 11:06:59 am
 * Copyright © 2021 AMDE Agência
 */

export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest {
  body?: any
}
