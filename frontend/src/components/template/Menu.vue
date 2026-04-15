<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
        <i class="fa fa-search fa-lg"></i>
        <input type="text" placeholder="Digite para filtrar"
            v-model="treeFilter" class="filter-field">
    </div>
    <Tree :data="treeData" :options="treeOptions"
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
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text': 'name' },
                filter: { emptyText: 'Categoria não encontrada' }
            }
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    },
    methods: {
        getTreeData() {
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data).catch(showError)
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
        background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
        height: 100%;

        display: flex;
        flex-direction: column;

        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
        z-index: 5;

        overflow-y: auto;
    }

    .menu::-webkit-scrollbar {
        width: 4px;
    }

    .menu::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
    }

    .menu a, .menu a:hover {
        color: rgba(255, 255, 255, 0.85);
        text-decoration: none;
        transition: color var(--transition);
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover {
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 6px;
        transition: background-color var(--transition);
    }

    .tree-node.has-child .tree-arrow {
        filter: brightness(3);
    }
    
    .menu .menu-filter {
        display: flex;
        align-items: center;

        margin: 16px;
        padding: 10px 14px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 8px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .menu .menu-filter i {
        color: rgba(255, 255, 255, 0.5);
        margin-right: 10px;
        font-size: 0.9rem;
    }

    .menu input {
        color: white;
        font-size: 0.9rem;
        border: 0;
        outline: 0;
        width: 100%;
        background: transparent;
    }

    .menu input::placeholder {
        color: rgba(255, 255, 255, 0.4);
    }

    .tree-filter-empty {
        color: rgba(255, 255, 255, 0.5);
        margin-left: 20px;
        font-size: 1rem;
        font-style: italic;
    }
</style>