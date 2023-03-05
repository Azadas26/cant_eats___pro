var db = require('../connection/connect')
var consts = require('../connection/consts')
var Promise = require('promise')
var bcrype = require('bcrypt')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectId

module.exports =
{
    Do_sinup: (data) => {
        return new Promise(async (resolve, reject) => {

            data.Password = await bcrype.hash(data.Password, 10);
            // console.log(data.Password)

            db.get().collection(consts.User_Colnection).insertOne(data).then((data) => {
                //console.log(data)
                resolve(data)
            })

        })
    },
    Do_login: (datas) => {

         return new Promise((resolve,reject)=>
         {
             db.get().collection(consts.User_Colnection).findOne({ Email: datas.Email}).then(async(data)=>
             {
                 if (data) {

                     await bcrype.compare(datas.Password, data.Password).then((value) => {
                         if (value) {
                             var state =
                             {
                                 status: null,
                                 user: null
                             }

                             // console.log(data)
                             console.log("Login Successfull....")
                             state.status = true;
                             state.user = data
                             resolve(state)
                         }
                         else {
                             console.log("Login Faild...")
                             resolve({ status: false })
                         }
                     })
                 }
                  else {
                     console.log("Incorrect Emailaddress...")
                     resolve({ status: false })
                 }
             })
         })
    },
    Do_cart : (id)=>
    {
       return new Promise(async(resolve,reject)=>
       {
          await db.get().collection(consts.Admin_Collection).findOne({_id:objectId(id)}).then((data)=>
          {
            // console.log(data)
            resolve(data)
          })
       })
    },
    After_cart :   (product)=>
    {
        return new Promise(async(resolve,reject)=>
        {
           await db.get().collection(consts.Carted_Collection).insertOne(product).then((data) => {
                //console.log(data)
                resolve(data)
            })
        })
    },
    Get_cart : (id)=>
    {
        return new Promise(async(resolve,reject)=>
        {
            console.log(id)
            await db.get().collection(consts.Carted_Collection).findOne({id:objectId(id)}).then((data) => {
                console.log(data)
                var datas=
                {
                    status :true,
                    pro : data
                }
                resolve(datas)
            })
        })
    },
    Get_allcart: () => {
        return new Promise(async (resolve, reject) => {
            //console.log(id)
            await db.get().collection(consts.Carted_Collection).find().toArray().then((data) => {
                 console.log(data)
                 resolve(data)
            })
        })
    },
    Delete_cart: (id)=>
    {
         return new Promise((resolve,reject)=>
         {
             db.get().collection(consts.Carted_Collection).removeOne({ _id: objectId(id) }).then((data) => {
                 console.log(data)
                 resolve(data)
             })
         })
    }

    
}