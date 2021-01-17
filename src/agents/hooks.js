import Bowser from 'bowser'
import {Events as SessionEvents, Request} from '@revgaming/session'
import {getEventDetail} from '@revgaming/helpers'
import {SignAgentIdentification} from './storage'
import paths from '../hooks/paths'
import {getIdentity, isIdentitySigned} from '../storage'
import {Events} from '../events'
import addHeadersFromIdentities from '../factories/addHeadersFromIdentities'

const agentPath = () =>
  paths.agents
    .replace('{identities}', paths.identities)
    .replace('{identity}', getIdentity())

const update = () =>
  window.addEventListener(Events.AgentIdentified, event => {
    const agent = getEventDetail(event, 'agent')
    const browser = Bowser.getParser(agent.UA)
    const request = () =>
      Request.put(
        agentPath().concat('/').concat(agent.id),
        browser.getResult(),
        {
          headers: addHeadersFromIdentities('signature'), // use func to get same session header
        },
      ).then(signature => SignAgentIdentification(signature))

    if (isIdentitySigned())
      window.addEventListener(SessionEvents.SessionMounted, request, {
        once: true,
      })
    else window.addEventListener(Events.IdentitySigned, request, {once: true})
  })

export default [update]
