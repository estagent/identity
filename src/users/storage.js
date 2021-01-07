import {getIdentifications, KEYMAP, updateIdentifications} from '../storage'
import {dispatchUserIdentified} from '../events'

let userId

export const getUsers = () => getIdentifications(KEYMAP.users) ?? {}
export const IncrementUserHits = () => incrementUserCounter(KEYMAP.hits)
export const IncrementUserLogins = () => incrementUserCounter(KEYMAP.logins)
export const SignUserIdentification = sig => updateUserIdentification(KEYMAP.signature, sig)

export const getUserIdentification = (id = userId) => {
  const users = getUsers()
  if (Object.keys(users).includes(id)) return users[id]
}

export const setCurrentUser = user => {
  userId = user.uuid ?? user.id
  updateIdentifications(KEYMAP.currentUser, userId)
  createIfNotExists(user)
}

const createIfNotExists = user => {
  if (!Object.keys(getUsers()).includes(userId)) {
    updateUserIdentification({})
    dispatchUserIdentified({
      user: user,
    })
  }
}

const updateUsers = data => updateIdentifications(KEYMAP.users, data)

const createUserIdentification = () => {
  return {
    [KEYMAP.signature]: null,
    [KEYMAP.created]: Date.now(),
    [KEYMAP.hits]: 0,
    [KEYMAP.logins]: 0,
  }
}

const updateUserIdentification = (attributes = {}) => {
  const data = getUserIdentification() ?? createUserIdentification()
  for (let key of Object.keys(attributes)) {
    data[key] = attributes[key]
  }
  data[KEYMAP.updated] = Date.now()
  const users = getUsers()
  users[userId] = data
  updateUsers(users)
}

const incrementUserCounter = (key, increment = 1) => {
  const data = getUserIdentification() ?? createUserIdentification()
  updateUserIdentification({
    [key]: (data[key] ?? 0) + increment,
  })
}
