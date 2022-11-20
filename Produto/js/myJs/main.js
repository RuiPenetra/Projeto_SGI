
let list_mat_madeira = document.getElementById('list_mat_madeira');
let list_mat_metal = document.getElementById('list_mat_metal');
let btn_mat_madeira = document.getElementById('btn_tipo_madeira');
let btn_mat_metal = document.getElementById('btn_tipo_metal');


btn_mat_madeira.addEventListener('focus', function() {
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
})

  
 

/* modal.addEventListener('wheel', function(e) {
    e.preventDefault();
}, false); */

/* 
 document.getElementById('btn_tipo_material').onclick(function(){
    modal.style.display ='none'
 })

 document.getElementById('btn_tipo_material').addEventListener("focus",function(){
  modal.style.display ='none'
})
 */


function openModal(){
    fixed.classList.add("active-modal");
}


function closeModal(){
    fixed.classList.remove("active-modal");
}




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