import {
  setCurrentUserOnMounted,
  IncrementUserHitsOnMounted,
  IncrementUserLoginsOnAuthenticated,
} from './listeners'
import {getUsers} from './storage'

export default function () {
  setCurrentUserOnMounted()
  IncrementUserHitsOnMounted()
  IncrementUserLoginsOnAuthenticated()
  return {
    getUsers: getUsers,
  }
}
