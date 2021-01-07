import {getIdentifications, KEYMAP} from '../storage'

// const exports = ['identity', 'created', 'updated', 'signature']

export default options => {
  const identifications = getIdentifications()
  const headers = {}
  const addHeader = (identification, hKey) => {
    if (!identification) throw 'Init Error: identification key required'
    if (typeof identification !== 'string')
      throw 'Init Error: identification key must be string'
    if (!KEYMAP.hasOwnProperty(identification))
      throw `${identification} is not identification key `
    if (hKey === undefined) hKey = 'X-'.concat(identification.toUpperCase())
    else if (hKey === false) return
    else if (typeof hKey !== 'string')
      throw 'Init Error: header key must be string'
    const realKey = KEYMAP[identification]
    headers[hKey] = identifications[realKey]
  }
  const addHeaders = mixed => {
    if (mixed instanceof Array) {
      for (let item of mixed) {
        if (item instanceof Object) addHeaders(item)
        else addHeader(item)
      }
    } else {
      for (let key of Object.keys(mixed)) addHeader(key, mixed[key])
    }
  }
  // if array, identification keys are expected
  if (options instanceof Object) addHeaders(options)
  console.log(headers)
  return headers
}

