<template>
  <div class="article-admin">
        <b-form>
          <input id="article-id" type="hidden" v-model="article.id">
          <b-row>
              <b-col xs="12" >
                <b-form-group label="Nome:" label-for="article-name" >
                    <b-form-input id="article-name" type="text"
                      v-model="article.name" required 
                      :readonly="mode === 'remove'"
                      placeholder="Informe o nome do Artigo"> 
                      </b-form-input>      
                </b-form-group>
                <b-form-group label="Descrição:" label-for="article-description" >
                    <b-form-input id="article-description" type="text"
                      v-model="article.description" required 
                      :readonly="mode === 'remove'"
                      placeholder="Informe a descrição do Artigo">
                      </b-form-input>      
                </b-form-group>
                <b-form-group v-if="mode === 'save'"
                    label="Imagem URL:" label-for="article-imageUrl" >
                    <b-form-input id="article-imageUrl" type="text"
                      v-model="article.imageUrl" required 
                      :readonly="mode === 'remove'"
                      placeholder="Informe a URL da imagem">
                      </b-form-input>      
                </b-form-group>
              </b-col>    
          </b-row>
          <b-row>
              <b-col sm="12" >
                <b-form-group v-if="mode === 'save'" 
                    label="Categoria:" label-for="categoryId" >
                        <b-form-select id="article-categoryId" 
                          :options="categories" v-model="article.categoryId">
                        </b-form-select>
                </b-form-group>
                <b-form-group v-if="mode === 'save'" 
                    label="Autor do Artigo:" label-for="userId" >
                        <b-form-select id="article-userId" 
                          :options="users" v-model="article.userId">
                        </b-form-select>
                </b-form-group>
                <b-form-group v-if="mode === 'save'" label="Conteúdo" label-for="article-content" >
                    <VueEditor v-model="article.content"
                        placeholder="Informe o conteúdo do artigo: "/>
                </b-form-group>
              </b-col>
          </b-row>
          <b-row>
              <b-col xs="12">
                  <b-button variant="primary" v-if="mode === 'save'"
                    @click="save"> Salvar</b-button>
                  <b-button variant="danger" v-if="mode === 'remove'"
                    @click="remove"> Excluir</b-button>
                  <b-button variant="secondary" @click="reset" class="ml-2"> Cancelar</b-button>
              </b-col>
          </b-row>
        </b-form>

        <hr>

        <b-table hover striped :items="articles" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" 
            :total-rows="count" :per-page="limit" />
  </div>
</template>

<script>
import { baseApiUrl, showError } from '../../global'
import axios from 'axios'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'ArticleAdmin',
    components: { VueEditor },
    data: function() {
      return {
        mode: 'save',
        article: {},
        articles: [],
        categories: [],
        users: [],
        page: 1,
        limit: 0,
        count: 0,
        fields: [
        {key: 'id', label: 'Código', sortable: true},
        {key: 'name', label: 'Nome', sortable: true},
        {key: 'description', label: 'Descrição', sortable: true},
        {key: 'actions', label: 'Ações'}
        ]
      }
    },
    mounted() {
        this.loadArticles()
        this.loadCategories()
        this.loadUsers()
    },
    watch: {
        page() {
          this.loadArticles()
        }
    },
    methods: {
      async loadArticles() {
        try {
          const url = `${baseApiUrl}/articles?page=${this.page}`
          const res = await axios.get(url)

            this.articles = res.data.data
            this.count = res.data.count
            this.limit = res.data.limit

        }   catch(e) {
          showError(e)
          }
      },

      reset() {
        this.mode = 'save'
        this.article = {}
        this.loadArticles()
      },

      async save() {
        try {
          const method = !this.article.id ? 'post' : 'put'
          const id = this.article.id ? `/${this.article.id}` : ''
          await axios[method](`${baseApiUrl}/articles${id}`, this.article) 

            this.$toasted.global.defaultSuccess()
            this.reset()
            
        } catch(e) {
            showError(e)
        }
      },

      async remove() {
          try {
            const id = this.article.id
            await axios.delete(`${baseApiUrl}/articles/${id}`)

              this.$toasted.global.defaultSuccess()
              this.reset()
          } catch(e) {
              showError(e)
          }
      },

      async loadArticle(article, mode = 'save') {
        try {
            this.mode = mode
            const url = `${baseApiUrl}/articles/${article.id}`
            const res = await axios.get(url)
            this.article = res.data
        } catch(e) {
            showError(e)
        }

      },

      async loadCategories() {
        try {
            const url = `${baseApiUrl}/categories`
            const res = await axios.get(url)

            this.categories = res.data.map( category => {
                return {value: category.id, text: category.path}
            })
        }   catch(e) {
                showError(e)    
        }
      },

      async loadUsers() {
        try {
            const url = `${baseApiUrl}/users`
            const res = await axios.get(url)

            this.users = res.data.map( user => {
                return {value: user.id, text: `${user.name} - ${user.email}`}
            })
        } catch(e) {
            showError(e)
        }
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

    .table td:last-child {
        white-space: nowrap; 
        width: 1%;           
    }
</style>