"use strict";
var express = require('express');
var app = express();
var jsonParser = require('body-parser').json;
var shiftModel = require('./model');
var ObjectId = require("mongodb").ObjectId;
app.use(express.static('public'));
app.use(jsonParser());

//List of all shoes.
app.get('/api/shoes', function(req, res) {
  shiftModel.find({}, function(err, allShoes) {
    if (err) {
      return err;
    } else {
      res.json(allShoes)
    }
  })

});

//List of all shoes per brandname.
app.get('/api/shoes/brand/:brandname', function(req, res) {
  var brandname = req.params.brandname
  shiftModel.find({
    brand: brandname
  }, function(err, brandShoes) {
    if (err) {
      return err;
    } else {
      res.json(brandShoes)
    }
  })

});

//List of shoes per given size.
app.get('/api/shoes/size/:size', function(req, res) {
  var shoeSize = req.params.size
  shiftModel.find({
    size: shoeSize
  }, function(err, sizeShoe) {
    if (err) {
      return err;
    } else {
      res.json(sizeShoe)
    }
  })

});

//List of shoes given size and brand.
app.get('/api/shoes/brand/:brandname/size/:size', function(req, res) {
  var brandname = req.params.brandname
  var size = req.params.size
  shiftModel.find({
    brand: brandname,
    size: size
  }, function(err, dataFiltering) {
    console.log(dataFiltering);
    if (err) {
      return err;
    } else {
      res.json({
        brandname: dataFiltering,
        size: dataFiltering
      })
    }
  })

});

//Update the stock.
app.post('/api/shoes/sold/:id', function(req, res) {
      var id = req.body
      shiftModel.findOneAndUpdate({
          _id: ObjectId(id)
        }, {
          $dec: {
            "in_stock": -1
          },function(err, updateDate){
            if (err) {
              return err;
            }
            else {
              res.send(updateDate)
            }
          }
  })
})
    //Add new shoe.
    app.post('/api/shoes', function(req, res) {
      var shoes = req.body
      shiftModel.findOne({}, function(err, shoeResults) {
        if (err) {
          return err;
        } else {

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

    var port = process.env.PORT || 3003
    var server = app.listen(port, function() {
      console.log("Started app on port : " + port)
    });
