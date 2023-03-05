var db= require('../connection/connect')
var consts = require('../connection/consts')
var Promise = require('promise')
var objectId = require('mongodb').ObjectId

module.exports=
{
    Datato_addPro:(data)=>
    {
       return new Promise((resolve,reject)=>
       {
          db.get().collection(consts.Admin_Collection).insertOne(data).then((data)=>
          {
             resolve(data.ops[0]._id)
          })
       })
    },
    Datafrom_adminbase: ()=>
    {
        return new Promise(async(resolve,reject)=>
        {
             var produts= await db.get().collection(consts.Admin_Collection).find().toArray()
             //console.log(produts)
             resolve(produts)
        })
    },
    Delete_product : (id)=>
    {
        return new Promise((resolve,reject)=>
        {
             db.get().collection(consts.Admin_Collection).removeOne({_id:objectId(id)}).then((data)=>
             {
                resolve(data)
             })
        })
    },
    get_product : (id)=>
    {
         return new Promise(async(resolve,reject)=>
         {
             await db.get().collection(consts.Admin_Collection).findOne({_id:objectId(id)}).then((data)=>
             {
                 //console.log(data)
                 resolve(data)
             })
         })
    },
    Edit_product : (data,id)=>
    {
         return new Promise(async(resolve,reject)=>
         {
             await db.get().collection(consts.Admin_Collection).updateOne({_id:objectId(id)},{
                 $set: {
                   name : data.name,
                   discription : data.discription,
                   price : data.price
                 }
             }
             ).then((data)=>
             {
               // console.log(data)
                resolve(data)
             })
         })
    }
}