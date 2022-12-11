/*
 * File: account-mapper.ts
 * Project: type-node
 * Created: Sunday, December 11th 2022, 8:05:32 am
 * Last Modified: Sunday, December 11th 2022, 8:24:01 am
 * Copyright © 2022 AMDE Agência
 */

import {AccountModel} from '../../../../domain/models/account.model'

export const map = (account: any): AccountModel => {
  const {_id, ...accountWithoutId} = account
  return Object.assign({}, accountWithoutId, {id: _id})
}
