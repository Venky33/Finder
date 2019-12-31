/**
* @description Index file for Twitter Friends Analyzer
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/
'use strict'

// Built-in Modules
const http = require('http')
const https = require('https')

// NPM Modules
const express = require('express')
const cors = require('cors') // Cors for express

// Internal Modules
const routes = require('./middleware/routes')
const functions = require('./middleware/functions')
const env = process.env.NODE_ENV || 'default'
const { httpPort, httpsPort } = require('./config')[env]

// Express Init
const app = express()
app.set('env', 'production') // Set env to production to avoid showing trace errors
app.use(cors())

// Endpoint Handler 
routes.handler(app)

// WebServer HTTP
http.createServer(app).listen(httpPort, () => {
  console.log(`Finder started at ${new Date().toLocaleString()}`)
  console.log(`PID: ${process.pid}.`)
  console.log(`HTTP Port: ${httpPort}`)
})
try{
  let httpsOptions = {
    key: functions.readCert('client_key.pem','self'),
    cert: functions.readCert('client.pem','self')
  }
  https.createServer(httpsOptions,app).listen(httpsPort, ()=> {
    console.log(`HTTPS Port: ${httpsPort}`)
    console.log(`HTTPS is ON. Requests to ${httpPort} will be redirected.`)
    process.env.httpsRunning = true
  })
}
catch(e){
  console.log('Couldn\'t start HTTPS: \n'+e+'\n')
}
