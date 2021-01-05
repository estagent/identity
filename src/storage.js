import {v4 as uuid4} from 'uuid'

let keyName = 'identity'

export const setStorageKeyName = (key) => keyName = key;

const decodeIdentifications = str => {
    return JSON.parse(str)
}
const encodeIdentifications = data => {
    return JSON.stringify(data)
}
const saveIdentifications = (data = {}) => {
    data['updatedAt'] = Date.now()
    localStorage.setItem(keyName, encodeIdentifications(data))
}
const createIdentifications = () => {
    saveIdentifications({
        uuid: uuid4(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        ua: {},
        ui: {},
    })
}
export const getIdentifier = () => {
    const data = getIdentifications()
    return data['uuid']
}
export const getIdentifications = () => {
    let str = localStorage.getItem(keyName)
    if (str) return decodeIdentifications(str)
    else {
        createIdentifications()
        return getIdentifications()
    }
}
export const updateIdentifications = (mixed, values) => {
    const data = getIdentifications()
    if (mixed instanceof Object) {
        for (let key of Object.keys(mixed))
            data[key] = mixed[key]
    } else if (typeof mixed === "string") {
        data[mixed] = values
    }
    saveIdentifications(data)
}
