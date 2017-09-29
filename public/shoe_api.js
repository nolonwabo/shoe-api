$(function() {
  //   var shoeTemp = document.querySelector('.shoeTemplate').innerHTML;
  // var shoesTemp = Handlebars.compile(shoeTemp);

  var shoeList = document.querySelector('.shoesList').innerHTML;
  var shoesList = Handlebars.compile(shoeList);

  // var filter = document.querySelector('.shoeFilter').innerHTML;
  // var filters = Handlebars.compile(filter);

  // var shoeColor = document.querySelector('.color');
  // var shoeSize = document.querySelector('.size');
  // var shoeBrand = document.querySelector('.brand');

  // var filterButton = document.querySelector('.filterBtn').innerHTML;

  var table = document.getElementById('output');
  // var dropdowns = document.querySelector('.dropdown');
  // var filterV = document.querySelector('.filters');


  $.ajax({
    url: 'Http://localhost:3003/api/shoes',
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
  var colorV = document.querySelector('.colors');
  var sizeV = document.querySelector('.sizes');
  var brandV = document.querySelector('.brands');
  var priceV = document.querySelector('.prices');
  var stockV = document.querySelector('.stocks');
  var colorName = colorV.value;
  var sizeName = sizeV.value;
  var brandName = brandV.value;
  var priceName = priceV.value;
  var stockName = stockV.value;
  add.addEventListener('click', function() {

    $.ajax({
      url: 'Http://localhost:3003/api/shoes',
      type: 'POST',
      async: true,
      data: {
        brand: brandName,
        size: sizeName,
        price:priceName,
        in_stock:stockName,
        color:colorName
      },
      success: function(newShoe) {
        console.log('success', newShoe.data);
        table.innerHTML = shoesList({
          shoeData: newShoe.data
        })
      },
      error: function(error) {
        alert('err');
      }
    })


  });





var show = document.querySelector('.show');
  show.addEventListener('click', function() {
    displayData(shoesDataList);
  });



});
