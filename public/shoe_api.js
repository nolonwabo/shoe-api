//$(function() {
  var shoeTemp = document.querySelector('.shoeTemplate').innerHTML;
  var shoesTemp = Handlebars.compile(shoeTemp);

  var shoeList = document.querySelector('.shoesList').innerHTML;
  var shoesList = Handlebars.compile(shoeList);

  var table = document.getElementById('output');
  var dropdowns = document.querySelector('.dropdown');
  var filterV = document.querySelector('.filters');

  $.ajax({
    url: 'http://localhost:3003/api/shoes',
    type: 'GET',
    success: function(allShoes) {
      console.log(allShoes);
      table.innerHTML = shoesList({
        shoeData: allShoes.data
      })
      dropdowns.innerHTML = shoesTemp({
        shoeData: allShoes.data
      })
    },
    // error: function(error) {
    //   alert('err');
    // }
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
      url: 'http://localhost:3003/api/shoes',
      type: 'POST',
      async: true,
      dataType: "json",
      data: {
        brand: brandV.value,
        size: sizeV.value,
        color: colorV.value,
        price: priceV.value,
        in_stock: stockV.value
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

  var filterButton = document.querySelector('.filterBtn').innerHTML;
  $('.filterBtn').on('click', function(){
    alert("button");

  console.log(filterButton);
var brandFilter = document.querySelector('#brandFilter').value;
console.log(brandFilter);
// var brandSelected =
//   brand: brandFilter.value
// }
$.ajax({
  url: 'http://localhost:3003/api/shoes/brand/'+brandFilter,
  type: 'GET',
  success: function(data){
    table.innerHTML = shoesList({
      shoeData: data.data
    })
  },
  error: function(error){
alert('error')
}
})
console.log(brandFilter);

})

$('.filterBtn').on('click', function(){
  var sizeFilter = document.querySelector('#sizeFilter').value;
  $.ajax({
    url: 'http://localhost:3003/api/shoes/size/'+sizeFilter,
    type: 'GET',
    success: function(data){
      table.innerHTML = shoesList({
        shoeData: data.data
      })
    },
    error: function(error){
      alert('error')
    }
  })
})

// $('.filterBtn').on('click', function(){
//   var sizeFilter = document.querySelector('#sizeFilter').value;
//   var brandFilter = document.querySelector('#brandFilter').value;
//   $.ajax({
//     url: 'http://localhost:3003/api/shoes/brand/'+ brandFilter + "/size/" + sizeFilter,
//     type: 'GET',
//     async: true,
//     dataType: "json",
//     success: function(data){
//       table.innerHTML = shoesList({
//         shoeData: data.data
//       })
//     },
//     error: function(error){
//       alert('error')
//     }
//   })
// })
var shoeInStock=[];
function sellStock(id){

  //console.log(e);
  //console.log(event.target.value);
  // var shoesId = e.target.value;
  //console.log(shoesId);
  $.ajax({
    url: 'http://localhost:3003/api/shoes/sold/' +id,
    type: 'POST',
    async: true,
    dataType: "json",
    success: function(data){
      shoeInStock.forEach(function(results){
        if(results._id==data.data._id){
          results.in_stock=data.data.in_stock;
        }
      })

      // table.innerHTML = shoesList({
      //   shoeData: data.data
      // })
    },
    error: function(error){
      alert('error')
    }
  })
}
// sellStock()

//});
