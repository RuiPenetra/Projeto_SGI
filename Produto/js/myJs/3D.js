
let material1,materia2,material3;
let tex_port_madeira,tex_port_madeira2
var scene = new THREE.Scene()
var sceneDesc = new THREE.Scene()
var loader = new THREE.TextureLoader()
let loaderObj1 = new THREE.GLTFLoader()
let loaderObj2 = new THREE.GLTFLoader()
let doorLeft;
let mouse = new THREE.Vector2()
var camera = new THREE.PerspectiveCamera( 60, 700/ 600,1, 1000 );
var camera2 = new THREE.PerspectiveCamera( 60, 700/ 600,1, 1000 );
let raycaster = new THREE.Raycaster()
let meuCanvas = document.getElementById('meuCanvas')
let canvasDesc = document.getElementById('canvasDesc')

var renderer = new THREE.WebGLRenderer({canvas: meuCanvas})

var renderer2 = new THREE.WebGLRenderer({canvas: canvasDesc})


renderer.setSize(700,500)
renderer2.setSize(700,500)


var controls = new THREE.OrbitControls(camera, renderer.domElement )
var controls2 = new THREE.OrbitControls(camera2, renderer2.domElement )

let MEDIDAS=[]
let MEDIDASDesc=[]
let model1,model2
let enableMedidas=false;

//let grid = new THREE.GridHelper()
//let axes = new THREE.AxesHelper(10)
scene.background = new THREE.Color('white')
sceneDesc.background = new THREE.Color('white')
//scene.add(axes)
//scene.add(grid)

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4; 

//renderer.setSize(300, window.innerHeight ); 
//renderer.setClearColor('white')
renderer.shadowMap.enabled = true
//document.body.appendChild( renderer.domElement )
renderer2.toneMapping = THREE.ReinhardToneMapping;
renderer2.toneMappingExposure = 4; 
renderer2.shadowMap.enabled = true


//document.body.appendChild( renderer.domElement ); 
camera.position.x = -7
camera.position.y = 8
camera.position.z = 15
camera.lookAt(0,2,0)
//camera.position.set( 4, 5, 20)
//camera.lookAt( 0, 0, 0)

camera2.position.x = -7
camera2.position.y = 8
camera2.position.z = 15
camera2.lookAt(0,2,0)

//LIMITA A VISIBILIDADE INFERIOR
controls.maxPolarAngle = Math.PI/3
//LIMITA A VISIBILIDADE SUPERIOR
controls.minPolarAngle = Math.PI/3
//DESABILITAR ZOOM
controls.enableZoom= false;

controls2.enabled= false;


 //set light
let luz = new THREE.PointLight( "white" )
let luzDesc = new THREE.PointLight( "white" )
//luz.position.set( 5, 6, 0 )
luz.position.set( 2, 6, 7)
luz.castShadow = true
scene.add(luz)  

luzDesc.position.set( 2, 6, 7)
luzDesc.castShadow = true
sceneDesc.add(luzDesc)  


//load 3d file
loaderObj1.load(
 './ficheiro_gltf/TV_newV2.gltf', 
 function ( gltf ) { 
    scene.add( gltf.scene )
    scene.traverse(function (x){
        if(x.isMesh){
            x.castShadow = true
            x.receiveShadow = true
        }

        //CARREGAR SEM MEDIDAS index[0]--->index[7]
        if(model1==null){
            model1 = x.children[3]            
            tex_port_madeira = model1.children[10]
        }
        
        
        //if(!enableMedidas){
            setMedidas(model1)
            //setMedidas(x.children[6])
            hideMedidas()
        //}
   
   /*  
        if (x.name.includes("doorLeft")) {
            console.log(x)
               doorLeft= x.parent.children[2]

               //model12=x
              
               material1 = x.children[0].material
               material2 = x.children[1].material
               material3 = x.children[2].material
   
           } */
        //    console.log("------------------")
        //    console.log(x.children[6])
        

        //x.material.map = new THREE.TextureLoader('./projeto_scene-exemplo_2022/model1s/textures/Wood028_2K_Color.png')
        //x.material.map = new THREE.TextureLoader('./projeto_scene-exemplo_2022/model1s/textures/Wicker001_1K_Color.png')
    })

      /*   if (x.name.includes("doorLeft")) {
            console.log(x)
               doorLeft= x.parent.children[2]

               //model12=x
              
               material1 = x.children[0].material
               material2 = x.children[1].material
               material3 = x.children[2].material
   
           }  */
 })

