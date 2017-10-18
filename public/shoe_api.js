var shoeTemp = document.querySelector('.shoeTemplate').innerHTML;
var shoesTemp = Handlebars.compile(shoeTemp);

var shoeList = document.querySelector('.shoesList').innerHTML;
var shoesList = Handlebars.compile(shoeList);

var shoeBrand = document.querySelector('.brandTemplate').innerHTML;
var shoeBrandDropdown = Handlebars.compile(shoeBrand);

var table = document.getElementById('output');
var dropdowns = document.querySelector('.dropdown');
var filterV = document.querySelector('.filters');

var addShoeBtn = document.querySelector('.add-shoe-btn');

addShoeBtn.addEventListener('click', function(){
  $("#addModal").modal("hide");
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
            resetInputBox();
          },
          error: function(error) {
            console.log(error);
            alert(error);
          }
        })
      });
function resetInputBox(){
  $('#color').val("");
  $('#size').val("");
  $('#brand').val("");
  $('#price').val("");
  $('#in_stock').val("");
}


function showAllStock() {
  $('#showAll').on('click', function() {
  $.ajax({
    url: '/api/shoes',
    type: 'GET',
    success: function(allShoes) {
      table.innerHTML = shoesList({
        shoeData: allShoes.data
      })

    }
  });
})
}
showAllStock();

$(document).ready(function(){
  $('#addStock').click(function(){
    $('#addModal').modal();
  });
});


function filterData(){
$('.filterBtn').on('click', function() {
  var brandFilter = document.querySelector('#brandFilter').value;
  var sizeFilter = document.querySelector('#sizeFilter').value;
  if(brandFilter !=="" && sizeFilter==""){
  $.ajax({
    url: '/api/shoes/brand/' + brandFilter,
    type: 'GET',
    success: function(data) {
      table.innerHTML = shoesList({
        shoeData: data.data
      })
    },
    error: function(error) {
      alert('error')
    }
  })
}
else if (brandFilter=="" && sizeFilter!=="") {
  $.ajax({
    url: '/api/shoes/size/' + sizeFilter,
    type: 'GET',
    success: function(data) {
      table.innerHTML = shoesList({
        shoeData: data.data
      })
    },
    error: function(error) {
      alert('error')
    }
  })
}
else if(brandFilter!=="" && sizeFilter!=="")  {
    $.ajax({
      url: '/api/shoes/brand/'+ brandFilter + "/size/" + sizeFilter,
       type: 'GET',
       async: true,
       dataType: "json",
       success: function(data){
         table.innerHTML = shoesList({
           shoeData: data.data
        })
     },
       error: function(error){
         alert('error')
       }
    })
}
})
}
filterData();

function sellStock(id) {
  console.log(id);
  $.ajax({
    url: '/api/shoes/sold/' + id,
    type: 'POST',
    async: true,
    dataType: "json",
    success: function(data) {
    },
    error: function(error) {
      alert('error')
    }
  })
  showAllStock();
}

var sizedrop = document.querySelector('.sizedrop');
$.ajax({
  url: '/api/size',
  type: 'GET',
  success: function(sizeDropdownValue) {
    sizedrop.innerHTML = shoesTemp({
      size: sizeDropdownValue.sizeArray.sort()
    })
  }
})

var brandDrop = document.querySelector('.brandDrop');
$.ajax({
  url: '/api/brand',
  type: 'GET',
  success: function(brandDropdownValue) {
    brandDrop.innerHTML = shoeBrandDropdown({
      brand: brandDropdownValue.brandArray.sort()
    })
  }
})
