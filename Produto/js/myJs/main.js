
let list_mat_madeira = document.getElementById('list_mat_madeira');
let list_mat_metal = document.getElementById('list_mat_metal');


let focus=0
let btn_tip_mad = document.getElementById("btn_tipo_madeira")
let btn_tip_met = document.getElementById("btn_tipo_metal")



let helper_img = [ 
    "./src/view_3d.png",
    "./src/icons8-open-door-96.png",
    "./src/icons8-drawer-96.png",
    "./src/view_scale.png"
]

let helper_info = [ 
    "Nesta vista é possivel visualizar o produto em 3d podendo visualizar o produto em diversas prespetivas. Para poder rodar o movél apenas é necessário precionar com o rato no movél e arrastar para o lado que pretende visualizar o movel ",
    "Nesta vista apenas é possivel visualizar o interior do movel por pela porta podendo consultar o interior",
    "Nesta vista apenas é possivel visualizar o interior do movel por pela gaveta podendo consultar o interior",
    "Nesta vista apenas é possivel consultar as medidas  do móvel"
]

btn_tip_mad.addEventListener("click",function(){
 
    btn_tip_met.classList.remove("type-active")
    btn_tip_mad.classList.add("type-active")
    list_mat_metal.style.display = 'none';
    list_mat_madeira.style.display = 'block';
    focus =0

})

btn_tip_met.addEventListener("click",function(){
 
    btn_tip_mad.classList.remove("type-active")
    btn_tip_met.classList.add("type-active")
    list_mat_madeira.style.display = 'none';
    list_mat_metal.style.display = 'block';
    focus = 1
})


let item_mat = document.getElementsByClassName("item_mat")


let hp_content = document.getElementById("helper_content")
let hp_title = document.getElementById("helper_title")
let hp_img_content = document.getElementById("helper_img_content")


//INICIALIZAR INFO HELPER 
console.log(hp_content)
hp_content.textContent=helper_info[0]
hp_title.textContent="Vista Normal"

let list_MT = document.getElementById("list_mat_metal")
let list_MD = document.getElementById("list_mat_madeira")
let items_mat = list_MD.getElementsByClassName("item_mat")

//ITEM_MAT ACTIVE
/* for(let i =0; i< items_mat.length; i++){
    items_mat[i].addEventListener("click",function(){
        let current = document.getElementsByClassName("item-active")
         //if(current.length > 0){
        current[0].className = current[0].className.replace("item-active","")
        //}
        this.className += " item-active"
    })
}  */

for(let i =0; i< items_mat.length; i++){
    items_mat[i].addEventListener("click",function(){
        let current = document.getElementById("item_check")
        console.log(current)
        item_mat[i].appendChild(current)
        //current.remove()
         //if(current.length > 0){
        //current[0].className = current[0].className.replace("item-active","")
        //}
        //this.className += " item-active"
    })
} 


//TIPOS DE VISTAS (ACTIVE, HELPER)
let list_vist = document.getElementById("list_vistas")
let items_vist = list_vist.getElementsByClassName("carousel-item")

for(let j =0; j< items_vist.length; j++){
    items_vist[j].addEventListener("click",function(){
        let current2 = document.getElementsByClassName("cr-item-active")
        current2[0].className = current2[0].className.replace("cr-item-active","")
        this.className += " cr-item-active"
       //console.log(helper_container)
        hp_title.textContent="Vista " + items_vist[j].children[0].textContent;
        hp_content.textContent= helper_info[j]
        hp_img_content.src = helper_img[j]

        
        
    })
} 



let btn_quant_incre = document.getElementById("btn_quant_incre")
let btn_quant_decre = document.getElementById("btn_quant_decre")
let input_quant = document.getElementById("input_quant")


btn_quant_incre.addEventListener("click",function(){
    console.log("ola")
    input_quant.value= parseInt(input_quant.value) +1
    
})


btn_quant_decre.addEventListener("click",function(){

    if(input_quant.value > 1){
        input_quant.value= parseInt(input_quant.value) -1
    }
})
