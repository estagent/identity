import {Events} from '@revgaming/session'

import {
  IncrementAgentHits,
  IncrementAgentSessionCount,
  setCurrentAgent,
} from './storage'

export const setCurrentAgentOnInitialized = () =>
  window.addEventListener(
    Events.SessionInitialized,
    () => setCurrentAgent(window.navigator.userAgent),
    {once: true},
  )

export const IncrementAgentHitsOnInitialized = () =>
  window.addEventListener(Events.SessionInitialized, IncrementAgentHits)

export const IncrementAgentSessionsOnCreated = () =>
  window.addEventListener(Events.SessionCreated, () =>
    window.addEventListener(
      Events.SessionInitialized,
      IncrementAgentSessionCount,
      {
        once: true,
      },
    ),
  )
