/*
 * File: invalid-param.error.ts
 * Project: type-node
 * Created: Tuesday, June 29th 2021, 1:48:43 pm
 * Last Modified: Tuesday, June 29th 2021, 2:28:31 pm
 * Copyright © 2021 AMDE Agência
 */

export class InvalidParamError extends Error {
    constructor(paramName: string) {
      super(`Invalid param: ${paramName}`)
      this.name = 'InvalidParamError'
    }
  }
  