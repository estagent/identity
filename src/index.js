import {KEYMAP, initStorage, getIdentity, getSignature} from './storage'
import addHeadersFromIdentities from './factories/addHeadersFromIdentities'
import {Events as SessionEvents} from '@revgaming/session'
import Agents from './agents'
import Users from './users'
import {Events} from './events'
import {initHooks} from './hooks'

export {Users, Agents, Events, KEYMAP}
export {addHeadersFromIdentities, getIdentity, getSignature}

export const bootIdentity = (opts = {}) => {

  window.addEventListener(SessionEvents.SessionInitialized, () =>
    initStorage(opts),
  )
  Agents.initialise()
  Users.initialise()

  if (opts.hasOwnProperty('hooks')) initHooks(opts.hooks)

  return {
    getIdentity: getIdentity,
  }
}
