const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvent = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy-mm-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname,'..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname,'..', 'logs'));
        }

        await fsPromises.appendFile(path.join(__dirname,'..', 'logs', logName), logItem);
    } catch (err) {
        console.log(err);
    }
}
const logger = (req, res, next) => {
    // 1. what kind of req . 2. where it coming from . 3. throgh (eg. google) . 4. what kind of response
    logEvent(`${req.method} \t ${req.headers.origin} \t ${req.url}`, 'reqLog.txt')
     console.log(`${req.method}  ${req.path}`);
     next(); 
  }

module.exports = { logger, logEvent };