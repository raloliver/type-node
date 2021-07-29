/*
 * File: db-add-account.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:40:21 pm
 * Last Modified: Thursday, July 29th 2021, 8:45:03 pm
 * Copyright © 2021 AMDE Agência
 */

import {
  AddAccount,
  Encrypter,
  AddAccountModel,
  AccountModel,
  AddAccountRepository
} from './db-add-account.protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  /**
   * In the Object.assign, whem you pass {} as first arg,
   * you create a new object instead to modify the current
   *
   * @param {AddAccountModel} accountData
   * @return {*}  {Promise<AccountModel>}
   * @memberof DbAddAccount
   */
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(
      Object.assign({}, accountData, {password: hashedPassword})
    )
      
    return account
  }
}
