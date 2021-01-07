import {Events as SessionEvents, Request} from '@revgaming/session'
import {getEventDetail} from '@revgaming/helpers'
import {SignAgentIdentification} from './storage'
import paths from '../hooks/paths'
import {getIdentity} from '../storage'
import {Events} from '../events'

const getAgentPath = type => {
  const basePath = paths.agents
    .replace('{identities}', paths.identities)
    .replace('{identity}', getIdentity())
  switch (type) {
    case 'store':
      return basePath
  }
}

const store = () =>
  window.addEventListener(Events.AgentIdentified, event => {
    const data = getEventDetail(event, 'agent')
    const request = () => {
      return Request.post(getAgentPath('store'), data).then(signature =>
        SignAgentIdentification(signature),
      )
    }
    request().catch(error => {
      if (error.response.status === 419)
        window.addEventListener(SessionEvents.SessionMounted, request, {
          once: true,
        })
    })
  })

export default [store]
