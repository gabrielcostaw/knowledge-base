const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
// const mongoose = require('mongoose')

require('./config/mongodb')


app.db = db
app.mongoose = mongoose

//consign carrega os arquivos automaticamente e injeta no app
//a ordem importa! passport antes das rotas e middlewares antes das apis
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


const PORT = process.env.PORT || 3000
app.listen(PORT)