<template>
  <div>
    <div>{{Li_nextPlayer}}</div>
    <ol>
      <li><button @click="Li_InitGame">Go to game start</button></li>
      <li v-for="(item,index) in Li_HistoryList" :key="index">
        <button @click="Li_ResetGame(index+1)">Go to move#{{ index+1 }}</button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "GameList",
  props: {
    Li_nextPlayer:String,
    Li_GameCells:Array,
    Li_HistoryList:Array
  },
  methods: {
    Li_InitGame() {
      this.$emit("Li_InitGame");
    },
    Li_ResetGame(item) {
      let SaveHistory = this.Li_HistoryList.slice(0,item);
      for (let i = 0; i < this.Li_GameCells.length; i++) {
        let t = SaveHistory.find(v=>this.Li_GameCells[i].id == v.id);
        this.Li_GameCells[i].content=!t?'':t.content

      };
      this.$emit('Li_ResetStep',item)
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
