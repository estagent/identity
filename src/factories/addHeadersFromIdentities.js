import {getIdentifications, KEYMAP} from '../storage'

// const exports = ['identity', 'created', 'updated', 'signature']

const defaultKey = key => 'X-'.concat(key.toUpperCase())

const makeHeaderKey = (ident, header) => {
  if (header === undefined) return defaultKey(ident)
  else if (header === true) return defaultKey(ident)
  else if (
    header instanceof Object &&
    Object.keys(header).length === 0 &&
    header.constructor === Object
  )
    return defaultKey(ident)
  else if (typeof header === 'string') return header
  throw `Error: identification header key type (${typeof header}) not supported`
}

const validateIdentification = key => {
  if (!key) throw 'Init Error: identification key required'
  if (typeof key !== 'string')
    throw 'Init Error: identification key must be string'
  if (!KEYMAP.hasOwnProperty(key)) throw `${key} is not identification key `
}

export default opts => {
  const identifications = getIdentifications()
  const headers = {}
  const addHeader = (ident, hOpt) => {
    validateIdentification(ident)
    if (hOpt === false) return
    const header_key = makeHeaderKey(ident, hOpt)
    const realKey = KEYMAP[ident]
    headers[header_key] = identifications[realKey]
  }
  const addHeaders = mixed => {
    if (mixed instanceof Array) {
      for (let item of mixed)
        if (item instanceof Object) addHeaders(item)
        else addHeader(item)
    } else for (let key of Object.keys(mixed)) addHeader(key, mixed[key])
  }
  // if array, identification keys are expected
  if (opts instanceof Object) addHeaders(opts)
  else if (typeof opts == 'string') addHeader('identity', opts)
  else if (opts === true) addHeader('identity')
  return headers
}
