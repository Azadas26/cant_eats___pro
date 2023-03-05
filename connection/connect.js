var mongoClient = require('mongodb').MongoClient
var Promise = require('promise')

var state=
{
    db : null,
}

module.exports=
{
    connection : ()=>
    {
         return new Promise((resolve,reject)=>
         {
             var dbname ="Cant_eats"

             mongoClient.connect("mongodb://127.0.0.1:27017",(err,data)=>
             {
                 if(err)
                 {
                    reject("DataBase Connection Error...")
                 }
                 else
                 {
                    state.db=data.db(dbname)
                    resolve("DataBase Connection Successfull....")
                 }
             })
         })
    },
    get : ()=>
    {
        return state.db
    }
}

