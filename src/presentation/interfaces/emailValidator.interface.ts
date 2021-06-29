/*
 * File: emailValidator.interface.ts
 * Project: type-node
 * Created: Tuesday, June 29th 2021, 1:55:11 pm
 * Last Modified: Tuesday, June 29th 2021, 1:55:41 pm
 * Copyright © 2021 AMDE Agência
 */

export interface EmailValidator {
  isValid(email: string): boolean
}
