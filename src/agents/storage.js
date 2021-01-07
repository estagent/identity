import MD5 from 'crypto-js/md5'
import {getIdentifications, KEYMAP, updateIdentifications} from '../storage'
import {dispatchAgentIdentified} from '../events'

let agentId

export const getAgents = () => getIdentifications(KEYMAP.agents) ?? {}
export const IncrementAgentSessionCount = () =>
  incrementAgentCounter(KEYMAP.sessions)
export const IncrementAgentHits = () => incrementAgentCounter(KEYMAP.hits)
export const SignAgentIdentification = sig =>
  updateAgentIdentification(KEYMAP.signature, sig)

export const makeId = ua => MD5(ua).toString()
export const getAgentIdentification = (id = agentId) => {
  const agents = getAgents()
  if (Object.keys(agents).includes(id)) return agents[id]
}
export const setCurrentAgent = UA => {
  agentId = makeId(UA)
  updateIdentifications(KEYMAP.currentAgent, agentId)
  createIfNotExists({
    UA: UA,
    id: agentId,
  })
}

const createIfNotExists = data => {
  if (!Object.keys(getAgents()).includes(agentId)) {
    updateAgentIdentification({
      [KEYMAP.agent]: data.UA,
    })
    dispatchAgentIdentified({
      agent: data,
    })
  }
}

const updateAgents = data => updateIdentifications(KEYMAP.agents, data)

const createAgentIdentification = () => {
  return {
    [KEYMAP.signature]: null,
    [KEYMAP.created]: Date.now(),
    [KEYMAP.hits]: 0,
    [KEYMAP.sessions]: 0,
  }
}

const updateAgentIdentification = (attributes = {}) => {
  const data = getAgentIdentification() ?? createAgentIdentification()
  for (let key of Object.keys(attributes)) {
    data[key] = attributes[key]
  }
  data[KEYMAP.updated] = Date.now()
  const agents = getAgents()
  agents[agentId] = data
  updateAgents(agents)
}

const incrementAgentCounter = key => {
  const data = getAgentIdentification() ?? createAgentIdentification()
  updateAgentIdentification({
    [key]: (data[key] ?? 0) + 1,
  })
}
