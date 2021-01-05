import {getIdentifications} from './storage'

const makeIdentificationHeaders = (options) => {

    const identifications = getIdentifications()
    const headers = {}

    const addHeader = (identification, hKey) => {

        if (!identification)
            throw 'Init Error: identification key required'

        if (typeof identification !== 'string')
            throw 'Init Error: identification key must be string'

        if (!identifications.hasOwnProperty(identification))
            throw `${identification} is not identification key `

        if (!hKey)
            hKey = 'X-'.concat(identification.capitalize())

        if (typeof hKey !== 'string')
            throw 'Init Error: header key must be string'

        headers[hKey] = identifications[identification]
    }

    const makeHeadersFromObject = (obj) => {
        for (let key of Object.keys(obj))
            addHeader(obj[key], key)
    }

    // if array, identification keys are expected
    if (options instanceof Array) {
        for (let item of options) {
            if (item instanceof Object)
                makeHeadersFromObject(item)
            else addHeader(item)
        }

    } else if (options instanceof Object) // if object, headers keys are expected
        makeHeadersFromObject(options)

    else if (typeof options === 'string')
        addHeader(options)
    else addHeader('identifier')

    return headers
}

export const updateHeadersWithIdentifications = (headers, opts) => {

    if (typeof headers !== 'object')
        throw 'Init Error: headers is not object'

    let identificationHeaders = {}

    if (!opts)
        identificationHeaders = makeIdentificationHeaders()
    else if (typeof opts == 'string')
        identificationHeaders = makeIdentificationHeaders(opts)

    if (opts instanceof Array) {
        identificationHeaders = makeIdentificationHeaders(opts)

    } else if (opts instanceof Object) {

        const bOpts = []

        if (opts.hasOwnProperty('identifier')) {
            if (opts.identifier !== false) {
                if (typeof opts.identifier === 'string')
                    bOpts.push({[opts.identifier]: 'uuid'})
                else
                    bOpts.push('uuid')
            }
        }

        if (opts.hasOwnProperty('timestamps')) {
            if (opts.timestamps !== false) {
                if (opts.timestamps === true)
                    bOpts.push('createdAt', 'updatedAt')
                else if (opts.timestamps instanceof Array) {
                    for (const value of opts.timestamps)
                        bOpts.push(value) // might be objects also
                } else if (opts.timestamps instanceof Object) {
                    const keys = Object.keys(opts.timestamps)
                    if (keys.length === 0)
                        bOpts.push('createdAt', 'updatedAt')
                    else for (const key of keys)
                        bOpts.push({[key]: opts.timestamps[key]})
                } else
                    throw `Init Error: timestamps(identifications) option type (${typeof opts.timestamps}) is not supported`
            }
        }

        // if (Object.keys(bOpts))
        identificationHeaders = makeIdentificationHeaders(bOpts)

    } else throw `options is in unsupported type ${typeof opts}`


    for (let key of Object.keys(identificationHeaders)) {
        headers[key] = identificationHeaders[key]
    }

    return headers
}





