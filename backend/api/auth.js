const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => {
        try {
            if(!req.body.email || !req.body.password) {
                return res.status(400).send('Email ou Senha não informado.')
            } 
    
            const user = await app.db('users')
                .where({ email: req.body.email})
                .first()
    
            if(!user) return res.status(400).send('Usuário não encontrado')
            
            //compara a senha digitada com o hash salvo no banco
            const isMatch = bcrypt.compareSync(req.body.password, user.password)
            if(!isMatch) return res.status(401).send('Usuário ou senha inválido')
    
            const now = Math.floor(Date.now() / 1000)
    
            // payload é o conjunto de dados que ficam dentro do token
            const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                admin: user.admin,
                iat: now,                      //data de criação
                exp: now + (60 * 60 * 24 * 3)  //expira em 3 dias
            }
    
            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
            
        } catch(e) {
            res.status(500).send('Erro interno') 
        }

    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                //verifica se o token ainda não expirou
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            //token invalido ou expirado, retorna false
            return res.send(false)
        }

        res.send(false)
    }

    return { signin, validateToken }
}