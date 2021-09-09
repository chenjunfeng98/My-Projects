<template>
  <div>
      <input type="text" @keyup.enter="add($event)" >
      <div>{{$route.params.name}}</div>
      <h2>{{name}}</h2>
      <div v-if="show">
      <router-link :to='{name:"about",params:{id:name}}'>关于</router-link>
      <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
    name:'Home',
    data () {
        return {
            name:[],
            show:false
            
        }
    },
    methods: {
        add(event){
            this.name.push(event.target.value);
            event.target.value='';
            this.show=true
            
        }
    }
}
</script>

<style>

</style>