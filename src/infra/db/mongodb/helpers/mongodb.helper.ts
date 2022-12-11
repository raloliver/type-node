/*
 * File: mongo.helper.ts
 * Project: type-node
 * Created: Sunday, December 11th 2022, 7:10:19 am
 * Last Modified: Sunday, December 11th 2022, 7:16:01 am
 * Copyright © 2022 AMDE Agência
 */

import {MongoClient} from 'mongodb'

/**
 * it is necessary init the prop as null, cause of the nature of object in JS
 */
export const MongoDBHelper = {
  client_db: null as MongoClient,
  async connect(uri: string): Promise<void> {
    this.client_db = await MongoClient.connect(uri)
  },
  async close(): Promise<void> {
    await this.client_db.close()
  }
}
