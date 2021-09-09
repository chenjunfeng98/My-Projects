<template>
<div>
      <ul>
        <li v-for="(item,index) in todoList"
            :key="`${item}${index}`" >
            <div class='checkBotton'>
                <div @click="handleChecked(item,$event)">
                  <el-checkbox               
                    v-model="item.isChecked">
                  </el-checkbox>
                </div>
                
                <span @dblclick="updateMessage(item)" v-show="!item.Edit">{{item.content}}</span>
                <el-input :placeholder="item.content"
                          v-model="input"
                          v-show="item.Edit"
                          @blur="handleChecked(item,$event)"
                          size="mini"
                          >
                </el-input>
            </div>

            <div class='deleteBotton'>
              <el-button type="danger" @click="reomveMessage(item)" size="mini">删除</el-button>
            </div>
        </li>
      </ul>

  
    </div>
</template>

<script>
export default {
    name:'todoMvcAllPage',
    data () {
      return {
        input:'',
        todoList:this.$store.state.todoList,
        check:'',
      }  
    },
    methods: {
      handleChecked(item,e){
        if(e.type === "click"){

          this.$store.dispatch('changeMessage',{item,changetype:''});
        }else if(e.type === "blur"){
          item.Edit = !item.Edit;
          item.content=e.target.value;
          this.$store.dispatch('changeMessage',{item,changetype:'content'});
          this.input = '';
          return
        }
        item.Edit = !item.Edit
      },
      reomveMessage(item){
        this.$store.dispatch('reomveMessage',item);
        
      },
      updateMessage(item){
        this.$store.commit('updateMessage',item);
      }
    },

}
</script>

<style scope>
  *{
    list-style-type:none;
  }
  li {
    margin: 5px ;
    display: flex;
    justify-content: space-between;
    
  }
  
  .checkBotton{
    height: 20px;
    display: flex;
    align-items: center;
  }

  .el-checkbox{
    margin-right: 20px !important;
  }
</style>