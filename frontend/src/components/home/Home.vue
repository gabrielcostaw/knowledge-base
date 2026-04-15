<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Dashboard" 
            sub="Base de conhecimento" />
        <div class="stats">
            <Stat :title="'Categorias'" :value="stat.categories"
                icon="fa fa-folder" :color="'#4361ee'"/>
            <Stat :title="'Artigos'" :value="stat.articles"
                icon="fa fa-file" :color="'#7209b7'"/>
            <Stat :title="'Usuários'" :value="stat.users"
                icon="fa fa-users" :color="'#f72585'" />
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stat from './Stat.vue'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import { showError } from '../../global'

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
                this.stat = data
            } catch(e){
                showError(e)
            } 
        }
    }
}
</script>

<style>
    .home {
        padding: 20px;
    }

    .stats {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
</style>