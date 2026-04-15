<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do sistema"
            sub="Cadastros & Cia"/>
            <div class="admin-pages-tabs">
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Artigos" active>
                            <ArticleAdmin />
                        </b-tab>
                        <b-tab title="Categorias">
                            <CategoryAdmin />
                        </b-tab>
                        <b-tab title="Usuários">
                            <UserAdmin />
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
    </div>
</template>

<script>

import PageTitle from '../template/PageTitle'
import ArticleAdmin from './ArticleAdmin'
import CategoryAdmin from './CategoryAdmin'
import UserAdmin from './UserAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, ArticleAdmin, CategoryAdmin, UserAdmin }
}
</script>

<style>
    .admin-pages {
        padding: 20px;
    }

    /* ===== ABAS ===== */
    /* Deixa as abas com visual mais moderno */
    .admin-pages .nav-tabs {
        border-bottom: 2px solid #e0e0e0;
        gap: 4px;
    }

    .admin-pages .nav-tabs .nav-link {
        border: none;
        color: var(--text-light);
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 1px;
        text-transform: uppercase;
        padding: 10px 20px;
        border-radius: 8px 8px 0 0;
        transition: color var(--transition), background-color var(--transition);
    }

    .admin-pages .nav-tabs .nav-link:hover {
        color: var(--primary);
        background-color: rgba(67, 97, 238, 0.06);
    }

    .admin-pages .nav-tabs .nav-link.active {
        color: var(--primary);
        border-bottom: 2px solid var(--primary);
        background-color: transparent;
    }

    /* ===== CARD DAS ABAS ===== */
    .admin-pages .card {
        border: none;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
    }

    .admin-pages .card-body {
        padding: 24px;
    }
</style>