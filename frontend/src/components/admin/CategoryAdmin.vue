<template>
  <div class="category-admin">
        <b-form>
          <input id="category-id" type="hidden" v-model="category.id">
          <b-row>
              <b-col xs="12" >
                <b-form-group label="Nome da Categoria:" label-for="category-name" >
                    <b-form-input id="category-name" type="text"
                      v-model="category.name" required 
                      :readonly="mode === 'remove'"
                      placeholder="Informe o nome da categoria">
                      </b-form-input>      
                </b-form-group>
              </b-col>    
          </b-row>
          <b-row>
              <b-col sm="12" >
                <b-form-group label="Categoria Pai:" label-for="category-parentId" >
                        <b-form-select v-show="mode === 'save'" id="category-parentId" 
                          :options="categories" v-model="category.parentId">
                        </b-form-select>
                        <b-form-input v-show="mode === 'remove'" id="category-parentName" type="text"
                          v-model="category.path" required 
                          readonly>
                      </b-form-input> 
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

        <b-table hover striped :items="categories" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadCategory(data.item)" class="mr-2">
                  <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadCategory(data.item, 'remove')">
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
    name: 'CategoryAdmin',
    data: function() {
      return {
        mode: 'save',
        category: {},
        categories: [],
        fields: [
        {key: 'id', label: 'Código', sortable: true},
        {key: 'name', label: 'Nome', sortable: true},
        {key: 'path', label: 'Caminho', sortable: true},
        {key: 'actions', label: 'Ações'}
        ]
      }
    },
    mounted() {
      this.loadCategories()
    },
    methods: {
      async loadCategories() {
        try {
          const url = `${baseApiUrl}/categories`
          const res = await axios.get(url)

            this.categories = res.data.map(category => {
              return { ...category, value: category.id, text: category.path}
            })
        }   catch(e) {
          showError(e)
          }
      },

      reset() {
        this.mode = 'save'
        this.category = {}
        this.loadCategories()
      },

      async save() {
        try {
          const method = !this.category.id ? 'post' : 'put'
          const id = this.category.id ? `/${this.category.id}` : ''
          await axios[method](`${baseApiUrl}/categories${id}`, this.category) 

            this.$toasted.global.defaultSuccess()
            this.reset()
            
        } catch(e) {
            showError(e)
        }
      },

      async remove() {
          try {
            const id = this.category.id
            await axios.delete(`${baseApiUrl}/categories/${id}`)

              this.$toasted.global.defaultSuccess()
              this.reset()
          } catch(e) {
              showError(e)
          }
      },

      loadCategory(category, mode = 'save') {
        this.mode = mode
        this.category = { ...category }
      }
    }
}


</script>

<style>
    /* ===== TABELA ===== */
    .table {
        border-collapse: separate;
        border-spacing: 0 6px; /* espaço entre as linhas */
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
        transform: translateX(4px); /* linha desliza levemente no hover */
    }

    .table tbody td {
        border: none;
        padding: 14px 12px;
        vertical-align: middle;
        font-size: 0.9rem;
    }

    /* ===== BOTÕES DE AÇÃO ===== */
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

    /* ===== FORMULÁRIO ===== */
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

    /* ===== BOTÃO SALVAR ===== */
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