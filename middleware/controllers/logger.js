/**
* @description Logging stuff
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/

'use strict'

// Built-in Modules
const path = require('path')

// Internal Module
const functions = require('../functions')

/**
 * @description logs incoming requests
 * @param {Object}  {service, version, logType, url, message, method }
 * @returns {boolean} return promise with boolean
 */
let logFile = ({ service, version, logType, url, message, method }) => {
    return new Promise((resolve, reject) => {
        let date = new Date()
        let timestamp = date.toLocaleTimeString()
        let currentDate = date.toDateString()
        let pathString = path.join('.storage', 'result_' + currentDate + '.log');
        let txt = `${timestamp}\t${service}\t${version}\t[${logType}]\t${url}\t${message}\t[${method}]\n`
        let header = `timestamp\tservice\tversion\ttype\turl\tmessage\tmethod\n`
        functions.write(pathString, txt, header)
            .then(() => resolve(true))
            .catch((e) => reject(e))
    })
}

/**
 * @description logs error requests
 * @param {Object}  {service, version, logType, url, step, error, method }
 * @returns {boolean} return promise with boolean
 */
let logError = ({ service, version, logType, url, step, error, method }) => {
    return new Promise((resolve, reject) => {
        let date = new Date()
        let timestamp = date.toLocaleTimeString()
        let currentDate = date.toDateString()
        let pathString = path.join('.storage', 'error_' + currentDate + '.log')
        let txt = `${timestamp}\t${service}\t${version}\t[${logType}]\t${url}\t${step}\t${error}\t[${method}]\n`
        let header = `timestamp\tservice\tversion\ttype\turl\tstep\terror\tmethod\n`
        functions.write(pathString, txt, header)
            .then(() => resolve(true))
            .catch((e) => reject(e))
    })
}

/**
 * @description reads error or result log based on dates
 * @param {type} string error or may be result
 * @param {logDate} string particular date to read the results
 * @returns {boolean} return promise with boolean
 */
let readResults = (type, logDate) => {
    return new Promise((resolve, reject) => {
        let dateParts = logDate.split("/")
        let date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]).toDateString()
        let pathString = path.join('.storage', `${type}_${date}.log`)
        functions.read(pathString)
            .then(result => {
                console.log(functions.format(result))
                resolve(functions.format(result))
            })
            .catch((e) => reject(e))
    })
}


module.exports.post = logFile
module.exports.error = logError
module.exports.readResults = readResults

