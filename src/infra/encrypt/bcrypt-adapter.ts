/*
 * File: bcrypt-adapter.ts
 * Project: type-node
 * Created: Friday, December 9th 2022, 10:03:58 am
 * Last Modified: Friday, December 9th 2022, 10:49:24 am
 * Copyright © 2022 AMDE Agência
 */

import bcrypt from 'bcrypt'

import {Encrypter} from '../../data/interfaces/encrypter.interface'

export class BcryptAdapter implements Encrypter {
  constructor(protected salt) {}

  async encrypt(value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)

    return hash
  }
}
