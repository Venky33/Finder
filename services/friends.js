/**
* @description twitter friends service file
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/
'use strict'

// Internal Modules
const { logger, twitter, validate } = require('../middleware/controllers')
const functions = require('../middleware/functions')
const { name, version } = functions.readPackage

/**
 * @description logs & send the error
 * @param {object} req request object
 * @param {object} res response object
 * @param {string} step step in which error occurred
 * @param {mixed} error actual error
 */
let manageError = (req, res, step, error) => {
    logger.error({ service: name, version, logType: "ERROR", url: req.url, step, error, method: req.method })
    console.log(error)
    if (res) res.status(400).json({ error })
}
/**
 * @description services function to get mutual friends between two user accounts
 * @param {object} req request object
 * @param {object} res response object
 */
let mutual = (req, res) => {
    validate(req.params)
        .then(users => twitter.mutualFriends(users))
        .then(result => {
            logger.post({ service: name, version, logType: "INFO", url: req.url, message: result ? `Found ${result.length} mutual friends`: 'No mutual friends found', method: req.method })
            res.json({ handles: req.params, data: result ? result : 'No mutual friends found', count: result ? result.length : 0 })
        })
        .catch(error => manageError(req, res, 'Finding..', error))
}

module.exports.mutual = mutual
