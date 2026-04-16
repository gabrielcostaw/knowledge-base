const consign = require('consign')
const schedule = require('node-schedule')

module.exports = app => {

    //roda a cada 1 minuto e salva as estatisticas no MongoDB
    //Só salva  se algo mudou e evita dados duplicados
    schedule.scheduleJob('*/1 * * * *', async function () {
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat

        //busca o registro mais recente para comparar
        const lastStat = await Stat.findOne({}, {},
            { sort: {'createdAt': -1 }} )

        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeArticles || changeCategories) {
            stat.save().then(() => console.log('[Stats] Estatísticas atualizadas'))
        }
        
    })
}