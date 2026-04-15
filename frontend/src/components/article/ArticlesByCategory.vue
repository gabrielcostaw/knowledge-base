<template>
    <div class="articles-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article"/>
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getArticles">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
import PageTitle from '../template/PageTitle.vue'
import ArticleItem from './ArticleItem'

export default {
    name: 'ArticlesByCategory',
    components: { PageTitle, ArticleItem },
    data: function() {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    watch: {
        $route() {
            this.category.id = this.$route.params.id
            this.articles = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getArticles()
        }
    },
    methods: {
        async getCategory() {
            try {
                const url = `${baseApiUrl}/categories/${this.category.id}`
                const res = await axios.get(url)
    
                this.category = res.data
            } catch(e) {
                showError(e)
            }
        },
        async getArticles() {
            try {
                const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
                const res = await axios.get(url)
    
                this.articles = this.articles.concat(res.data)
                this.page++
    
                if(res.data.length === 0) this.loadMore = false
            } catch(e) {
                showError(e)
            }
        }
    },
    async mounted() {
        this.category.id = this.$route.params.id
        await this.getCategory()
        this.getArticles()
    }
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

    .articles-by-category ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }
    
    .articles-by-category li {
        list-style: none;
    }

    .articles-by-category {
        padding: 20px;
    }
</style>