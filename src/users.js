import {getIdentifications, updateIdentifications} from './storage'
import {dispatchNewUserFound} from "./dispacthers";

let userId

export const setCurrentUser = user => {
    userId = user.uuid ?? user.id
    const users = getUsers();
    updateIdentifications('currUi', userId)
    if (!Object.keys(users).includes(userId))
        dispatchNewUserFound({
            user: user
        })
}

export const getUsers = () => {
    return getIdentifications()['ui']
}

const updateUsers = data => {
    updateIdentifications('ui', data)
}

export const getUserIdentification = () => {
    const users = getUsers()
    if (Object.keys(users).includes(userId)) return users[userId]
}

export const updateUserIdentification = (attributes = {}) => {
    const data = getUserIdentification() ?? {
        createdAt: Date.now(),
    }

    for (let key of Object.keys(attributes)) {
        data[key] = attributes[key]
    }
    data['updatedAt'] = Date.now()
    const users = getUsers()
    users[userId] = data
    updateUsers(users)
}

export const incrementUserCounter = key => {
    const data = getUserIdentification() ?? {}
    updateUserIdentification({
        [key]: (data[key] ?? 0) + 1,
    })
}
