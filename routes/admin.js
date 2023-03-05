var express = require('express');
var router = express.Router();
var Admindatabase = require('../database/admin_database')

/* GET home page. */
router.get('/', function (req, res, next) {

  Admindatabase.Datafrom_adminbase().then((products) => {
    res.render('./admin/list-product', { admin: true, products });
  })

});

router.get('/add', (req, res) => {
  res.render('./admin/add-products', { admin: true })
})

router.post('/add', (req, res) => {

  // console.log(req.body)
  // console.log(req.files.image)

  Admindatabase.Datato_addPro(req.body).then((data) => {
    // console.log(data)
    var image = req.files.image
    image.mv('public/Admin_image/' + data + '.jpg', (err, done) => {
      if (err) {
        console.log("Error" + err)
      }
      else {
        res.render('./admin/add-products', { admin: true })
      }
    })
  })

})

router.get('/delete', (req, res) => {
  //console.log(req.query.id)

  Admindatabase.Delete_product(req.query.id).then((data) => {
    res.redirect('/admin')
  })
})

router.get('/edit', (req, res) => {
  Admindatabase.get_product(req.query.id).then((products) => {
    res.render('./admin/edit-product', { admin: true, products })
  })

})

router.post('/edit', (req, res) => {
  
  console.log(req.body)
  var id = req.query.id; 

  Admindatabase.Edit_product(req.body,id).then((data)=>
  {
     console.log(data)
     res.redirect('/admin')
    if(req.files.image)
    {
       var image = req.files.image 
       image.mv("public/Admin_image/"+id+".jpg")
    }
  })

  
})

module.exports = router;
