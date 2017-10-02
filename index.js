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
        status: "success",
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
      upsert: false
    },

    function(err, updatedShoeInfo) {
      if (err) {
        return res.json({
          status: "error",
          error: err,
          data: []
        });
      } else {
        res.json({
          status: "success",
          data: updatedShoeInfo
        })
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
          return res.json({
            status: "error",
            error: err
          });
        }
        console.log(shoesData);
        res.json({
          status: "success",
          data: shoesData
        })
      });
    }
  })
})

var port = process.env.PORT || 3003
var server = app.listen(port, function() {
  console.log("Started app on port : " + port)
});