loaderObj2.load(
'./ficheiro_gltf/TV_newV2.gltf', 
function ( gltf2 ) { 
    //scene.add( gltf.scene )
    sceneDesc.add(gltf2.scene)
    sceneDesc.traverse(function (y){
        if(y.isMesh){
            y.castShadow = true
            y.receiveShadow = true
        }

        //CARREGAR SEM MEDIDAS index[0]--->index[7]
        if(model2==null){
            model2 = y.children[3]
            tex_port_madeira2 = model2.children[10]
        } 
       
        
        
        //if(!enableMedidas){
            //setMedidas(model12)
            //setMedidas(x.children[6])
            //hideMedidas()
        //}
    
    /*  
        if (x.name.includes("doorLeft")) {
            console.log(x)
                doorLeft= x.parent.children[2]

                //model12=x
                
                material1 = x.children[0].material
                material2 = x.children[1].material
                material3 = x.children[2].material
    
            } */
        //    console.log("------------------")
        //    console.log(x.children[6])
        

        //x.material.map = new THREE.TextureLoader('./projeto_scene-exemplo_2022/model1s/textures/Wood028_2K_Color.png')
        //x.material.map = new THREE.TextureLoader('./projeto_scene-exemplo_2022/model1s/textures/Wicker001_1K_Color.png')
    })

        /*   if (x.name.includes("doorLeft")) {
            console.log(x)
                doorLeft= x.parent.children[2]

                //model12=x
                
                material1 = x.children[0].material
                material2 = x.children[1].material
                material3 = x.children[2].material
    
            }  */
})


//update/render loop
addLights()
animar()

function animar() {
    requestAnimationFrame( animar )

    camera.lookAt(0,2,0)
    camera2.lookAt(0,2,0)
    renderer.render( scene, camera )
    renderer2.render( sceneDesc, camera2 )
}

function addLights(){
    let lightAmb = new THREE.AmbientLight( 0xffffff, 0.5); 
    let lightAmb1 = new THREE.AmbientLight( 0xffffff, 0.5); 
    scene.add( lightAmb );
    sceneDesc.add( lightAmb1 );

    let lightDir = new THREE.DirectionalLight( 0xE5E5DA, 1 );
    let lightDir1 = new THREE.DirectionalLight( 0xE5E5DA, 1 );
    lightDir.position.set(2,8,10)
    lightDir1.position.set(2,8,10)

    let dlHelper,dlHelper1 = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000);
    //scene.add(dlHelper);
    scene.add( lightDir );
    sceneDesc.add( lightDir1 );

    
}

/* 
document.getElementById('btn_texture').onclick = function(){
   //console.log("ola") 
    //delete alvo.material.format

    alvo.material.map = loader.load('./projeto_scene-exemplo_2022/model1s/textures/Wood028_2K_Color.png') 
}

document.getElementById('btn_texture1').onclick = function(){
     //delete alvo.material.format
 
     alvo.material.map = loader.load('./projeto_scene-exemplo_2022/model1s/textures/WoodFloor051_2K_Color.jpg') 

 }

 document.getElementById('btn_texture2').onclick = function(){
     //delete alvo.material.format
 
     alvo.material.map = loader.load('./projeto_scene-exemplo_2022/model1s/textures/WoodFloor051_2K_Roughness.jpg') 

 }

 document.getElementById('btn_texture3').onclick = function(){
     //delete alvo.material.format
 
     alvo.material.map = loader.load('./projeto_scene-exemplo_2022/model1s/textures/WoodFloor051_2K_Displacement.jpg') 

 }
 */

 function setMedidas(obj){
    //console.log("-----------")
    //console.log(obj)
    for(let i=0;i<8;i++){
        MEDIDAS[i]=obj.children[i]
        MEDIDASDesc[i]=obj.children[i]
    }
    //enableMedidas=1
   
}

function hideMedidas(obj){
    for(let i=0;i<8;i++){
        //console.log(MEDIDAS[i])
        MEDIDAS[i].visible= false
    }
   
}

function showMedidas(obj){
    for(let i=0;i<8;i++){
       // console.log("ola")
        //console.log(MEDIDAS[i] = x[i].visible=false
        MEDIDAS[i].visible= true
        MEDIDAS[i].material.color= new THREE.Color("red")
    }
    camera.position.x = -7
    camera.position.y = 8
    camera.position.z = 15
    camera.lookAt(0,2,0)
    controls.enabled= false;
    

    
}

