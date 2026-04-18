const { db } = require('./.env')

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'knowledge',
            user: 'postgres',
            password: 'postgres'
        },
        migrations: { directory: './migrations' }
    },
    production: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // obrigatório na maioria das plataformas
        migrations: { directory: './migrations' },
        pool: { min: 2, max: 10 }
    }
}