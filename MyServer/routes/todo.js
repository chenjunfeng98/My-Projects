const express = require('express');
const router = express.Router();
const objectid = require("mongodb").ObjectId;
const DAO = require('../module/db')

const dbURL="mongodb+srv://123:321@todolist.bcllj.mongodb.net/todoList?retryWrites=true&w=majority";
const dao = new DAO(dbURL,'todoList','todolist')


router.get('/',function(req,res){
    dao.query().then(data=>res.send(data))

});
router.post('/insert',(req,res)=>{
    const todoItem=req.body;
        if(!todoItem){
            res.send('传入数据为空')
        }
    dao.insert(todoItem,false).then(data=>res.send(data))

});

router.post('/update',(req,res)=>{
    const todoItem=req.body;
        if(!todoItem){
            res.send('传入数据为空');
            return
        };
    const id = {"_id":objectid(todoItem.item._id)}
    if(todoItem.changetype){
        dao.update(id,{"content":todoItem.item.content}).then(data=>res.send(data));
        return
    };

    dao.update(id,{"isChecked":!todoItem.item.isChecked}).then(data=>res.send(data));

});

router.get('/delete/:id',(req,res)=>{
        const todoId=req.params.id;
        if(!todoId){
            res.send('err')
        };
        const id = {"_id":objectid(todoId)}
        dao.del(id,false).then(data=>res.send(data))

});

router.get('/deletemany',(req,res)=>{
    dao.del({"isChecked":true},true).then(data=>res.send(data))

});

router.post('/updatemany',(req,res)=>{
    const todoItem = req.body;
    const isChecked = todoItem.every(item=>item.isChecked);
    dao.update({"isChecked":isChecked},{"isChecked":!isChecked}).then(data=>res.send(data))

});

module.exports = router