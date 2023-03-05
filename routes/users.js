var express = require('express');
const session = require('express-session');
var router = express.Router();
var Admindatabase = require('../database/admin_database')
var Userdatabase = require('../database/user_database')


module.exports.common = (req, res, next) => {
  if (req.session.status) {

    next()
  }
  else {
    res.redirect('/login')
  }
}


/* GET users listing. */


router.get('/', function (req, res, next) {
  var user = req.session.user
  console.log(user)

  Admindatabase.Datafrom_adminbase().then((products) => {

    if (user) {


      res.render('./user/first-page', { admin: false, products, user });

    }
    else {
      res.render('./user/first-page', { admin: false, products });
    }

  })

});

router.get('/sinup', (req, res) => {

  res.render('./user/sinup-page', { admin: false })

})

router.post('/sinup', (req, res) => {

  //console.log(req.body)

  Userdatabase.Do_sinup(req.body).then((data) => {
    res.render('./user/sinup-page', { admin: false })

  })

})

router.get('/login', (req, res) => {
  if (req.session.status) {
    res.redirect('/')
  }
  else {
    res.render('./user/login-page', { admin: false, value: req.session.falses })
    req.session.falses = false
  }

})

router.post('/login', (req, res) => {
  //console.log(req.body)

  Userdatabase.Do_login(req.body).then((state) => {
    //console.log(state.user)
    if (state.status) {
      req.session.status = true
      req.session.user = state.user
      res.redirect('/')
    }
    else {
      req.session.falses = "Invalid Username or Password"
      res.redirect('/login')
    }
  })



})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})
router.get('/order', this.common, (req, res) => {
  res.send("Hello world")
})

router.get('/link', (req, res) => {
  res.render('./user/temp-link', { admin: false })
})


router.get('/selectpro', this.common, (req, res) => {
  //console.log(req.query.id)
  Userdatabase.Do_cart(req.query.id).then((product) => {
    var user = req.session.user

    req.session.cartpro = product
    console.log(req.session.cartpro._id)
    res.render('./user/selectpro-page', { admin: false, product, user })
  })
})

router.get('/cart', this.common, (req, res) => {
  //console.log(req.query.id)
  // var user = req.session.user

  var id = req.session.cartpro._id
  console.log(id)
  Userdatabase.Do_cart(id).then((product) => {
    //console.log(product)

    var pro =
    {
      name: product.name,
      discription: product.discription,
      price: product.price,
      id: product._id
    }
    //console.log(pro)
    Userdatabase.After_cart(pro).then((data) => {
      // Userdatabase.Get_cart(pro.id).then((product) => {
      //   console.log(product)
      //   console.log(product.status)
      //   //console.log(pro)
      //   var cartpro = product.pro
      //   res.render('./user/carted-page', { admin: false ,cartpro})
      // })
      Userdatabase.Get_allcart().then((pro)=>
      {
        var user= req.session.user
        res.redirect('/carts')
      })

    })


  })

})

router.get('/carts',this.common,(req,res)=>
{
  var user = req.session.user
  Userdatabase.Get_allcart().then((pro)=>
  {
    res.render('./user/carted-page', { admin: false, pro, user })
  })

  

})

router.get('/remove',(req,res)=>
{
     Userdatabase.Delete_cart(req.query.id).then((data)=>
     {
       res.redirect('/carts')
     })
}) 

router.get('/buy',(req,res)=>
{
   var user = req.session.user
   res.render('./payments/pay-card',{admin:false,user})
})

module.exports = router;
