/**
* @description Routes handler. This file handles all http requests.
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/
'use strict'

// Internal Modules
const { friends, logs } = require('../services') // services index

/** 
* @description Function that handles all request routes
* @param {object} app, {} a representation of an express app needed to handle routes
*/
let handler = app => {
    // Access Control
    app.all('*', (req, res, next) => {
        console.log('hit ' + req.originalUrl)
        //Access control, if required
        next()
    })

    app.get('/:source/:lookup', (req, res) => {
        friends.mutual(req, res)
    })

    app.get('/:type', (req, res) => {
        logs.read(req, res)
    })

    // Default 404 error for all requests not cached before
    app.all('*', (req, res) => res.status(404).json('Not found'))
}

exports.handler = handler