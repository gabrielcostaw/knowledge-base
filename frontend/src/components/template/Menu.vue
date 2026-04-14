<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
        <i class="fa fa-search fa-lg"></i>
        <input type="text" placeholder="Digite para filtrar"
            v-model="treeFilter" class="filter-field">
    </div>
    <Tree v-if="treeData.length > 0" :data="treeData" :options="treeOptions"
        :filter="treeFilter" ref="tree" />
  </aside>
</template>

<script>
import { mapState } from 'vuex' 
import Tree from 'liquor-tree'
import { baseApiUrl, showError } from '../../global'
import axios from 'axios' 

export default {
    name: 'Menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function() {
        return {
            treeFilter: '',
            treeData: [],
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada' }
            }
        }
    },
    async mounted() {
    this.treeData = await this.getTreeData()
    await this.$nextTick()
    this.$refs.tree.$on('node:selected', this.onNodeSelect)
    },
    methods: {
        async getTreeData() {
            try {
                const url = `${baseApiUrl}/categories/tree`
                const res = await axios.get(url)
    
                return res.data
            } catch(e) {
                showError(e)
            }
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'articleByCategory',
                params: { id: node.id}
            })

            if(this.$mq === 'xs' || this.$mq === 'sm') {
                this.$store.commit('toggleMenu', false)
            }
        }
    }
}
</script>

<style>
    .menu {
        grid-area: menu;
        background: linear-gradient(to right, #232526, #414645);

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        
    }

    .menu a, .menu a:hover {
        color: white;
        text-decoration: none;

    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }

    .tree-arrow.has-child {
        filter: brightness(3);
    }

    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: 1px solid gray;
    }

    .menu .menu-filter i {
        color: white;
        margin-right: 10px;
    }

    .menu input {
        color: #ccc;
        font: 1.3rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .tree-filter-empty {
        color: #ccc;
        margin-left: 20px;
        font-size: 1.3rem   ;
    }
</style>