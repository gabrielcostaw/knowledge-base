const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/knowledge_stats', { useNewUrlParser: true })

// Erros após a conexão inicial (quedas, timeouts, etc.)
mongoose.connection.on('error', err => {
    const msg = 'Não foi possível se conectar com o MongoDB'
    console.log('\x1b[41m%s\x1b[37m', msg, '\x1b[0m')
    console.error(err)
})

// Conexão bem-sucedida (útil para debug)
mongoose.connection.once('open', () => {
    console.log('MongoDB conectado com sucesso!')
})

// Falha na conexão inicial
mongoose.connection.on('disconnected', () => {
    console.log('\x1b[41mMongoDB desconectado\x1b[37m \x1b[0m')
})