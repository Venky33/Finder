/**
* @description twitter API stuff
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/

'use strict'

// Internal Modules
const request = require('./request')

// API Configuration
let twitterConfig = {
    rejectUnauthorized: false,
    uri: 'https://api.twitter.com/1.1',
    host: 'api.twitter.com'
}

/**
 * INTERNAL
 * @description creates copy of an object
 * @param {object} object
 * @returns {object} 
 */
const cloneDeep = object => JSON.parse(JSON.stringify(object))

/**
 * INTERNAL
 * @description gets list of userId's based on passed handle
 * @param {string} handle twitter username (userHandle)
 * @returns {Promise} returns promise with array
 */
let getFriends = handle => {
    return new Promise((resolve, reject) => {
        try {
            let options = cloneDeep(twitterConfig)
            options.uri += '/friends/ids.json'
            options.qs = { screen_name: handle }
            request.get(options)
                .then(result => resolve(JSON.parse(result).ids))
                .catch(error => reject(error))
        }
        catch (error) { reject(error) }
    })
}

/**
 * INTERNAL
 * @description gets the handle name (screen_name) 
 * @param {array} ids list of userId's
 * @returns {Promise} returns promise with array
 */
let getHandles = ids => {
    return new Promise((resolve, reject) => {
        try {
            let options = cloneDeep(twitterConfig)
            options.uri += '/users/show.json'
            let promises = ids.map(id => {
                options.qs = { user_id: id }
                return request.get(options)
            })
            Promise.all(promises)
                .then(result => resolve(result.map(handle => JSON.parse(handle).screen_name).filter(handle => handle !== undefined)))
                .catch(error => reject(error))
        }
        catch (error) { reject(error) }
    })
}

/**
 * INTERNAL
 * @description find the common id's  
 * @param {array} source list of source user id's
 * @param {array} lookup list of lookup user ids's
 * @returns {Promise} returns promise with array
 */
let compare = (source, lookup) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(source.filter(value => lookup.includes(value)))
        }
        catch (error) { reject(error) }
    })
}

/**
 * PUBLIC
 * @description handler to get the common friends  
 * @param {object} object user handles {source: 'user', 'lookup': 'user'}
 * @returns {Promise} returns promise with array
 */
let mutualFriends = (users) => {
    return new Promise((resolve, reject) => {
        try {
            let { source, lookup } = users
            Promise.all([getFriends(source), getFriends(lookup)])
                .then(ids => compare(...ids))
                .then(mutual => {
                    if (mutual && Array.isArray(mutual) && mutual.length) return getHandles(mutual)
                    else resolve()
                })
                .then(handles => resolve(handles))
                .catch(error => reject(error))
        }
        catch (error) { reject(error) }
    })
}
/**
 * @description To make sure handle is active on twitter
 * @param {string} handle
 * @returns {string} returns promise with string
 */
let validateHandle = handle => {
    return new Promise((resolve, reject) => {
        try {
            let options = cloneDeep(twitterConfig)
            options.uri += '/users/show.json'
            options.qs = { screen_name: handle }
            request.get(options)
                .then(result => resolve(JSON.parse(result).screen_name))
                .catch(error => reject(error))
        }
        catch (error) { reject(error) }
    })
}

module.exports.mutualFriends = mutualFriends
module.exports.isValidHandle = validateHandle