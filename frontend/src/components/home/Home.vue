<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" 
            sub="Base de conhecimento" />
        <div class="stats">
            <Stat :title="'Categorias'" :value="stat.categories"
                icon="fa fa-folder" :color="'red'"/>
            <Stat :title="'Artigos'" :value="stat.articles"
                icon="fa fa-file" :color="'green'"/>
            <Stat :title="'Usuários'" :value="stat.users"
                icon="fa fa-users" :color="'blue'" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'

export default {    
    name: 'Home',
    components: { PageTitle, Stat },
    data: function() {
        return {
            stat: {}
        }
    },
    mounted() {
        this.getStats()
    },
    methods: {
        async getStats() {
            try {
                const { data } = await axios.get(`${baseApiUrl}/stats`)
                console.log(data)
                this.stat = data
            } catch(e){
                console.error('Erro ao buscar stats: ', (e))
            } 
        }
    }
}
</script>

<style>
    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>