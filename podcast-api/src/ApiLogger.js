const uuid = require('uuid/v4')

const log = (req, res, next) => {
    const trace = uuid();
    console.log(`
        *****
        APP: PODCAST-RADIO
        TYPE: API
        TRACE: ${trace}
        URL: ${req.protocol}://${req.hostname}${req.path}
        METHOD: ${req.method}
        PARAMS: ${JSON.stringify(req.params)}
        HEADERS: ${JSON.stringify(req.headers)}
        COOKIES: ${JSON.stringify(req.cookies)}
        SIGNED COOKIES: ${JSON.stringify(req.signedCookies)}
        REMOTE IP: ${req.ip}
        TIMESTAMP: ${new Date()} 
        *****
        `);
    next();
}

module.exports = {
    log: log
}