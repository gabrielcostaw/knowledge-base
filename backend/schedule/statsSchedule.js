const schedule = require('node-schedule')

module.exports = app => {

    schedule.scheduleJob('*/1 * * * *', async function () {

        const usersCount = await app.db('users').count('id as count').first()
        const categoriesCount = await app.db('categories').count('id as count').first()
        const articlesCount = await app.db('articles').count('id as count').first()

        const lastStat = await app.db('stats')
            .orderBy('created_at', 'desc')
            .first()

        const stat = {
            users: Number(usersCount.count),
            categories: Number(categoriesCount.count),
            articles: Number(articlesCount.count),
            created_at: new Date()
        }

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if (changeUsers || changeCategories || changeArticles) {
            await app.db('stats').insert(stat)
            console.log('[Stats] Estatísticas atualizadas')
        }
    })
}