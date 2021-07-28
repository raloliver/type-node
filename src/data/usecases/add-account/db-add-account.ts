/*
 * File: db-add-account.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:40:21 pm
 * Last Modified: Tuesday, July 27th 2021, 4:49:42 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  AddAccount,
  AddAccountModel
} from '../../../domain/interfaces/add-account.interface'
import {AccountModel} from '../../../domain/models/account.model'
import {Encrypter} from '../../interfaces/encrypter.interface'

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