/*
----------------------------------------------------------------------------------------------------------------------------
TIPOS DE VISTA
----------------------------------------------------------------------------------------------------------------------------
*/

document.getElementById("crItem_Vist_port").addEventListener("click",function(){
    
   //TO DO
})


document.getElementById("crItem_Vist_gav").addEventListener("click",function(){
    
    //TO DO

 })
 

document.getElementById("crItem_Vist_scale").addEventListener("click",function(){
    
    showMedidas()
})

document.getElementById("crItem_Vist_normal").addEventListener("click",function(){
  
    hideMedidas()
    camera.position.x = -7
    camera.position.y = 8
    camera.position.z = 15
    controls.enabled= true;
 
})

/*
----------------------------------------------------------------------------------------------------------------------------
TEXTURAS
----------------------------------------------------------------------------------------------------------------------------
*/
//MADEIRA
let btn_texture0 = document.getElementById("btn_texture0")
let btn_texture1 = document.getElementById("btn_texture1")
let btn_texture2 = document.getElementById("btn_texture2")
let btn_texture3 = document.getElementById("btn_texture3")
let btn_texture4 = document.getElementById("btn_texture4")
let btn_texture5 = document.getElementById("btn_texture5") 
let btn_texture6 = document.getElementById("btn_texture6")
let btn_texture7 = document.getElementById("btn_texture7")
let btn_texture8 = document.getElementById("btn_texture8")
let btn_texture9 = document.getElementById("btn_texture9")
let btn_texture10 = document.getElementById("btn_texture10") 
let btn_texture11 = document.getElementById("btn_texture11") 

//  ****** 
let btn_texture12 = document.getElementById("btn_texture12")
let btn_texture13 = document.getElementById("btn_texture13")
let btn_texture14 = document.getElementById("btn_texture14")
let btn_texture15 = document.getElementById("btn_texture15")
// let btn_texture16 = document.getElementById("btn_texture16")
/* let btn_texture17 = document.getElementById("btn_texture17")
let btn_texture18 = document.getElementById("btn_texture18")
let btn_texture19 = document.getElementById("btn_texture19")
let btn_texture20 = document.getElementById("btn_texture20")
let btn_texture21 = document.getElementById("btn_texture21")
let btn_texture22 = document.getElementById("btn_texture22")
let btn_texture23 = document.getElementById("btn_texture23") */

//METAL
let tex_madeira0 = './src/texture/madeira/text_0.png'
let tex_madeira1 = './src/texture/madeira/text_1.jpg'
let tex_madeira2 = './src/texture/madeira/text_2.png'
let tex_madeira3 = './src/texture/madeira/text_3.png'
let tex_madeira4 = './src/texture/madeira/text_4.png'
let tex_madeira5 = './src/texture/madeira/text_5.png'
let tex_madeira6 = './src/texture/madeira/text_6.png' 
let tex_madeira7 = './src/texture/madeira/text_7.png'
let tex_madeira8 = './src/texture/madeira/text_8.png'
let tex_madeira9 = './src/texture/madeira/text_9.png'
let tex_madeira10 = './src/texture/madeira/text_10.png' 
let tex_madeira11 = './src/texture/madeira/text_10.png' 

// let tex_port_madeira = './../../src/texture/madeira/text_porta.png'


let tex_metal1 = './src/texture/metal/Metal009_4K_Color.png'
let tex_metal2 = './src/texture/metal/Metal010_4K_Color.png'
let tex_metal3 = './src/texture/metal/Metal029_4K_Color.png'
let tex_metal4 = './src/texture/metal/Metal012_4K_Color.png'

let tex_port_metal = './src/texture/metal/MetalWalkway003_4K_Color.png'
/* let tex_metal5 = './../../src/texture/metal/Metal036_4K_Color.png'
let tex_metal6 = './../../src/texture/metal/Metal038_4K_Color.png' */
/* let tex_metal7 = './../../src/texture/metal/MetalWalkway011_4K_Color.png'
let tex_metal8 = './../../src/texture/metal/MetalWalkway013_4K_Color.png'
let tex_metal9 = './../../src/texture/metal/SheetMetal001_4K_Color.png'
let tex_metal10 = './../../src/texture/metal/SheetMetal002_4K_Color.png'
let tex_metal11 = './../../src/texture/metal/Metal009_4K_Color.png'
let tex_metal12 = './../../src/texture/metal/Chainmail004_4K_Color.png' */




