<template>
    <div class="article-item">
        <router-link :to="{ name: 'articleById', params: { id: article.id } }">
            <div class="article-item-img d-none d-sm-block">
                <img v-if="article.imageUrl"
                 :src="article.imageUrl"
                 height="150" width="150" alt="Article">
                 <img v-else
                    src="../../assets/article.png"
                    height="150" width="150" alt="Article">
            </div>
            <div class="article-item-info">
                <h2>{{ article.name }}</h2>
                <p>{{ article.description }}</p>
                <span class="article-item-author">
                    <strong>Autor: </strong> {{ article.author }}
                </span> 
            </div>
        </router-link>
    </div>
</template>

<script>

export default {
    name: 'ArticleItem',
    props: ['article']
}
</script>

<style>
    .article-item {
        border-radius: var(--radius);
        margin-bottom: 20px;
        background-color: var(--surface);
        padding: 24px;
        box-shadow: var(--shadow);
        transition: box-shadow var(--transition), transform var(--transition);
    }

    .article-item:hover {
        box-shadow: var(--shadow-hover);
        transform: translateY(-3px);
    }

    .article-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: var(--text);
        gap: 20px;
    }

    .article-item-img {
        flex-shrink: 0;
    }

    .article-item-img img {
        border-radius: 8px;
        object-fit: cover;
        width: 130px;
        height: 130px;
    }

    
    .article-item-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }

    .article-item-info h2 {
        font-size: 1.4rem;
        font-weight: 700;
        margin: 0 0 8px 0;
        color: var(--text);

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .article-item-info p {
        flex: 1;
        color: var(--text-light);
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0 0 12px 0;
    
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .article-item-author {
        font-size: 0.8rem;
        color: var(--text-light);
        letter-spacing: 0.5px;
    }

    .article-item-author strong {
        color: var(--primary);
    }

    .articles-by-category .load-more {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        margin-bottom: 30px;
        width: 100%;
    }

    .page-title {
        padding: 20px 20px 0 20px;
    }
</style>