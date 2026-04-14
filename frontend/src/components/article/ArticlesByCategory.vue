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
        $route(to) {
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
    .articles-by-category ul {
        list-style-type: none;
        padding: 0px;
    }


    .articles-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
</style>