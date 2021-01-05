import Bowser from 'bowser'
import {getIdentifier, getIdentifications, setStorageKeyName} from './storage'
import {updateHeadersWithIdentifications} from './builders'
import {
    IncrementAgentSessionsOnCreated,
    IncrementAgentHitsOnInitialized,
    IncrementUserLoginsOnAuthenticated,
    IncrementUserHitsOnMounted,
    setCurrentUserOnAuthenticated,
    setCurrentAgentOnInitialized,
    setCurrentUserOnMounted,
} from './listeners'

import {getUsers} from "./users";
import {getAgents} from "./agents";

export {getIdentifier, getIdentifications, getUsers, getAgents}
export {updateHeadersWithIdentifications}

let parser = Bowser.getParser(window.navigator.userAgent)

export const agentParser = () => parser
export const agentResult = () => parser.getResult()
export const agentIs = (string, withAliases = false) =>
    parser.is(string, withAliases)

export const bootIdentity = (opts = {}) => {

    if (opts.key)
        setStorageKeyName(opts.key)

    if (opts.hasOwnProperty('agents')) {
        setCurrentAgentOnInitialized()
        IncrementAgentHitsOnInitialized()
        IncrementAgentSessionsOnCreated()
    }
    if (opts.hasOwnProperty('users')) {
        setCurrentUserOnMounted()
        setCurrentUserOnAuthenticated()
        IncrementUserHitsOnMounted()
        IncrementUserLoginsOnAuthenticated()
    }

    return {
        getIdentifier: getIdentifier,
        getIdentifications: getIdentifications,
        agentParser: agentParser,
        agentResult: agentResult,
        agentIs: agentIs,
    }
}

