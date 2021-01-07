import {v4 as uuid4} from 'uuid'
import {dispatchIdentityCreated} from './events'
import {Events as SessionEvents} from '@revgaming/session'

let keyName = 'identity'
let identity

export const KEYMAP = {
  created: 'ct',
  updated: 'ut',
  identity: 'i',
  signature: 's',
  currentAgent: 'ca',
  currentUser: 'cu',
  hits: 'hc',
  logins: 'lc',
  sessions: 'sc',
  agents: '___a',
  users: '___u',
  agent: 'ua',
  timestamps: ['created', 'updated'],
}

export const InitStorageOnSessionInitialized = opts => {
  if (opts.key) setStorageKeyName(opts.key)
  window.addEventListener(SessionEvents.SessionInitialized, initStorage)
}

const initStorage = () => {
  identity = getIdentifications(KEYMAP.identity)
}

const setStorageKeyName = key => (keyName = key)

const decodeIdentifications = str => {
  return JSON.parse(str)
}
const encodeIdentifications = data => {
  return JSON.stringify(data)
}
const makeIdentity = () => uuid4()

const saveIdentifications = (data = {}) => {
  data[KEYMAP.updated] = Date.now()
  localStorage.setItem(keyName, encodeIdentifications(data))
}
export const getIdentifications = keys => {
  let str = localStorage.getItem(keyName)
  if (str) {
    const identifications = decodeIdentifications(str)
    if (keys) {
      if (keys instanceof Array) {
        const data = {}
        for (let key of keys) {
          const realKey = KEYMAP[key]
          data[key] = identifications[realKey]
        }
        return data
      } else if (keys instanceof Object) {
        const data = {}
        for (let key of Object.keys(keys)) {
          const realKey = keys[key]
          data[key] = identifications[realKey]
        }
        return data
      } else if (typeof keys === 'string') {
        return identifications[keys]
      } else {
        throw `unsupported identification key type (${typeof keys})`
      }
    } else return identifications
  } else {
    createIdentifications()
    return getIdentifications(keys)
  }
}

const createIdentifications = () => {
  const identity = makeIdentity()
  saveIdentifications({
    [KEYMAP.identity]: identity,
    [KEYMAP.created]: Date.now(),
    [KEYMAP.updated]: Date.now(),
    [KEYMAP.signature]: null,
    [KEYMAP.users]: {},
    [KEYMAP.agents]: {},
  })
  dispatchIdentityCreated({
    identity: identity,
  })
}

export const getIdentity = () => {
  if (!identity) identity = getIdentifications(KEYMAP.identity)
  return identity
}

export const getSignature = () => {
  return getIdentifications(KEYMAP.signature)
}
export const SingIdentifier = sig =>
  updateIdentifications(KEYMAP.signature, sig)

export const getTimestamps = () => {
  return getIdentifications(KEYMAP.timestamps)
}

export const updateIdentifications = (mixed, values) => {
  const data = getIdentifications()
  if (mixed instanceof Object) {
    for (let key of Object.keys(mixed)) data[key] = mixed[key]
  } else if (typeof mixed === 'string') {
    data[mixed] = values
  }
  saveIdentifications(data)
}
