
//   // TODO - looks weird ????
//   function filterData(){
//   $('.filterBtn').on('click', function() {
//     var brandFilter = document.querySelector('#brandFilter').value;
//
//     $.ajax({
//       url: '/api/shoes/brand/' + brandFilter,
//       type: 'GET',
//       success: function(data) {
//         table.innerHTML = shoesList({
//           shoeData: data.data
//         })
//       },
//       error: function(error) {
//         alert('error')
//       }
//     })
//   })
//   //  check if brand selected only
//





  var shoeTemp = document.querySelector('.shoeTemplate').innerHTML;
  var shoesTemp = Handlebars.compile(shoeTemp);

  var shoeList = document.querySelector('.shoesList').innerHTML;
  var shoesList = Handlebars.compile(shoeList);

  var shoeBrand = document.querySelector('.brandTemplate').innerHTML;
  var shoeBrandDropdown = Handlebars.compile(shoeBrand);

  var table = document.getElementById('output');
  var dropdowns = document.querySelector('.dropdown');
  var filterV = document.querySelector('.filters');
function showAllStock(){
  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(allShoes) {
      console.log(allShoes);
      table.innerHTML = shoesList({
        shoeData: allShoes.data
      })

    },
    // error: function(error) {
    //   alert('err');
    // }
  });
}
showAllStock();

function addStock(){
  var add = document.querySelector('.add');
  add.addEventListener('click', function() {
    var add = document.querySelector('.add');
    var colorV = document.querySelector('.colors');
    var sizeV = document.querySelector('.sizes');
    var brandV = document.querySelector('.brands');
    var priceV = document.querySelector('.prices');
    var stockV = document.querySelector('.stocks');

    $.ajax({
      url: '/api/shoes',
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
        showAllStock();
        addStock();
      },
      error: function(error) {
        console.log(error);
        alert(error);
      }
    })
  });
}
addStock();
  var filterButton = document.querySelector('.filterBtn').innerHTML;
  $('.filterBtn').on('click', function(){
var brandFilter = document.querySelector('#brandFilter').value;
$.ajax({
  url: '/api/shoes/brand/'+brandFilter,
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

$('.filterBtn').on('click', function(){
  var sizeFilter = document.querySelector('#sizeFilter').value;
  $.ajax({
    url: '/api/shoes/size/'+sizeFilter,
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
//var shoeInStock=[];
console.log(shoeInStock);
function sellStock(id){
console.log(id);
  $.ajax({
    url: '/api/shoes/sold/' +id,
    type: 'POST',
    async: true,
    dataType: "json",
    success: function(data){
        showAllStock();
      // console.log(data);
      // console.log("------");
      // shoeInStock.forEach(function(results){
      //   if(results._id==data.data._id){
      //     results.in_stock=data.data.in_stock;
      //   }
      // })
    },
    error: function(error){
      console.log("Hi");
      alert('error')
    }
  })
  showAllStock();
}




var sizedrop = document.querySelector('.sizedrop');
$.ajax({
  url: '/api/size',
  type: 'GET',
  success: function(sizeDropdownValue){
    sizedrop.innerHTML = shoesTemp({
      size: sizeDropdownValue.sizeArray
    })
  }
})

var brandDrop = document.querySelector('.brandDrop');
$.ajax({
  url: '/api/brand',
  type: 'GET',
  success: function(brandDropdownValue){
    brandDrop.innerHTML = shoeBrandDropdown({
      brand: brandDropdownValue.brandArray
    })
  }
})
