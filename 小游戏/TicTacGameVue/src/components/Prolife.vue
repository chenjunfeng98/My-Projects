<template>
  <div>
    <!-- <el-row type='flex' justify='space-between'>
      <el-col :span="6"><div>6</div></el-col>
      <el-col :span="6"><div>6</div></el-col>
      <el-col :span="6"><div>6</div></el-col>
    </el-row> -->


    <!-- <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside>Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container> -->

    <!-- i标签为图标
    <i class='el-icon-loading'></i>
    <el-button type='primary' class='el-icon-search' plain>搜索</el-button>
    ///el-link为超链接 
    <el-link type='info' >链接</el-link> --> 

    <!-- <el-row>
      ///两个按钮拼接在一起
      <el-button-group>
        <el-button type='primary'>上一页</el-button>
        <el-button type='primary'>下一页</el-button>
      </el-button-group>
    </el-row> -->

    
    <el-row>
      <el-radio v-model="sex" label='1'>男</el-radio>
      <el-radio v-model="sex" label='2'>女</el-radio>
    </el-row>


    <el-row>
      <el-checkbox-group v-model="city" :max="2">
          <el-checkbox-button label='北京'>北京</el-checkbox-button>
          <el-checkbox-button label='广州'>广州</el-checkbox-button>
          <el-checkbox-button label='上海'>上海</el-checkbox-button>
          <el-checkbox-button label='深圳'>深圳</el-checkbox-button>
      </el-checkbox-group>
    </el-row>

    <el-row>
      <el-select v-model="testVal">
        <el-option v-for="(item,index) in options" 
                   :key='`${item}${index}`' 
                   :value = 'item.name'
                   :label = 'item.name'
                   >
        </el-option>
      </el-select>
    </el-row>

    <el-row>
      <el-switch v-model="value" active-color='#13ce66'></el-switch>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Prolife",
  data () {
    return {
      value:true,
      sex:'1',
      city:['广州'],
      testVal:'',
      options:[
        {
          value:1,
          name:'aaa'
        },
        {
          value:2,
          name:'bbb'
        },
        {
          value:3,
          name:'ccc'
        }
      ]
    }
  }
};
</script>

<style>
  /* .el-row{
    background-color: red;
  } */
  .el-col{
    background-color: green;
    text-align: center;
    box-sizing: border-box;
    border-right: 1px solid white;
  }
  .el-header{
    background-color: purple;
  }
  .el-footer{
    background-color: blue;
  }

  .el-aside{
    background-color: red;
  }
  .el-main{
    background-color: yellow;
  }
</style>
