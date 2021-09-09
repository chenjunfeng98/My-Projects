<template>
<div>
  <div >
      <ul>
        <li v-for="(item,index) in activeList"
            :key="`${item}${index}`">
            <div class='checkBotton'>
                <el-checkbox @click="handleChecked(item)"
                          v-model="item.isChecked">{{item.content}}
                </el-checkbox>
            </div>
            <div class='deleteBotton'>
              <el-button type="danger" @click="reomveMessage(item)" size="mini">删除</el-button>
            </div>
        </li>
      </ul>
    </div>

</div>
</template>


<script>
export default {
    name:'todoMvcActivePage',
    computed:{
      activeList(){
        return this.$store.getters.activeList
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
    }
}

</script>

<style>

</style>