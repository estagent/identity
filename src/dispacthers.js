import Events from './events';

export const dispatchNewUserFound = (detail) => {
    window.dispatchEvent(new CustomEvent(Events.NewUserFound, {detail: detail}))
}
export const dispatchNewAgentFound = (detail) => {
    window.dispatchEvent(new CustomEvent(Events.NewAgentFound, {detail: detail}))
}
