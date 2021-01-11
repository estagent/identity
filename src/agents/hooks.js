import {Events as SessionEvents, Request} from '@revgaming/session'
import {getEventDetail} from '@revgaming/helpers'
import {SignAgentIdentification} from './storage'
import paths from '../hooks/paths'
import {getIdentity} from '../storage'
import {Events} from '../events'
import Bowser from 'bowser'

const agentPath = () => paths.agents
  .replace('{identities}', paths.identities)
  .replace('{identity}', getIdentity())

const update = () =>
  window.addEventListener(Events.AgentIdentified, event => {
    const browser = Bowser.getParser(window.navigator.userAgent)
    const agent = getEventDetail(event, 'agent')

    const request = () => Request
      .put(agentPath().concat('/').concat(agent.id), browser.getResult())
      .then(signature => SignAgentIdentification(signature))

    window.addEventListener(SessionEvents.SessionMounted, request, {once: true})
  });

export default [update]
