
let list_mat_madeira = document.getElementById('list_mat_madeira');
let list_mat_metal = document.getElementById('list_mat_metal');

/*  btn_mat_madeira.addEventListener('focus', function() {
    //if (list_mat_madeira.style.display === 'none' ) {
        list_mat_metal.style.display = 'none';
        list_mat_madeira.style.display = 'block';
      
  //}
})


btn_mat_metal.addEventListener('focus', function() {
  //if (list_mat_madeira.style.display === 'none' ) {
      list_mat_madeira.style.display = 'none';
      list_mat_metal.style.display = 'block';
    
//}
})  */

/* modal.addEventListener('wheel', function(e) {
    e.preventDefault();
}, false); */

 
let btn_tip_mad = document.getElementById("btn_tipo_madeira")
let btn_tip_met = document.getElementById("btn_tipo_metal")

btn_tip_mad.addEventListener("click",function(){
 
    btn_tip_met.classList.remove("type-active")
    btn_tip_mad.classList.add("type-active")
    list_mat_metal.style.display = 'none';
    list_mat_madeira.style.display = 'block';


})




btn_tip_met.addEventListener("click",function(){
 
    btn_tip_mad.classList.remove("type-active")
    btn_tip_met.classList.add("type-active")
    list_mat_madeira.style.display = 'none';
    list_mat_metal.style.display = 'block';

})


let item_mat = document.getElementsByClassName("item_mat")



let item_view1 = document.getElementById("crItem_Vist_normal")
let item_view2 = document.getElementById("crItem_Vist_port")
let item_view3 = document.getElementById("crItem_Vist_gav")
let item_view4 = document.getElementById("crItem_Vist_scale")

let helper_container = document.getElementById("helper_container")
let helper_title = document.getElementById("helper_title")



item_view1.addEventListener("focus",function(){

    helper_container.style.display='block'
    helper_title.textContent="Normal"

}) 

item_view2.addEventListener("focus",function(){

    helper_container.style.display='block'
    helper_title.textContent="Porta"

})

item_view3.addEventListener("focus",function(){

    helper_container.style.display='block'
    helper_title.textContent="Gaveta"

})

item_view4.addEventListener("focus",function(){

    helper_container.style.display='block'
    helper_title.textContent="Medidas"

})

/* $(document).ready(function() {
    $('div').click(function() {
        $('div.carousel-item.active').removeClass("active");
        $(this).addClass("active");
    });
}); */

/* 
function openModal(){
    fixed.classList.add("active-modal");
}


function closeModal(){
    fixed.classList.remove("active-modal");
}

 */


/* $(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
      theme: "minimal"
  });

  $('#dismiss, .overlay').on('click', function () {
      // hide sidebar
      $('#sidebar').removeClass('active');
      // hide overlay
      $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function () {
      // open sidebar
      $('#sidebar').addClass('active');
      // fade in the overlay
      $('.overlay').addClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
}); */