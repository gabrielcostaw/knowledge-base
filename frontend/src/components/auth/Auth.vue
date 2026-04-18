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
                await axios.post(`${baseApiUrl}/signup`, this.user)

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
        background: linear-gradient(135deg, #1a1a2e 0%, var(--primary) 100%);
    }

    .auth-modal {
        background-color: var(--surface);
        width: 380px;
        padding: 40px;
        border-radius: var(--radius);
        box-shadow: var(--shadow-hover);

        display: flex;
        flex-direction: column;
        align-items: center;

        animation: fadeInUp 0.4s ease;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .auth-title {
        font-size: 1.4rem;
        font-weight: 300;
        letter-spacing: 2px;
        text-transform: uppercase;
        color: var(--text);
        margin-top: 20px;
        margin-bottom: 25px;
    }

    .auth-modal input {
        width: 100%;
        border: none;
        border-bottom: 2px solid #e0e0e0;
        padding: 10px 4px;
        margin-bottom: 20px;
        font-size: 0.95rem;
        color: var(--text);
        outline: none;
        background: transparent;
        transition: border-color var(--transition);
    }

    .auth-modal input:focus {
        border-bottom-color: var(--primary);
    }

    .auth-modal input::placeholder {
    color: #bbb;
    font-size: 0.9rem;
}


    .auth-modal button {
        width: 100%;
        padding: 12px;
        margin-top: 10px;
        border: none;
        border-radius: 8px;
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
        color: white;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: pointer;
        transition: opacity var(--transition), transform var(--transition);
    }

    .auth-modal button:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
    }

    .auth-modal button:active {
        transform: translateY(0px);
    }

    .auth-modal button:focus {
        outline: none;
        box-shadow: 0 0 0 1px rgba(67, 97, 238, 0.4);
    }

    .auth-modal a {
        margin-top: 20px;
        font-size: 0.85rem;
        color: var(--text-light);
        text-decoration: none;
        transition: color var(--transition);
    }

    .auth-modal a:hover {
        color: var(--primary);
    }

    .auth-modal hr {
        border: none;
        width: 100%;
        height: 1px;
        background: linear-gradient(to right,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0));
        margin: 5px 0;
    }
</style>