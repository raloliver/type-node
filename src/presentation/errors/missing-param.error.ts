/*
 * File: missing-param.error.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:06:03 am
 * Last Modified: Thursday, May 6th 2021, 11:09:19 am
 * Copyright © 2021 AMDE Agência
 */

export class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}
