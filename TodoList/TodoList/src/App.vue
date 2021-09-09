<template>
  <div id="app">
    <div class='title' >
      TODOLIST
    </div>
    <div class='header'>
      <el-row>
          <el-col :span='2'>
            <template>
              <el-button  @click="checkAllMessage" icon="el-icon-check"></el-button>
            </template>
          </el-col>
          <el-col :span='22'>
            <div>
             <el-input placeholder="What need to be done ?" @change="addMessage" v-model="message"></el-input>
            </div>
          </el-col>
      </el-row>
    </div>
    <router-view></router-view>

    <div v-if="this.$store.state.todoList.length" >
      <el-row type='flex' justify="space-between">
      <div>
        <el-radio-group v-model="test" @change="changRouter">
          <el-radio-button v-for="(item,index) in routerList" 
                          :label="item.name"
                          :key="`${item}${index}`">
                          {{item.content}}
          </el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-button @click="clearCompleteMessage" type="danger">Clear Complete</el-button>
      </div>
      </el-row>
        
    </div>
  </div>
</template>



<script>
export default {
  name:'App',
  data () {
    return {
      message:'',
      routerList:[
        {name:'all',content:'All'},
        {name:'active',content:'Active'},
        {name:'complete',content:'Complete'},
      ],
      test:'',
      
    }
  },
  methods: {
    addMessage(){
      this.$store.dispatch('addMessage',this.message);
      this.message=''
    },
    clearCompleteMessage(){
      this.$store.dispatch('clearCompleteMessage')
    },
    checkAllMessage(){
      this.$store.dispatch('checkAllMessage')
    },
    changRouter(Val){
      this.$router.push({name:Val})
    }
  },
  async created () {
      await this.$store.dispatch('getMessage');
      await this.$store.watch(
        (state)=>state.change
        , (n)=>{
        this.$store.dispatch('getMessage');
      })
    },
  

}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    text-decoration: none;
  }

  body{
    display: flex;
    justify-content: center;
  }

  .title{
    font-size: 100px;
 
  }
</style>
