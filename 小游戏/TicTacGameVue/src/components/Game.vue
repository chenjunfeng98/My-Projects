<template>
  <div class="box">
    <div :class="{ game: isGame }">
      <div
        v-for="item in GameCell"
        :key="item.id"
        :class="{ cell: isCell }"
        @click="click_Cell(item)"
      >
        {{ item.content }}
      </div>
    </div>
    <!-- 子组件步骤列表 -->
    <gameList
      :Li_nextPlayer="NextPlayer"
      :Li_GameCells="GameCell"
      :Li_HistoryList="GameHistory"
      @Li_InitGame="InitGame"
      @Li_ResetStep="RollbackGame"
    ></gameList>
  </div>
</template>

<script>
import GameList from "./GameList";

export default {
  name: "Game",
  data() {
    return {
      GameHistory: [], ///历史记录
      isGame: true, ///盒子样式
      isCell: true, ///格子样式
      GameCell: [
        { id: "1", content: "" },
        { id: "2", content: "" },
        { id: "3", content: "" },
        { id: "4", content: "" },
        { id: "5", content: "" },
        { id: "6", content: "" },
        { id: "7", content: "" },
        { id: "8", content: "" },
        { id: "9", content: "" }
      ], ///格子记录数
      player: "O", ///玩家
      GameStatus: true,
      NextPlayer: `Next Player :X`,
      ResetCell:false,///允许修改格子
      Resetstep:'',//返回步骤数
      WinCases: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
      ]
    };
  },

  methods: {
    click_Cell(item) {
      if (item.content !== "" || this.GameStatus == false) {
        return;
      }
      if(this.ResetCell){
      this.player = this.Resetstep % 2?'X':'O'
      this.GameHistory.splice(this.Resetstep);
      this.ResetCell = false
      };
      this.player = this.player == "O" ? "X" : "O";
      this.GameHistory.push({ id: item.id, content: this.player });
      item.content = this.player;
      this.IsWinner(this.player);
      this.NextPlayer = !this.GameStatus
        ? `Winner：${this.player}`
        : (this.NextPlayer = `Next Player :${this.player}`);
    
    },

    InitGame() {
      this.GameHistory = [];
      this.GameCell = [
        { id: "1", content: "" },
        { id: "2", content: "" },
        { id: "3", content: "" },
        { id: "4", content: "" },
        { id: "5", content: "" },
        { id: "6", content: "" },
        { id: "7", content: "" },
        { id: "8", content: "" },
        { id: "9", content: "" }
      ];
      this.GameStatus = true;
      this.player = "X";
    },

    RollbackGame(value) {
      this.ResetCell = true;
      this.Resetstep = value
    },

    IsWinner(player){
      let gameplayer = this.GameHistory.filter(item =>item.content == this.player); //获取玩家历史记录
      let step = gameplayer.map(item => Number(item.id)); //转化成数组
      let test = this.WinCases.some(item =>item.every(val => step.indexOf(val) > -1)); ///判断成绩
      if (test) {
        this.GameStatus = false;
      }
    }
  },

  components: {
    GameList
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  /* list-style-type: none; */
}
.box {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.game {
  width: 90px;
  height: 90px;
  display: flex;
  flex-wrap: wrap;
  margin-right: 30px;
}
.cell {
  width: 30px;
  height: 30px;
  border: 0.5px solid black;
  box-sizing: border-box;
  text-align: center;
  line-height: 30px;
}
</style>
