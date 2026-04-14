module.exports = app => {
    const Stat = app.mongoose.model('Stat', {
        users: Number,
        categories: Number,
        articles: Number,
        createdAt: Date
    })

    const get = async (req, res) => {
    try {
        const users = await app.db('users').whereNull('deletedAt').count('id as count').first()
        const categories = await app.db('categories').count('id as count').first()
        const articles = await app.db('articles').count('id as count').first()

        res.json({
            users: parseInt(users.count),
            categories: parseInt(categories.count),
            articles: parseInt(articles.count)
        })
    } catch (err) {
        res.status(500).send(err)
    }
}
    return { Stat,  get}
}