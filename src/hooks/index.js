import paths from './paths'
import identityHooks from './identities'
import agentHooks from '../agents/hooks'
import userHooks from '../users/hooks'

export const initHooks = opts => {
  if (typeof opts === 'object') {
    for (let key of Object.keys(opts)) {
      const val = opts[key]
      if (typeof val == 'string') paths[key] = val
      switch (key) {
        case 'identities':
          identityHooks.forEach(callback => callback())
          break
        case 'users':
          userHooks.forEach(callback => callback())
          break
        case 'agents':
          agentHooks.forEach(callback => callback())
          break
      }
    }
  } else if (opts === true) {
    identityHooks.forEach(callback => callback())
    agentHooks.forEach(callback => callback())
    userHooks.forEach(callback => callback())
  }
}
