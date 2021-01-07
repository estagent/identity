import {getEventUser} from '@revgaming/helpers'
import {Events} from '@revgaming/session'
import {IncrementUserLogins, IncrementUserHits, setCurrentUser} from './storage'


export const setCurrentUserOnMounted = () =>
  window.addEventListener(Events.UserMounted, event => {
    setCurrentUser(getEventUser(event))
  })

export const IncrementUserLoginsOnAuthenticated = () =>
  window.addEventListener(Events.UserAuthenticated, IncrementUserLogins)

export const IncrementUserHitsOnMounted = () =>
  window.addEventListener(Events.UserMounted, IncrementUserHits)
