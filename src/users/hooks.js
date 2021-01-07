import {Events as SessionEvents, Request} from '@revgaming/session'
import {getEventDetail} from '@revgaming/helpers'
import {SignUserIdentification} from './storage'
import paths from '../hooks/paths'
import {getIdentity} from '../storage'
import {Events} from '../events'

const getUserPath = type => {
  const basePath = paths.users
    .replace('{identities}', paths.identities)
    .replace('{identity}', getIdentity())
  switch (type) {
    case 'store':
      return basePath
  }
}

const store = () =>
  window.addEventListener(Events.UserIdentified, event => {
    const data = getEventDetail(event, 'user')
    const request = () => {
      return Request.post(getUserPath('store'), data).then(signature =>
        SignUserIdentification(signature),
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
