import * as util from 'util'
import * as crypto from 'crypto'

const randomBytesPromise = util.promisify(crypto.randomBytes)
const pbkdf2Promise = util.promisify(crypto.pbkdf2)

const createHashedPassword = async password => {
  const buf = await randomBytesPromise(64)
  const salt = buf.toString('base64')
  const key = await pbkdf2Promise(password, salt, 99999, 64, 'sha512')
  const hashedPassword = key.toString('base64')

  return { hashedPassword, salt }
}

export default createHashedPassword
