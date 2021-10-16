const MongoClient=require("mongodb").MongoClient;

class DAO {
    constructor(url,dbName,collectionName){
        this.url = url;
        this.collectionName = collectionName;
        this.dbName = dbName
    }

    connect(){
        return new Promise((resolve,reject)=>{
            MongoClient.connect(this.url,(err,db)=>{
                if(err){
                    reject(err);
                    return
                };
                console.log('数据库连接成功')
                resolve(db)
            })
        })
        
    }
    //增加
    insert(obj,insertmany){
        return new Promise((resolve,reject)=>{
            this.connect().then(res=>{
                const DB = res.db(this.dbName);
                if(insertmany){
                    DB.collection(this.collectionName).insertmany(obj,(err,data)=>{
                        if(err){
                            reject(err);
                            return
                        };
                        resolve(data);
                        res.close();
                        
                    });
                    return
                }
                DB.collection(this.collectionName).insertOne(obj,(err,data)=>{
                    if(err){
                        reject(err);
                        return
                    };
                    resolve(data);
                    res.close()
                })
            })
        })
    }
    //查询
    query(obj={}){
        return new Promise((resolve,reject)=>{
            this.connect().then(res=>{
                const DB = res.db(this.dbName);
                DB.collection(this.collectionName).find(obj).toArray((err,data)=>{
                    if(err){
                        reject(err);
                        return
                    };
                    resolve(data);
                    res.close()
                })
            })
        })
    }
    ///删除
    del(obj,delmany){
        return new Promise((resolve,reject)=>{
            this.connect().then(res=>{
                const DB = res.db(this.dbName);
                if(delmany){
                    DB.collection(this.collectionName).deleteMany(obj,(err,data)=>{
                        if(err){
                            reject(err);
                            return
                        };
                        resolve(data);
                        res.close()
                    });
                    return
                }

                DB.collection(this.collectionName).deleteOne(obj,(err,data)=>{
                        if(err){
                            reject(err);
                            return
                        };
                        resolve(data);
                        res.close()
                    });
            })
        })
    }
    ///更新
    update(obj,newVal){
        return new Promise((resolve,reject)=>{
            this.connect().then(res=>{
                const DB = res.db(this.dbName);
                DB.collection(this.collectionName).updateMany(obj,{$set:newVal},(err,data)=>{
                        if(err){
                            reject(err);
                            return
                        };
                        resolve(data);
                        res.close()
                    });
                
            })
        })
    }
}


module.exports = DAO;

