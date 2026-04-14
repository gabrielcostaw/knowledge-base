<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="../../assets/logo.png" width="200" alt="Logo">
            <hr>
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

            <input v-if="showSignup" v-model="user.name" placeholder="Nome" type="text">
            <input v-model="user.email" type="text" name="email" placeholder="E-mail">
            <input v-model="user.password" type="password" name="password" placeholder="Senha">
            <input v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme sua Senha">

            <button v-if="showSignup" @click="signup">Cadastrar</button>
            <button v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já tem cadastro? Entre aqui</span>
                <span v-else>Não tem cadastro? Registre-se aqui </span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '../../global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {},

        }
    },
    methods: {
        async signin() {
            try {
                const res = await axios.post(`${baseApiUrl}/signin`, this.user)

                this.$store.commit('setUser', res.data)
                localStorage.setItem(userKey, JSON.stringify(res.data))
                this.$router.push({ path: '/'})
            } catch(e) {
                showError(e)
            }
        },
        async signup() {
            try {
                const res = await axios.post(`${baseApiUrl}/signup`, this.user)

                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            } catch(e) {
                showError(e)
            }
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color:white;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: center;
        background-color: blue;
        color: white;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 15px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, 
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>