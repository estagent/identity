export const Events = {
  AgentIdentified: 'agent-identified',
  UserIdentified: 'user-identified',
  IdentityCreated: 'identity-created',
}

export const dispatchUserIdentified = (detail) => {
  window.dispatchEvent(new CustomEvent(Events.UserIdentified, {detail: detail}))
}
export const dispatchAgentIdentified = (detail) => {
  window.dispatchEvent(new CustomEvent(Events.AgentIdentified, {detail: detail}))
}
export const dispatchIdentityCreated = (detail) => {
  window.dispatchEvent(new CustomEvent(Events.IdentityCreated, {detail: detail}))
}


