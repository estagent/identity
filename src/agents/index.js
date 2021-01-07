import {
  IncrementAgentHitsOnInitialized,
  IncrementAgentSessionsOnCreated, setCurrentAgentOnInitialized,
} from './listeners'

import {getParser} from './parser'
import {getAgents} from './storage'

export default {
  getParser: getParser,
  getIdentifications: getAgents,
  initialise: (opts = {}) => {
    setCurrentAgentOnInitialized()
    IncrementAgentHitsOnInitialized()
    IncrementAgentSessionsOnCreated()
  },
}
