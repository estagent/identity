import {getEventDetail} from '@revgaming/helpers'
import {Request, Events as SessionEvents} from '@revgaming/session'
import {SingIdentifier} from '../storage'
import {Events} from '../events'
import paths from './paths'

const store = () =>
  window.addEventListener(Events.IdentityCreated, event => {
    const identity = getEventDetail(event, 'identity')
    const request = () => {
      return Request.post(paths.identities, {
        identity: identity,
      }).then(signature => SingIdentifier(signature))
    }

    request().catch(error => {
      if (error.response.status === 419)
        window.addEventListener(SessionEvents.SessionMounted, request, {
          once: true,
        })
    })
  })

export default [store]
