<template>
    <div class="article-by-id">
        <PageTitle icon="fa fa-file-o" :main="article.name" :sub="article.description" />
        <div class="article-content" v-html="article.content"></div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'


export default {
    name: 'ArticleById',
    components: { PageTitle },
    data: function() {
        return {
            article: {}
        } 
    },
    async mounted() {
        try{
            const url = `${baseApiUrl}/articles/${this.$route.params.id}`
            const res = await axios.get(url)
    
            this.article = res.data
        } catch(e) {
            showError(e)
        }
    },
    updated() {
        document.querySelectorAll('.article-content pre').forEach(e => {
            hljs.highlightBlock(e)
        })
    }
}
</script>

<style>
    .article-by-id {
        padding: 20px;
    }

    .article-content {
        background-color: var(--surface);
        border-radius: var(--radius);
        padding: 40px;
        box-shadow: var(--shadow);
        
        max-width: 900px;
        
        font-size: 1.05rem;
        line-height: 1.8;
        color: var(--text);
    }

    
    .article-content pre {
        padding: 24px;
        border-radius: 8px;
        font-size: 0.95rem;
        background-color: #1a1a2e;
        color: #e0e0e0;
        overflow-x: auto; 
        margin: 24px 0;
    }

    .article-content img {
        max-width: 100%;
        border-radius: 8px;
        margin: 16px 0;
    }

    .article-content h1,
    .article-content h2,
    .article-content h3 {
        color: var(--text);
        font-weight: 700;
        margin-top: 32px;
        margin-bottom: 16px;
    }

    .article-content p {
        margin-bottom: 16px;
    }

    .article-content :last-child {
        margin-bottom: 0;
    }
</style>