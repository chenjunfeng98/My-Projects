import Vue from 'vue';
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);


const store = new Vuex.Store({
    actions:{
        async getMessage(content){
            const res = await axios.get('/api/todo');
            content.commit('showMessage',res.data)
        },
        async changeMessage(content,item){
            try {
                await axios.post(`/api/todo/update`,item);
                await content.commit('change');
            } catch (error) {
                console.log(error)
            }
        },
        async addMessage(content,item){
            await axios.post('/api/todo/insert',{content:item});
            await content.commit('change');
            
        },
        async reomveMessage(content,item){
            await axios.get(`/api/todo/delete/${item._id}`);
            await content.commit('change');
        },
        async clearCompleteMessage(content){
            await axios.get(`/api/todo/deletemany`);
            await content.commit('change');
        },
        async checkAllMessage(content){
            await axios.post(`/api/todo/updatemany`,content.state.todoList);
            await content.commit('change');
        },
    },
    state:{
        todoList:[],
        ischeckedAll:'',
        change:true
    },
    mutations: {
        showMessage(state,Val){
            state.todoList.length = 0;
            state.todoList.push(...Val)
        },
        change(state){
            state.change = !state.change
        },
        updateMessage(state,Val) {
            if(Val.hasOwnProperty('Edit')){
                Val.Edit = !Val.Edit
            }else{
              Vue.set(Val,'Edit',true)
            };
        },





    },
    getters: {
        activeList(state){
            return state.todoList.filter(item=>!item.isChecked)
        },
        completeList(state){
            return state.todoList.filter(item=>item.isChecked)
        },
        checkAll(state){
            return state.ischeckedAll = state.todoList.length !== 0?'':false
        }
    },
})

export default store