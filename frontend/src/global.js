import Vue from 'vue'

export const userKey = '__knowledge_user'
export const baseApiUrl = process.env.VUE_APP_API_URL || 'http://localhost:3000' 

//trata erros de forma centralizada e evita repetições em todos os componentes
export function showError(e) {
    if(e && e.response && e.response.data) {
        //erro vindo da api com mensagem especifica
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if (typeof e === 'string') {
        //erro passado como string diretamente
        Vue.toasted.global.defaultError({ msg: e})
    } else {
        //erro genérico ineseperado
        Vue.toasted.global.defaultError()
    }
}

export default { baseApiUrl, showError, userKey }
