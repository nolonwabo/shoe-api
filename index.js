"use strict";
var express = require('express');
var app = express();
//var jsonParser = require('jsonParser');
var shiftModel = require('./model');
var ObjectId = require("mongodb").ObjectId;
var bodyParser = require('body-parser');
app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', '"Origin, X-Requested-With, Content-Type, Accept"');
        next();
})
app.use(express.static('public'));
//app.use(jsonParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//List of all shoes.
app.get('/api/shoes', function(req, res) {
  shiftModel.find({}, function(err, allShoes) {
    if (err) {
      return res.json({
        status: "error",
        error: err
      });
    } else {
      res.json({
        status: "success",
        data: allShoes
      });
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
      return res.json({
        status: "error",
        error: err
      })
    } else {
      res.json({
        // status: "success",
        data: brandShoes
      })
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
      return res.json({
        status: "error",
        error: err
      });
    } else {
      res.json({
        status: "success",
        data: sizeShoe
      })
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
      return res.json({
        status: "error",
        error: err
      })
    } else {
      res.json({
        status: "success",
        data: {
          brandname: dataFiltering,
          size: dataFiltering
        }
      })
    }
  })

});

//Update the stock.
app.post('/api/shoes/sold/:id', function(req, res) {
  var id = req.params.id;

  console.log(shiftModel.findOneAndUpdate);

  shiftModel.findOneAndUpdate({
      _id: ObjectId(id)
    }, {
      $inc: {
        "in_stock": -1
      }
    },

    {
      upsert: false,
      new: true
    },

    function(err, updatedShoeInfo) {
      if (err) {
        return res.json({
          status: "error",
          error: err,
          data: []
        });
      }
        if(updatedShoeInfo.in_stock <= 0){
          updatedShoeInfo.remove()

        res.json({
          status: "success",
          data: updatedShoeInfo
        })
      }

    })
})
//Add new shoe.
app.post('/api/shoes', function(req, res) {
  var shoes = req.body;
var brand= shoes.brand;
var color= shoes.color;
var price= shoes.price;
var size= shoes.size;
var in_stock= shoes.in_stock;
  shiftModel.findOneAndUpdate({
    brand: brand,
    color: color,
    price: price,
    size: size
  }, {
    $inc:{
      in_stock: in_stock
    }
  },
  function(err, shoeResults) {
    if (err) {
      return err;
    } else if(!shoeResults){
      shiftModel.create({
        brand: brand,
        color: color,
        price: price,
        size: size,
        in_stock: in_stock
      },
     function(err, shoesData) {
      if (err) {
        return err;
      }
      res.json({shoesData})

      });
    }
  })
})

app.get('/api/size', function(req, res) {
shiftModel.find({},function(err, sizeDropdown){
  var sizeArray =[];
  var sizeObject ={};
  for (var i = 0; i < sizeDropdown.length; i++) {
  var sizeLoop= sizeDropdown[i];
  if(sizeObject[sizeLoop.size] === undefined){
    sizeObject[sizeLoop.size]=sizeLoop.size;
    sizeArray.push(sizeLoop.size);
  }
  }
  if(err){
    return(err)
  }
  res.json({sizeArray})
})

});

app.get('/api/brand', function(req, res) {
shiftModel.find({},function(err, brandDropdown){
  var brandArray =[];
  var brandObject ={};
  for (var i = 0; i < brandDropdown.length; i++) {
  var brandLoop= brandDropdown[i];
  if(brandObject[brandLoop.brand] === undefined){
    brandObject[brandLoop.brand]=brandLoop.brand;
    brandArray.push(brandLoop.brand);
  }
  }
  if(err){
    return(err)
  }
  res.json({brandArray})
})

});

var port = process.env.PORT || 3003
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
