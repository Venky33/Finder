/**
* @description validator file
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/

'use strict'

// Internal Modules
const twitter = require('./twitter')

/**
 * @description validate user requests
 * @param {object} users
 * @returns {Promise} return promise with object
 */
let validate = (users) => {
    return new Promise((resolve, reject) => {
        try {
            let { source, lookup } = users
            if (source, lookup) {
                Promise.all([twitter.isValidHandle(source), twitter.isValidHandle(lookup)])
                    .then(result => {
                        if (source == lookup) reject(`source and lookup can't be same`)
                        if (result[0] == source && result[1] == lookup) resolve(users)
                        else reject('Invalid user handles')
                    })
                    .catch(error => reject(error))
            }
            else reject('User handles required')
        }
        catch (error) { reject(error) }
    })
}

module.exports = validate