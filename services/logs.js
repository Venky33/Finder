/**
* @description logs services file to respond to log endpoints
* @author LiftOff - Vikas Gawade
* @date 30/12/2019
*/
'use strict'

// Internal Modules
let { logger } = require("../middleware/controllers")

/**
 * @description handles logging
 * @param {object} req request object
 * @param {object} res response object
 */
let readLogs = (req, res) => {
  let type = req.params.type
  let date = req.query.date
  if (type && date) {
    logger.readResults(type, req.query.date)
      .then(result => res.status(200).json(result))
      .catch(() => res.status(400).json({ error: 'ERROR: No logs found' }))
  } else res.status(400).json({ error: 'ERROR: Type OR Date is missing' })
}

module.exports.read = readLogs
