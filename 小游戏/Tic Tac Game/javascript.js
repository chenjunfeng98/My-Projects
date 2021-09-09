///初始化
let flag = 1;
let hasWinner = false;
let win = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let gameHistory = [];
let items = document.querySelectorAll('.btn');
let start = document.querySelector('.start')
let list = document.querySelector('ol')
let players = document.querySelector('.players');

///设置重置键，清除各自内容和恢复disabled属性
const restart = ()=>{
start.addEventListener('click', function(){
    for(let i=0;i<items.length;i++){
        items[i].innerHTML='';
        //items[i].disabled='';///有待商榷
        items[i].addEventListener('click',Click);
        flag=1;
        hasWinner = false;
        gameHistory=[];
        players.innerHTML='Next Player：X';
    };
    ///清空li标签
    const historyli = document.querySelectorAll('ol li');
    let index=0;
    for(let li of historyli){
      if(index>0){
        list.removeChild(li)
      };
      index++;
    }
})};



    ///注册事件
    function Click() {
      const hasContent = !!this.innerHTML;
      if ( hasWinner || hasContent) {
        return
      }
      ///判断玩家
      const player = flag %2 ? 'X':'O';
      const nextplayer = flag %2 ? 'O':'X';
      const num = flag;//点击事件需要
      this.innerHTML = `${player}`;
      ///下个玩家
      players.innerHTML = `Next Player：${nextplayer}`;
      const step = this.getAttribute('id');
      ///记录数据
      gameHistory.push({id:step,content:player})
      //console.log(gameHistory);
      console.log(`步数${flag}`);
      ///创建li标签
      const rec = document.createElement('li');
      const btn = document.createElement('button');
      btn.innerHTML='Go to move #'+flag;
      rec.appendChild(btn);
      list.appendChild(rec);
      ///缺少按钮事件
      
      btn.onclick = function(){
      
         const index = num;//步数
         const playeragain = index %2 ? 'O':'X';
         const his = gameHistory.slice(0, Number(index) );
         recoverFromHistory(his,index);
         players.innerHTML = `Next Player：${playeragain}`;
         const history =gameHistory.slice(0,index);
         Winner(player,history);
         
        };

      Winner(player);
      flag++;
      }


///点击按钮事件函数
const recoverFromHistory = (his,index) => {
  for (let item of items) {
    const id = item.getAttribute('id')
    const h = his.find(item => Number(item.id) === Number(id));
    !h?item.innerHTML = '':item.innerHTML = h.content

  };
};


///获胜规则
function Winner(player,hisList = gameHistory){
  // if(hisList.length<=5){
  //   return
  // }else{
  const gameplayer = hisList.filter((item)=>{return item.content==player});//获取玩家历史记录
  const step = gameplayer.map(function(item){return Number(item.id)});//转化成数组
  let test=win.some(item=>item.every(val=>step.indexOf(val)>-1))

    if(test){
      players.innerHTML=`Winner：${player}`
      hasWinner = true;
    };
    };
  // }
  

///游戏执行函数
  const game=() => {
    for(let i=0;i<items.length;i++){ 
      items[i].addEventListener('click',Click)
      }};

      
 const main =()=>{
  restart();
  game();
 }

 main();