//Carregar
btn_texture0.style.backgroundImage = "url(" + tex_madeira0 + ")"
btn_texture1.style.backgroundImage = "url(" + tex_madeira1 + ")"
btn_texture2.style.backgroundImage = "url(" + tex_madeira2 + ")"
btn_texture3.style.backgroundImage = "url(" + tex_madeira3 + ")"
btn_texture4.style.backgroundImage = "url(" + tex_madeira4 + ")"
btn_texture5.style.backgroundImage = "url(" + tex_madeira5 + ")" 
btn_texture6.style.backgroundImage = "url(" + tex_madeira6 + ")"
btn_texture7.style.backgroundImage = "url(" + tex_madeira7 + ")"
btn_texture8.style.backgroundImage = "url(" + tex_madeira8 + ")"
btn_texture9.style.backgroundImage = "url(" + tex_madeira9 + ")"
btn_texture10.style.backgroundImage = "url(" + tex_madeira10 + ")" 
btn_texture11.style.backgroundImage = "url(" + tex_madeira11 + ")" 

btn_texture12.style.backgroundImage = "url(" + tex_metal1 + ")"
btn_texture13.style.backgroundImage = "url(" + tex_metal2 + ")"
btn_texture14.style.backgroundImage = "url(" + tex_metal3 + ")"
btn_texture15.style.backgroundImage = "url(" + tex_metal4 + ")"
/* btn_texture16.style.backgroundImage = "url(" + tex_metal5 + ")"
btn_texture17.style.backgroundImage = "url(" + tex_metal6 + ")" */
/* btn_texture18.style.backgroundImage = "url(" + tex_metal7 + ")"
btn_texture19.style.backgroundImage = "url(" + tex_metal8 + ")"
btn_texture20.style.backgroundImage = "url(" + tex_metal9 + ")"
btn_texture21.style.backgroundImage = "url(" + tex_metal10 + ")"
btn_texture22.style.backgroundImage = "url(" + tex_metal11 + ")"
btn_texture23.style.backgroundImage = "url(" + tex_metal12 + ")" */


btn_texture0.addEventListener('click',function(){
    //console.log(model1.children[8])
    model1.children[8].material.map = loader.load(tex_madeira0) 
   // model1.children[9].children[1].material.map = loader.load(tex_madeira0) 
    model1.children[10].material.map = tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira0) 
    model2.children[10].material.map = tex_port_madeira2
})

 btn_texture1.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira1) 
   // model1.children[9].children[0].material.map = loader.load(tex_madeira1) 
    model1.children[10]=tex_port_madeira

    
    model2.children[8].material.map = loader.load(tex_madeira1) 
    model2.children[10].material.map = tex_port_madeira2

})

btn_texture2.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira2) 
    //model1.children[9].children[0].material.map = loader.load(tex_madeira2) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira2) 
    model2.children[10].material.map = tex_port_madeira2
}) 

btn_texture3.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira3) 
    //model1.children[9].material.map = loader.load(tex_madeira3) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira3) 
    model2.children[10].material.map = tex_port_madeira2
}) 

btn_texture4.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira4)
    //model1.children[9].material.map = loader.load(tex_madeira4) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira4) 
    model2.children[10].material.map = tex_port_madeira2
})

btn_texture5.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira5)
    //model1.children[9].material.map = loader.load(tex_madeira5) 
    model1.children[10]=tex_port_madeira 

    model2.children[8].material.map = loader.load(tex_madeira5) 
    model2.children[10].material.map = tex_port_madeira2
  
})

btn_texture6.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira6) 
    //model1.children[9].material.map = loader.load(tex_madeira6) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira6) 
    model2.children[10].material.map = tex_port_madeira2
})

btn_texture7.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira7) 
   // model1.children[9].material.map = loader.load(tex_madeira7) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira7) 
    model2.children[10].material.map = tex_port_madeira2
})

btn_texture8.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira8) 
    //model1.children[9].material.map = loader.load(tex_madeira8) 
    model1.children[10]=tex_port_madeira

    model2.children[8].material.map = loader.load(tex_madeira8) 
    model2.children[10].material.map = tex_port_madeira2
}) 

