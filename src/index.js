import {
  KEYMAP,
  InitStorageOnSessionInitialized,
  getIdentity,
  getSignature,
} from './storage'
import addHeadersFromIdentities from './factories/addHeadersFromIdentities'
import Agents from './agents'
import Users from './users'
import {Events} from './events'
import {initHooks} from './hooks'
import {getParser, MATCHERS} from './parser'

let agents
let users

export {Events}
export {KEYMAP, getIdentity, getSignature}
export {addHeadersFromIdentities}
export {MATCHERS, getParser}

export const bootIdentity = (opts = {}) => {
  InitStorageOnSessionInitialized(opts)
  agents = new Agents()
  users = new Users()
  if (opts.hasOwnProperty('hooks')) initHooks(opts.hooks)

  return {
    getIdentity: getIdentity,
    getUsers: users.getUsers,
    getAgents: agents.getAgents,
    getParser: getParser,
  }
}
