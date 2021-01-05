import {Events} from '@revgaming/session'
import {incrementUserCounter, setCurrentUser} from './users'
import {incrementAgentCounter, setCurrentAgent} from './agents'

const getEventUser = (event) => {
    if (!event.detail)
        if (!user) throw `detail not found in ${event.type}`
    const user = event.detail.user;
    if (!user) throw `user not found on ${event.type}`
    if (!(user instanceof Object))
        throw `user is not object in event ${event.type}`
    return user;
}

export const IncrementAgentSessionsOnCreated = () =>
    window.addEventListener(Events.SessionCreated, () =>
        incrementAgentCounter('sessions'),
    )

export const IncrementAgentHitsOnInitialized = () =>
    window.addEventListener(Events.SessionInitialized, () =>
        incrementAgentCounter('hits'),
    )

export const setCurrentUserOnAuthenticated = () =>
    window.addEventListener(Events.UserAuthenticated, event => {
        setCurrentUser(getEventUser(event))
    })

export const setCurrentUserOnMounted = () =>
    window.addEventListener(Events.UserMounted, event => {
        setCurrentUser(getEventUser(event))
    })

export const setCurrentAgentOnInitialized = () =>
    window.addEventListener(Events.SessionInitialized, () => setCurrentAgent(window.navigator.userAgent));

export const IncrementUserLoginsOnAuthenticated = () =>
    window.addEventListener(Events.UserAuthenticated, () =>
        incrementUserCounter('logins'),
    )

export const IncrementUserHitsOnMounted = () =>
    window.addEventListener(Events.UserMounted, () =>
        incrementUserCounter('hits'),
    )
