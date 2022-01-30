const socket = io();
////////////////////////////// ORDER GENERATE ///////////////////////////////////
let orderStatusListo=[];
socket.on('order:available',(payload)=>{
  orderStatusListo = payload
  if (payload.success) {
    $("#divcleaneat").show();
    var row = "";
    payload.data.forEach(element => {
      row += '<tr><th scope="row">' + element.n_order + '</th><td>' + element.dishes + '</td><td><span class="badge badge-success">' + element.status + '</span></td><td>' + dataFormatt(element.createdAt) + '</td></tr>';
    });
  }
  console.log('desde el front', payload);

    // get the current table body html as a string, and append the new row
   document.getElementById("order-table").innerHTML = row;

    // set the table body to the new html code
  })
  $( document ).ready(function() {
    // $("#divcleaneat").hide();
    if (orderStatusListo.length == 0) {
      $("#divcleaneat").hide();
    }
  });

// document.getElementById('divcleaneat').style.display = 'none';
function buttonEnable() {
  // orderStatusListo
}
 function cleanEat() {
 
   $.ajax({
    type: 'post',
    url: '/order/update/status',
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(orderStatusListo),
    traditional: true,
    success: function (data) {
        $("#divcleaneat").hide();
        orderStatusListo=[];
        document.getElementById("order-table").innerHTML = '';
    },
    error:function(err){
        console.log(err);
    }
  });
 }

////////////////////////////// ORDER HISTORY ///////////////////////////////////
socket.on('order:delivered',(payload)=>{
  console.log('socket generate');
  console.log(payload);
  // window.location.href = '/order'; 
  $('#orderhistory thead').empty();
  $('#orderhistory tbody').empty();
  // $( "#datatables" ).load( "order #datatables" );
  // if (payload.success) {
  //   var row = "";
  //   document.getElementById("orderhistory").innerHTML = '';
  //   payload.data.forEach(element => {
  //     row += '<tr><th scope="row">' + element.n_order + '</th><td>' + element.dishes + '</td><td><span class="badge badge-success">' + element.status + '</span></td><td>' + dataFormatt(element.createdAt) + '</td></tr>';
  //   });
  // }
  //  document.getElementById("orderhistory").innerHTML += row;
})






function dataFormatt(timestamp) {
  let d = new Date(timestamp);
  let ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('es', { month: 'short' }).format(d);
  let da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(d);
  console.log(`${da}/${mo}/${ye}`);
  return `${da}-${mo}-${ye}`;
}
