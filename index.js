"use strict";
var express = require('express');
var app = express();
var jsonParser = require('body-parser').json;
var shiftModel = require('./model');

app.use(express.static('public'));
app.use(jsonParser());

//List of all shoes.
app.get('/api/shoes', function(req, res) {
shiftModel.find({},function(err, allShoes){
  if(err){
    return err;
  }
  else{
    res.json(allShoes)
  }
})

});

//List of all shoes per brandname.
app.get('/api/shoes/brand/:brandname', function(req, res) {
  var brandname = req.params.brandname
shiftModel.find({brand:brandname}, function(err, brandShoes){
  if(err){
    return err;
  }
  else{
    res.json(brandShoes)
  }
})

});

//List of shoes per given size.
app.get('/api/shoes/size/:size', function(req, res) {


});

//List of shoes given size and brand.
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {


});

//Update the stock.
app.post('/api/shoes/sold/:id', function(req, res) {

});
//Add new shoe.
app.post('/api/shoes', function(req, res) {
  var shoes = req.body
  shiftModel.findOne({}, function(err, shoeResults){
    if(err){
      return err;
    }
    else {

      console.log('shoes', shoes);
      shiftModel.create({
        brand: shoes.brand,
        color: shoes.color,
        price: shoes.price,
        size: shoes.size,
        in_stock: shoes.in_stock
      }, function(err, shoesData) {
        if (err) {
          return err;
        }
        console.log(shoesData);
        res.send(shoesData)
      });
    }
  })
  })
//shiftModel.find({}, function(err, shoesData) {
//  if (err) {
//    return err;
//  } else if (shoesData) {
// id: 10,
// color: 'black',
// brand: 'Addidas',
// price: 1499,
// size: 5,
// in_stock: 10

//})
// })

















var port = process.env.PORT || 3003
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