btn_texture9.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira9) 
    //.children[9].material.map = loader.load(tex_madeira9) 
    model1.children[10]=tex_port_madeira 

    model2.children[8].material.map = loader.load(tex_madeira9) 
    model2.children[10].material.map = tex_port_madeira2

})

btn_texture10.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira10)
    //model1.children[9].material.map = loader.load(tex_madeira10) 
    model1.children[10]=tex_port_madeira 

    model2.children[8].material.map = loader.load(tex_madeira10) 
    model2.children[10].material.map = tex_port_madeira2
}) 

btn_texture11.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_madeira11)
    //model1.children[9].material.map = loader.load(tex_madeira11) 
    model1.children[10]=tex_port_madeira 

    model2.children[8].material.map = loader.load(tex_madeira11) 
    model2.children[10].material.map = tex_port_madeira2
}) 


btn_texture12.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal1)
    //model1.children[9].material.map = loader.load(tex_metal1) 
    model1.children[10].children[0].material.map = loader.load(tex_port_metal)

    model2.children[8].material.map = loader.load(tex_metal1) 
    model2.children[10].material.map = loader.load(tex_port_metal)
})

btn_texture13.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal2) 
    //model1.children[9].material.map = loader.load(tex_metal2) 
    model1.children[10].children[0].material.map = loader.load(tex_port_metal)

    model2.children[8].material.map = loader.load(tex_metal2) 
    model2.children[10].material.map = loader.load(tex_port_metal)
}) 

 btn_texture14.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal3)  
    //model1.children[9].material.map = loader.load(tex_metal3) 
    model1.children[10].children[0].material.map = loader.load(tex_port_metal)

    model2.children[8].material.map = loader.load(tex_metal3) 
    model2.children[10].material.map = loader.load(tex_port_metal)
})

btn_texture15.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal4) 
   // model1.children[9].material.map = loader.load(tex_metal4) 
    model1.children[10].material.map = loader.load(tex_port_metal)

    model2.children[8].material.map = loader.load(tex_metal4) 
    model2.children[10].material.map = loader.load(tex_port_metal)

}) 




/* 
btn_texture16.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal5) 
    model1.children[8].material.map = loader.load(tex_metal5) 

})

btn_texture17.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal6) 
    model1.children[8].material.map = loader.load(tex_metal6) 

})

btn_texture18.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal7) 
    model1.children[8].material.map = loader.load(tex_metal7) 

})

btn_texture19.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal8) 
    model1.children[8].material.map = loader.load(tex_metal8) 

})

btn_texture20.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal9) 
    model1.children[8].material.map = loader.load(tex_metal9) 

})

btn_texture21.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal10) 
    model1.children[8].material.map = loader.load(tex_metal10) 

})

btn_texture22.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal11) 
    model1.children[8].material.map = loader.load(tex_metal11) 

})

btn_texture23.addEventListener('click',function(){
    model1.children[8].material.map = loader.load(tex_metal12) 
    model1.children[8].material.map = loader.load(tex_metal12) 

}) */ 
   
/* function resetMaterials(){

    model1.children[0].material = material1
    model1.children[1].material = material2
    model1.children[2].material = material3
    
    
}


function onPointerDown(event){
    mouse.x = (event.clientX / window.innerWidth)* 2 - 1
    mouse.y = -(event.clientY / window.innerHeight)* 2 + 1

    raycaster.setFromCamera(mouse, camera)
    let intersects = raycaster.intersectmodel1s(model1.children,true)

    console.log(model1.children)
    console.log(intersects)

    if(intersects.length>0){

        if(intersects[0].model1.parent.name=="doorLeft"){
            console.log("intersects")
            //console.log(intersects[0].model1.parent.children.length)
            
            tamanho= intersects[0].model1.parent.children.length
            //console.log( intersects[0].model1.parent.children)
            model12 = intersects[0].model1.parent.children

            console.log(model12[1])
            for(let i =0; i < tamanho; i++){
                
                console.log(intersects[i])
                model12[i].material= new THREE.MeshStandardMaterial({color:"yellow"})
                //model12[i].model1.material = new THREE.Color("red")

            }
        }

       
            
        
        
    }




}

function onPointerUp(){
    resetMaterials()
} */


/* 
window.addEventListener('pointerdown', onPointerDown)
window.addEventListener('pointerup', onPointerUp,false) */