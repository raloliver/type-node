/*
 * File: add-account.interface.ts
 * Project: type-node
 * Created: Wednesday, June 30th 2021, 2:24:36 pm
 * Last Modified: Wednesday, June 30th 2021, 2:49:27 pm
 * Copyright © 2021 AMDE Agência
 */

import {AccountModel} from '../models/account.model'

export type AddAccountModel = {
  name: string
  email: string
  password: string
}

/**
 * Use case add account
 *
 * @export
 * @interface AddAccount
 */
export interface AddAccount {
  add(account: AddAccountModel): AccountModel
}
