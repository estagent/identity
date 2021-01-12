export const Events = {
  AgentIdentified: 'agent-identified',
  UserIdentified: 'user-identified',
  IdentityCreated: 'identity-created',
  IdentitySigned: 'identity-signed',
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

export const dispatchIdentitySigned = (detail) => {
  window.dispatchEvent(new CustomEvent(Events.IdentitySigned, {detail: detail}))
}


