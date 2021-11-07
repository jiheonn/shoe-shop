import * as util from 'util'
import * as crypto from 'crypto'

import { User } from '../db/models'

const randomBytesPromise = util.promisify(crypto.randomBytes)
const pbkdf2Promise = util.promisify(crypto.pbkdf2)

const createSalt = async () => {
  const buf = await randomBytesPromise(64)

  return buf.toString('base64')
}

export const createHashedPassword = async password => {
  const salt = await createSalt()

  const key = await pbkdf2Promise(password, salt, 99999, 64, 'sha512')
  const hashedPassword = key.toString('base64')

  return { hashedPassword, salt }
}

export const compare = async (userId, password) => {
  const salt = await User.findOne({
    attributes: ['salt'],
    where: {
      id: userId,
    },
    raw: true,
  }).then(result => result.salt)

  const key = await pbkdf2Promise(password, salt, 99999, 64, 'sha512')

  return key.toString('base64')
}
