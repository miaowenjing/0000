import vue from 'vue'
import vuex from 'vuex'
vue.use(vuex)

export default new vuex.Store({
    state:{
        target: false,
        foods: []
    },
    mutations: {
        changeTarget(state, newTarget){
            state.target = newTarget
        },
        countFoods(state, newfoods){
            state.foods = newfoods
        }
    }
})