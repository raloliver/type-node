/*
 * File: missing-param.error.ts
 * Project: type-node
 * Created: Thursday, May 6th 2021, 11:06:03 am
 * Last Modified: Tuesday, June 29th 2021, 1:49:05 pm
 * Copyright © 2021 AMDE Agência
 */

export class InvalidParamError extends Error {
    constructor(paramName: string) {
      super(`Invalid param: ${paramName}`)
      this.name = 'MissingParamError'
    }
  }
  