const allowedOrigins = require('./allowedOrigins')

const corsOptions = {
   origin: (origin, callback) => {
      allowedOrigins.includes(origin) ? callback(null, true) : callback(new Error('Not allowed by CORS'))
   },
   credentials: true,
   optionsSuccessStatus: 200
}

module.exports = corsOptions