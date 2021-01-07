import {
  IncrementAgentHitsOnInitialized,
  IncrementAgentSessionsOnCreated,
  setCurrentAgentOnInitialized,
} from './listeners'


import {getAgents} from './storage'

export default function () {
  setCurrentAgentOnInitialized()
  IncrementAgentHitsOnInitialized()
  IncrementAgentSessionsOnCreated()
  return {
    getAgents: getAgents,
  }
}
