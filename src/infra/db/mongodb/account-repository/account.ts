/*
 * File: account.ts
 * Project: type-node
 * Created: Sunday, December 11th 2022, 7:22:50 am
 * Last Modified: Sunday, December 11th 2022, 7:59:21 am
 * Copyright © 2022 AMDE Agência
 */

import {AddAccountRepository} from '../../../../data/interfaces/add-account-repository.interface'
import {AddAccountModel} from '../../../../domain/interfaces/add-account.interface'
import {AccountModel} from '../../../../domain/models/account.model'
import {MongoDBHelper} from '../helpers/mongodb.helper'

export class AccountMongoDBRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoDBHelper.getCollection('accounts')
    const {insertedId} = await accountCollection.insertOne(accountData)
    const result = await accountCollection.findOne<AccountModel>()

    return Object.assign({}, result, {id: insertedId})
  }
}
