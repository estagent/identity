import {getEventDetail} from '@revgaming/helpers'
import {Request, Events as SessionEvents} from '@revgaming/session'
import {SingIdentifier} from '../storage'
import {Events} from '../events'
import paths from './paths'

const update = () =>
  window.addEventListener(Events.IdentityCreated, event => {
    const identity = getEventDetail(event, 'identity')
    const request = () => {
      return Request.put(
        paths.identities.concat('/').concat(identity)
      ).then(signature => SingIdentifier(signature))
    }
    window.addEventListener(SessionEvents.SessionMounted, request, {once: true})
  })

export default [update]
