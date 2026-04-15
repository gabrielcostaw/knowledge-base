<template>
    <div class="user-admin">
        <b-form>
            <input id="user-id" type="hidden" v-model="user.id" >
            <b-row>
                <b-col md="6" sm="12" >
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o Nome do usuário"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12" >
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="email"
                            v-model="user.email" required
                            :readonly="mode === 'remove'"
                            placeholder="Informe o E-mail do usuário"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-form-checkbox id="user-admin" v-show="mode === 'save'" v-model="user.admin" class="mt-2 mb-2" >
               Usuário Administrador ? 
            </b-form-checkbox>
            <b-row v-show="mode === 'save'">
                <b-col md="6" sm="12" >
                    <b-form-group label="Senha:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                            v-model="user.password" required
                            placeholder="Informe a Senha do usuário"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12" >
                    <b-form-group label="Confirmação de Senha:" label-for="user-confirmPassword">
                        <b-form-input id="user-confirmPassword" type="password"
                            v-model="user.confirmPassword" required
                            placeholder="Confirme a senha do usuário"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" v-if="mode === 'save'"
                        @click="save"> Salvar </b-button>
                    <b-button variant="danger" v-if="mode === 'remove'"
                        @click="remove"> Excluir </b-button>
                <b-button class="ml-2" @click="reset"> Cancelar </b-button>
                </b-col>
            </b-row>
        </b-form>
        <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadUser(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button> 
                <b-button variant="danger" @click="loadUser(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'

export default {
    name: 'UserAdmin',
    data: function() {
        return {
            mode: 'save',
            user: {},
            users: [],
            fields: [
                {key: 'id', label: 'Código', sortable: true},
                {key: 'name', label: 'Nome', sortable: true},
                {key: 'email', label: 'E-mail', sortable: true},
                {key: 'admin', label: 'Administrador', sortable: true,
                    formatter: value => value ? 'Sim' : 'Não'},
                {key: 'actions', label: 'Ações'}
            ]

        }
    },
    mounted() {
        this.loadUsers()
    },
    methods: {
        async loadUsers() {
            try {
                const url = `${baseApiUrl}/users`
                const res = await axios.get(url)
                this.users = res.data
            
            } catch(e){
                showError(e)
            }
        },
        reset() {
            this.mode = 'save'
            this.user = {}
            this.loadUsers()
        },
        async save() {
            try {
                const method = this.user.id ? 'put' : 'post'
                const id = this.user.id ? `/${this.user.id}` : ''
                await axios[method](`${baseApiUrl}/users${id}`, this.user) 

                    this.$toasted.global.defaultSuccess()
                    this.reset()
            } catch(e) {
                showError(e)
            } 
        },
        async remove() {
            try {
                const id = this.user.id
                await axios.delete(`${baseApiUrl}/users/${id}`)

                    this.$toasted.global.defaultSuccess()
                    this.reset()
            } catch(e) {
                showError(e)
            }
        },
        loadUser(user, mode = 'save') {
            this.mode = mode
            this.user = { ...user }
        }
    }
}
</script>

<style>
    .table {
        border-collapse: separate;
        border-spacing: 0 6px; 
    }

    .table thead th {
        border: none;
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: var(--text-light);
        padding-bottom: 12px;
    }

    .table tbody tr {
        background-color: white;
        box-shadow: var(--shadow);
        border-radius: 8px;
        transition: transform var(--transition);
    }

    .table tbody tr:hover {
        transform: translateX(4px);
    }

    .table tbody td {
        border: none;
        padding: 14px 12px;
        vertical-align: middle;
        font-size: 0.9rem;
    }

    
    .btn-warning, .btn-danger {
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        transition: opacity var(--transition), transform var(--transition);
    }

    .btn-warning:hover, .btn-danger:hover {
        opacity: 0.85;
        transform: translateY(-1px);
    }

    
    .form-control {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 10px 14px;
        font-size: 0.9rem;
        transition: border-color var(--transition), box-shadow var(--transition);
    }

    .form-control:focus {
        border-color: var(--primary);
        box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
    }

    .btn-primary {
        background: var(--primary);
        border: none;
        border-radius: 8px;
        padding: 8px 20px;
        font-weight: 600;
        letter-spacing: 0.5px;
        transition: opacity var(--transition), transform var(--transition);
    }

    .btn-primary:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        background: var(--primary);
    }
</style>
