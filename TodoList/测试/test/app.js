const express = require('express');
const DAO = require('./routers/test');

const dbURL = 'mongodb+srv://123:321@todolist.bcllj.mongodb.net/todoList?retryWrites=true&w=majority'
const app = express();
const dao = new DAO(dbURL,'todoList','todolist')


app.get('/find',(req,res)=>{
    dao.query().then(data=>res.send(data));
})

app.listen(3000)