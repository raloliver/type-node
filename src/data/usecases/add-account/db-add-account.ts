/*
 * File: db-add-account.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:40:21 pm
 * Last Modified: Thursday, July 29th 2021, 8:05:40 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel
} from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter

  constructor(encrypter: Encrypter) {
    this.encrypter = encrypter
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise((resolve) => resolve(null))
  }
}
