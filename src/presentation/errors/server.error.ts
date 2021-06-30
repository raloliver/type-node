/*
 * File: server.error.ts
 * Project: type-node
 * Created: Tuesday, June 29th 2021, 2:27:21 pm
 * Last Modified: Tuesday, June 29th 2021, 2:28:24 pm
 * Copyright © 2021 AMDE Agência
 */

export class ServerError extends Error {
  constructor() {
    super(`Innternal server error`)
    this.name = 'ServerError'
  }
}
