/**
* @description Wrapper for request npm functions
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/

'use strict'

// NPM Modules
const request = require('request')

// Config stuff
const env = process.env.NODE_ENV || 'default'
const { twitter } = require('../../config')[env]
/**
 * @description sends GET request
 * @param {object} options request with values
 * @returns {object} Promise with body {string} 
 */
let getRequest = (options) => {
    return new Promise((resolve, reject) => {
        options.oauth = {
            consumer_key: twitter.consumer.key,
            consumer_secret: twitter.consumer.secret,
            token: twitter.access.token,
            token_secret: twitter.access.secret
        }
        request.get(options, (err, res, body) => {
            if (err) reject(err)
            resolve(body)
        })
    })
}

module.exports.get = getRequest

