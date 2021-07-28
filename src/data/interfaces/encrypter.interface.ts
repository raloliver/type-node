/*
 * File: encrypter.interface.ts
 * Project: type-node
 * Created: Tuesday, July 27th 2021, 4:43:05 pm
 * Last Modified: Tuesday, July 27th 2021, 4:44:13 pm
 * Copyright © 2021 AMDE Agência
 */

export interface Encrypter {
  encrypt(value: string): Promise<string>
}
