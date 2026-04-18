<template>
    <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
        <Header title="Base de conhecimento"
        :hideToggle="!user"
        :hideUserDropdown="!user" />
        <Menu v-if="user"/> 
        <Loading v-if="validatingToken" />
        <Content v-else />
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from './global'
import { mapState } from 'vuex'
import Header from '@/components/template/Header'
import Menu from '@/components/template/Menu'
import Content from '@/components/template/Content'
import Loading from '@/components/template/Loading'


export default {
    name: "App",
    components: { Header, Menu, Content, Loading },
    computed: mapState(['isMenuVisible', 'user']),
    data: function() {
        return {
            validatingToken: true
        }
    },
    methods: {
        async validateToken() {
            this.validatingToken = true
            
            const json = localStorage.getItem(userKey)
            const userData = JSON.parse(json)
            //limpa o usuário antes de validar, evita acesso indevido
            this.$store.commit('setUser', null)

            // sem dados no localStorage, manda para o login
            if(!userData) {
                this.validatingToken = false
                this.$router.push({ name: 'auth'})

                return
            }
            // valida o token no backend
            const res = await axios.post(`${baseApiUrl}/validateToken`, userData)
            
            if (res.data) {
                this.$store.commit('setUser', userData)
                //em telas pequenas o menu começa fechado 
                if(this.$mq === 'xs' || this.$mq === 'sm') {
                    this.$store.commit('toggleMenu', false)
                }
            } else {
                //token expirado, limpa tudo e manda para o login
                localStorage.removeItem(userKey)
                this.$router.push({ name: 'auth'})
            }

            this.validatingToken = false
        }
    }, 
    created() {
        this.validateToken()
    }
}
</script>

<style>
    :root {
        --primary: #4361ee;
        --primary-dark: #3a56d4;
        --background: #f0f2f5;
        --surface: #ffffff;
        --text: #212529;
        --text-light: #6c757d;
        --shadow: 0 2px 16px rgba(0, 0, 0, 0.08);
        --shadow-hover: 0 4px 24px rgba(0, 0, 0, 0.14);
        --radius: 12px;
        --transition: 0.2s ease;
    }

   
    * {
        font-family: "Lato", sans-serif;
        box-sizing: border-box; 
    }

    body {
        margin: 0;
        background-color: var(--background);
        color: var(--text);
    }

    
    #app {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        height: 100vh;
        display: grid;
        grid-template-rows: 60px 1fr;
        grid-template-columns: 280px 1fr;
        grid-template-areas: 
        'header header'
        'menu content';
    
        align-items: stretch;
    }

    
    #app.hide-menu {
        grid-template-areas: 
            'header header'
            'content content'
            'content content';
    }
</style>
