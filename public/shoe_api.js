$(function() {
  //   var shoeTemp = document.querySelector('.shoeTemplate').innerHTML;
  // var shoesTemp = Handlebars.compile(shoeTemp);

  var shoeList = document.querySelector('.shoesList').innerHTML;
  var shoesList = Handlebars.compile(shoeList);

  // var filter = document.querySelector('.shoeFilter').innerHTML;
  // var filters = Handlebars.compile(filter);

  var shoeColor = document.querySelector('.color');
  var shoeSize = document.querySelector('.size');
  var shoeBrand = document.querySelector('.brand');

  var filterButton = document.querySelector('.filterBtn').innerHTML;

   var table = document.getElementById('output');
  // var dropdowns = document.querySelector('.dropdown');
  // var filterV = document.querySelector('.filters');


  $.ajax({
    url: 'http://localhost:3003/api/shoes',
    type: 'GET',
    success: function(allShoes) {
      console.log(allShoes);
      table.innerHTML = shoesList({
        shoeData: allShoes.data
      })
    },
    error: function(error) {
      alert('err');
    }
  });

  var add = document.querySelector('.add');
  add.addEventListener('click', function() {
    var add = document.querySelector('.add');
    var colorV = document.querySelector('.colors');
    var sizeV = document.querySelector('.sizes');
    var brandV = document.querySelector('.brands');
    var priceV = document.querySelector('.prices');
    var stockV = document.querySelector('.stocks');
    $.ajax({
      url: 'Http://localhost:3003/api/shoes',
      type: 'POST',
      async: true,
      dataType: "application/json",
      data: {
        brand: brandV.value,
        size: sizeV.value,
        color:colorV.value,
        price:priceV.value,
        in_stock:stockV.value
      },
      success: function(data) {
        console.log('success', data.data);
        table.innerHTML = shoesList({
          shoeData: data.data
        })
      },
      error: function(error) {
        console.log(error);
        alert(error);
      }
    })


  });

  // $.ajax({
  //   url: 'http://localhost:3003/api/shoes/brand/brandname',
  //   type: 'GET',
  //   success: function(allShoes) {
  //     console.log(allShoes);
  //     table.innerHTML = shoesList({
  //       shoeData: allShoes.data
  //     })
  //   },
  //   error: function(error) {
  //     alert('err');
  //   }
  // });



var show = document.querySelector('.show');
  show.addEventListener('click', function() {
    displayData(shoesDataList);
  });



});
