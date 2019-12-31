/**
* @description Generic useful functions
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/

'use strict'

// Built-in Modules
const fs = require('fs')
const path = require('path')

let certificatesPath = "../config/certificates"

/**
 * @description reads a file in utf8 format
 * @param {string} path
 * @returns {Promise} return promise with utf8 data
 */
let read = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

/**
 * @description writes or appends in a file
 * @param {string} path
 * @param {string} content
 * @param {string} header
 * @returns {Promise}  return promise with boolean
 */
let write = (path, content, header) => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            fs.appendFile(path, content, (err) => {
                if (err) reject(err)
                else resolve()
            })
        } else {
            fs.writeFile(path, header + content, (err) => {
                if (err) reject(err)
                else resolve()
            })
        }
    })
}

/**
 * @description converts tsv files to JSON formatted data
 * @param {string} tsv
 * @returns {Object} return the data in JSON format
 */
let tsvJSON = (tsv) => {
    const lines = tsv.split('\n')
    const headers = lines.slice(0, 1)[0].split('\t')
    return lines.slice(1, lines.length).map(line => {
        const data = line.split('\t')
        return headers.reduce((obj, nextKey, index) => {
            obj[nextKey] = data[index]
            return obj
        }, {})
    })
}

/**
 * @description reads file synchronously
 * @param {string} filename 
 * @param {string} folder
 * @returns buffer
 */
const readCert = (filename, folder) => fs.readFileSync(path.resolve(__dirname, certificatesPath, folder, filename))


/**
 * @description reads a content of a package.json file
 */
const readPackage = require('../package.json')


module.exports.read = read
module.exports.write = write
module.exports.format = tsvJSON
module.exports.readCert = readCert
module.exports.readPackage = readPackage