import MD5 from 'crypto-js/md5'
import {getIdentifications, updateIdentifications} from './storage'
import {dispatchNewAgentFound} from "./dispacthers";

let userAgent,
    agentId

export const setCurrentAgent = UA => {
    userAgent = UA
    agentId = makeId(userAgent)
    const agents = getAgents()
    updateIdentifications('currUa', agentId)
    if (!Object.keys(agents).includes(agentId))
        dispatchNewAgentFound({
            userAgent: UA,
            agentId: agentId
        })

}

const makeId = ua => {
    return MD5(ua).toString()
}

export const getAgents = () => {
    return getIdentifications()['ua']
}

const updateAgents = data => {
    updateIdentifications('ua', data)
}

export const getAgentIdentification = () => {
    const agents = getAgents()
    if (Object.keys(agents).includes(agentId)) return agents[agentId]
}

export const updateAgentIdentification = (attributes = {}) => {
    const data = getAgentIdentification() ?? {
        ua: userAgent,
        createdAt: Date.now(),
    }

    for (let key of Object.keys(attributes)) {
        data[key] = attributes[key]
    }
    data['updatedAt'] = Date.now()
    const agents = getAgents()
    agents[agentId] = data
    updateAgents(agents)
}

export const incrementAgentCounter = key => {
    const data = getAgentIdentification() ?? {}
    updateAgentIdentification({
        [key]: (data[key] ?? 0) + 1,
    })
}
