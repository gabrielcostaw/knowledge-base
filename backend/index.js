const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const mongoose = require('mongoose')

require('./config/mongodb')


app.db = db
app.mongoose = mongoose

consign()
    .include('./config/passport.js')
    .then('./api/auth.js')
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api/user.js')
    .then('./api/category.js')
    .then('./api/article.js')
    .then('./api/stat.js')
    .then('./schedule')
    .then('./config/routes.js')
    .into(app)


app.listen(3000, () => {
    console.log('backend executando com sucesso') 
})