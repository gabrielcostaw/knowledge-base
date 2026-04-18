const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = app => {
    app.use(bodyParser.json())
    app.use(cors({
        origin: process.env.NODE_ENV === 'production'
            ? 'https://seu-frontend.netlify.app'
            : '*'
    }))
}