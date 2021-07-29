/*
 * File: add-account-repository.interface.ts
 * Project: type-node
 * Created: Thursday, July 29th 2021, 8:24:51 pm
 * Last Modified: Thursday, July 29th 2021, 8:27:20 pm
 * Copyright © 2021 AMDE Agência
 */

import {AddAccountModel} from '../usecases/add-account/db-add-account.protocols'
import {AccountModel} from '../../domain/models/account.model'

export interface AddAccountRepository {
  add(accountData: AddAccountModel): Promise<AccountModel>
}
