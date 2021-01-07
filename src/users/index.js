import {
  setCurrentUserOnMounted,
  IncrementUserHitsOnMounted,
  IncrementUserLoginsOnAuthenticated,
} from './listeners'
import {getUsers} from './storage'

export default {
  getIdentifications: getUsers,
  initialise: (opts = {}) => {
    setCurrentUserOnMounted()
    IncrementUserHitsOnMounted()
    IncrementUserLoginsOnAuthenticated()
  },
}
