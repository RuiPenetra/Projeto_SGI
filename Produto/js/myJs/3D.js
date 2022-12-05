
let RACK,DOOR_LEFT_IN,DOOR_LEFT_OUT,DOOR_RIGHT_IN,DOOR_RIGHT_OUT,DRAWER_UP,DRAWER_DOWN
let scene = new THREE.Scene()
let sceneDesc = new THREE.Scene()
let loader = new THREE.TextureLoader()
let loaderObj1 = new THREE.GLTFLoader()
let loaderObj2 = new THREE.GLTFLoader()

let MEDIDAS=[]
let MEDIDASDesc=[]
let model1,model2
let enableMedidas=false;
let ANIM_GAVETA = 0
let ANIM_PORTA = 0


let acao1,acao2,acao3

let mat_MAD_1,mat_MAD_2,mat_MAD_3,mat_MAD_4
let mat_MET_1,mat_MET_2,mat_MET_3
let mouseSelected

/*
-----------------------------------------
ANIMAÇÕES
-----------------------------------------
*/
let relogio = new THREE.Clock(scene)
let misturador = new THREE.AnimationMixer(scene)
/*---------------------------------------------*/
//load 3d file



//fov, aspect, near, far
let camera = new THREE.PerspectiveCamera( 60,700/600 ,0.5, 1000 );
let camera2 = new THREE.PerspectiveCamera( 60, 700/ 600,1, 1000 );

let meuCanvas = document.getElementById('meuCanvas')
let canvasDesc = document.getElementById('canvasDesc')

var renderer = new THREE.WebGLRenderer({canvas: meuCanvas})

var renderer2 = new THREE.WebGLRenderer({canvas: canvasDesc})


renderer.setSize(700,500)
renderer2.setSize(700,500)


let controls = new THREE.OrbitControls(camera, renderer.domElement )
let controls2 = new THREE.OrbitControls(camera2, renderer2.domElement )

let grid = new THREE.GridHelper()
let axes = new THREE.AxesHelper(10)

scene.background = new THREE.Color( 0xf0f0f0 );
const pmremGenerator = new THREE.PMREMGenerator( renderer );
//scene.background = new THREE.Color('gray')
scene.environment = pmremGenerator.fromScene( new THREE.RoomEnvironment(), 0.04 ).texture
sceneDesc.background = new THREE.Color('white')
scene.add(axes)
scene.add(grid)
const helper = new THREE.CameraHelper( camera );
scene.add( helper );

renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3; 

//renderer.setSize(300, window.innerHeight ); 
//renderer.setClearColor('white')
//renderer.shadowMap.enabled = true
//document.body.appendChild( renderer.domElement )
renderer2.toneMapping = THREE.ReinhardToneMapping;
renderer2.toneMappingExposure = 1; 
renderer2.shadowMap.enabled = true


//document.body.appendChild( renderer.domElement ); 
 camera.position.x = 4
camera.position.y = 8
camera.position.z = 15 
camera.lookAt(0,8,0)
//camera.position.set( 4, 5, 20)
//camera.lookAt( 0, 0, 0)

camera2.position.x = -7
camera2.position.y = 8
camera2.position.z = 15
camera2.lookAt(0,0,0)

//LIMITA A VISIBILIDADE INFERIOR
controls.maxPolarAngle = Math.PI/3
//LIMITA A VISIBILIDADE SUPERIOR
controls.minPolarAngle = Math.PI/3
//DESABILITAR ZOOM
//controls.enableZoom= false;

controls2.enabled= false;


 //set light
let luz = new THREE.PointLight( "white" )
let luzDesc = new THREE.PointLight( "white" )
//luz.position.set( 5, 6, 0 )
luz.position.set( 2, 6, 7)
//luz.castShadow = true
scene.add(luz)  

luzDesc.position.set( 2, 6, 7)
//luzDesc.castShadow = true
sceneDesc.add(luzDesc)  




loaderObj1.load(
 './ficheiro_gltf/TV_vewV7.gltf', 
 function ( gltf ) { 
    scene.add( gltf.scene )
    gltf.parser.getDependencies( 'material' ).then( ( materials ) => {
        //materials1=materials[2]
        console.log( materials )

        for(let i =0; i<materials.length;i++){
            switch(materials[i].name){
                case "wood1":
                    mat_MAD_1=materials[i]
                    break;
                case "wood2":
                    mat_MAD_2=materials[i]
                    break;
                case "wood3":
                    mat_MAD_3=materials[i]
                    break;
                case "wood4":
                    mat_MAD_4=materials[i]
                    break;
                case "metalic1":
                    mat_MET_1=materials[i]
                    break;
                case "metalic2":
                    mat_MET_2=materials[i]
                    break;
                case "metalic3":
                    mat_MET_3=materials[i]
                    break;
                case "mouseSelected":
                    mouseSelected=materials[i]
                    break;
            }
        }
    
    } )

/*     gltf.scene.children.forEach((child) => {
            child.children.forEach((c) => {
                if(c instanceof THREE.Mesh && c.material.metalness === 1) {
                    // Change texture of this particular mesh only, not the other ones.
                }
        }
    }), */
    scene.traverse(function (x){
        if(x.isMesh){
           // x.castShadow = true
            //x.receiveShadow = true
        
        }

        if(x.getObjectByName("Scene")!= null){
            model1 = x.getObjectByName("Scene")
            console.log(model1 )
            RACK= x.getObjectByName("rack")
        
            DOOR_LEFT_OUT = x.getObjectByName("doorLeft").children[0]
            DOOR_LEFT_IN = x.getObjectByName("doorLeft").children[2]

            DOOR_RIGHT_OUT = x.getObjectByName("doorLeft").children[1]
            DOOR_RIGHT_IN = x.getObjectByName("doorLeft").children[2]

            DRAWER_UP = x.getObjectByName("doorLeft").children[0]
            DRAWER_DOWN = x.getObjectByName("doorLeft").children[1]
        }
 

        setMedidas(model1)
        hideMedidas()

        clip1 = THREE.AnimationClip.findByName( gltf.animations, 'doorRightAction')
        clip2 = THREE.AnimationClip.findByName( gltf.animations, 'doorLeftAction.001' )
        clip3 = THREE.AnimationClip.findByName( gltf.animations, 'drawerUp' ) 
        //console.log(clip1)
        acao1 = misturador.clipAction( clip1)
        acao2 = misturador.clipAction( clip2 )
        acao3 = misturador.clipAction( clip3)
    })
 })

loaderObj2.load(
'./ficheiro_gltf/TV_vewV5.gltf', 
function ( gltf2 ) { 
    //scene.add( gltf.scene )
    sceneDesc.add(gltf2.scene)
    sceneDesc.traverse(function (y){
        if(y.isMesh){
            //y.castShadow = true
            //y.receiveShadow = true
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
    camera.lookAt(0,5,0)
    camera2.lookAt(0,2,0)
    renderer.render( scene, camera )
    renderer2.render( sceneDesc, camera2 )
    misturador.update( relogio.getDelta() )
}

function addLights(){
    //MEtal
    //let lightAmb = new THREE.AmbientLight( 0xffffff, 2.0); 
    let lightAmb = new THREE.AmbientLight( 0xffffff, 1.0); 
    let lightAmb1 = new THREE.AmbientLight( 0xffffff, 1.0); 
   scene.add( lightAmb );
    sceneDesc.add( lightAmb1 );

    let lightDir = new THREE.DirectionalLight( 0xffffff, 1 );
    let lightDir1 = new THREE.DirectionalLight( 0xE5E5DA, 0 );
    lightDir.position.set(2,8,10)
    lightDir1.position.set(2,8,10)

    let dlHelper,dlHelper1 = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000);
    //scene.add(dlHelper);
    scene.add( lightDir );
    sceneDesc.add( lightDir1 );

    
}

 function setMedidas(obj){
    //console.log("-----------")
    //console.log(obj.getObjectByName("rack"))
    
    MEDIDAS.push(obj.getObjectByName("Cube_Altura"))
    MEDIDAS.push(obj.getObjectByName("Cube_Canto"))
    MEDIDAS.push(obj.getObjectByName("Cube_Comprimento"))
    MEDIDAS.push(obj.getObjectByName("Cube_Largura"))
    MEDIDAS.push(obj.getObjectByName("txt_Altura"))
    MEDIDAS.push(obj.getObjectByName("txt_Canto"))
    MEDIDAS.push(obj.getObjectByName("txt_Comprimento"))
    MEDIDAS.push(obj.getObjectByName("txt_Largura"))

    
    //enableMedidas=1
  // console.log(MEDIDAS)
   
}

function hideMedidas(obj){
    for(let i=0;i<MEDIDAS.length;i++){
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
  /*   camera.position.x = -7
    camera.position.y = 8
    camera.position.z = 15
    camera.lookAt(0,2,0) */
    controls.enabled= false;
    

    
}

/*
----------------------------------------------------------------------------------------------------------------------------
TIPOS DE VISTA
----------------------------------------------------------------------------------------------------------------------------
*/

document.getElementById("crItem_Vist_port").addEventListener("click",function(){
    

    if(ANIM_GAVETA!=0){
        acao3.paused = false;
        acao3.setLoop(THREE.LoopOnce)
        acao3.timeScale = -1
        acao3.play()
        ANIM_GAVETA=0

        acao1.reset()
        acao2.reset()
        const myTimeout = setTimeout(
            ""
            , 3000);
    }

    // if(ANIM_PORTA == 1){
    //     acao1.reset()
    //     acao1.stop()
    //     acao2.reset()
    //     acao2.stop()

    //     ANIM_PORTA = 0
    // }
    //TO DO


    // acao3.setLoop(THREE.LoopOnce)
    // acao3.play()
    
    // acao3.clampWhenFinished = true

    acao1.setLoop(THREE.LoopOnce)
    acao2.setLoop(THREE.LoopOnce)
    acao1.timeScale = 0.5;
    acao2.timeScale = 0.5;
    acao1.clampWhenFinished = true
    acao2.clampWhenFinished = true

    acao1.play()
    acao2.play()

    // camera.position.x = -1
    // camera.position.y = 8
    // camera.position.z = 15
    ANIM_PORTA =1

})


document.getElementById("crItem_Vist_gav").addEventListener("click",function(){
    
    if(ANIM_PORTA!=0){
        acao1.paused = false;
        acao2.paused = false;
        acao1.timeScale = -0.5
        acao2.timeScale = -0.5
        acao1.play()
        acao2.play()
        ANIM_PORTA=0

        const myTimeout = setTimeout(
            ""
            , 3000);
        
    }

    acao3.setLoop(THREE.LoopOnce)
    acao3.timeScale = 0.5
    acao3.clampWhenFinished = true
    

    hideMedidas()
    acao3.play()
    ANIM_GAVETA=1
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

    acao1.reset()
    acao2.reset()
 
    acao3.reset()
 
})

/*
----------------------------------------------------------------------------------------------------------------------------
TEXTURAS
----------------------------------------------------------------------------------------------------------------------------
*/
//BTNS MADEIRA
let btn_mad_1 = document.getElementById("btn_mad_1")
let btn_mad_2 = document.getElementById("btn_mad_2")
let btn_mad_3 = document.getElementById("btn_mad_3")
let btn_mad_4 = document.getElementById("btn_mad_4")

//BTNS METAL
let btn_met_1 = document.getElementById("btn_met_1")
let btn_met_2 = document.getElementById("btn_met_2")
let btn_met_3 = document.getElementById("btn_met_3")

//IMAGEM DE CADA TEXTURA 
let tex_mad1 = './ficheiro_gltf/textures/madeira/text_0.png'
let tex_mad2 = './ficheiro_gltf/textures/madeira/text_1.jpg'
let tex_mad3 = './ficheiro_gltf/textures/madeira/text_3.png'
let tex_mad4 = './ficheiro_gltf/textures/madeira/text_5.png'
// let tex_port_madeira = './../../src/texture/madeira/text_porta.png'

let tex_metal1 = './ficheiro_gltf/textures/metal/Metal032_4K_Color.png'
let tex_metal2 = './ficheiro_gltf/textures/metal/Metal029_4K_Color.png'
let tex_metal3 = './ficheiro_gltf/textures/metal/Metal027_4K_Color.png'

let tex_port_metal = './src/texture/metal/MetalWalkway003_4K_Color.png'


//CARREGAR IMAGENS NO BTN CORRESPONDENTE
btn_mad_1.style.backgroundImage = "url(" + tex_mad1 + ")"
btn_mad_2.style.backgroundImage = "url(" + tex_mad2 + ")"
btn_mad_3.style.backgroundImage = "url(" + tex_mad3 + ")"
btn_mad_4.style.backgroundImage = "url(" + tex_mad4 + ")" 

btn_met_1.style.backgroundImage = "url(" + tex_metal1 + ")"
btn_met_2.style.backgroundImage = "url(" + tex_metal2 + ")"
btn_met_3.style.backgroundImage = "url(" + tex_metal3 + ")"



btn_mad_1.addEventListener('click',function(){

    console.log(mat_MAD_1)
    RACK.material= mat_MAD_1
    DOOR_LEFT_OUT.material= mat_MAD_1
    DOOR_RIGHT_OUT.material = mat_MAD_1
    DRAWER_UP.material= mat_MAD_1
    DRAWER_DOWN.material= mat_MAD_1
})

btn_mad_2.addEventListener('click',function(){
    RACK.material= mat_MAD_2
    DOOR_LEFT_OUT.material= mat_MAD_2
    DOOR_RIGHT_OUT.material = mat_MAD_2
    DRAWER_UP.material= mat_MAD_2
    DRAWER_DOWN.material= mat_MAD_2

})

btn_mad_3.addEventListener('click',function(){

    RACK.material= mat_MAD_3
    DOOR_LEFT_OUT.material= mat_MAD_3
    DOOR_RIGHT_OUT.material = mat_MAD_3
    DRAWER_UP.material= mat_MAD_3
    DRAWER_DOWN.material= mat_MAD_3

}) 

btn_mad_4.addEventListener('click',function(){
    RACK.material= mat_MAD_4
    DOOR_LEFT_OUT.material= mat_MAD_4
    DOOR_RIGHT_OUT.material = mat_MAD_4
    DRAWER_UP.material= mat_MAD_4
    DRAWER_DOWN.material= mat_MAD_4
})


btn_met_1.addEventListener('click',function(){
    RACK.material= mat_MET_1
    DOOR_LEFT_OUT.material= mat_MET_1
    DOOR_RIGHT_OUT.material = mat_MET_1
    DRAWER_UP.material= mat_MET_1
    DRAWER_DOWN.material= mat_MET_1
})

btn_met_2.addEventListener('click',function(){
    RACK.material=  mat_MET_2
    DOOR_LEFT_OUT.material= mat_MET_2
    DOOR_RIGHT_OUT.material = mat_MET_2
    DRAWER_UP.material= mat_MET_2
    DRAWER_DOWN.material= mat_MET_2
}) 

btn_met_3.addEventListener('click',function(){
    RACK.material= mat_MET_3
    DOOR_LEFT_OUT.material= mat_MET_3
    DOOR_RIGHT_OUT.material = mat_MET_3
    DRAWER_UP.material= mat_MET_3
    DRAWER_DOWN.material= mat_MET_3
})

   
/* function resetMaterials(){

    model1.children[0].material = material1
    model1.children[1].material = material2
    model1.children[2].material = material3
    
    
}
*/
let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster()
let oldMaterialOUT,oldMaterialIN

function onPointerDown(event){
    //calculate pointer position in normalized device coordinates
    //(-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth)* 2 - 1
    mouse.y = -(event.clientY / window.innerHeight)* 2 + 1

    raycaster.setFromCamera(mouse, camera)
    console.log(model1)

    let intersects = raycaster.intersectObjects(model1.children,true)

    //console.log(model1)
    console.log(intersects)

    if(intersects.length>0){

        //if(intersects[0].model1.parent.name=="doorLeft"){
       
            //console.log(intersects[0].model1.parent.children.length)
            
            //tamanho= intersects[0].model1.parent.children.length
            //console.log( intersects[0].model1.parent.children)
           // model12 = intersects[0].model1.parent.children

            //console.log(model12[1])
            //for(let i =0; i < intersects.length; i++){
                console.log(intersects[0].object.name)
                if(intersects[0].object.parent.name== "doorLeft" || intersects[0].object.parent.name== "doorRight"){
                    oldMaterialOUT= DOOR_LEFT_OUT.material
                    oldMaterialIN= DOOR_LEFT_IN.material
                    DOOR_LEFT_OUT.material = mouseSelected
                    DOOR_LEFT_IN.material = mouseSelected
                    DOOR_RIGHT_OUT.material = mouseSelected
                    DOOR_RIGHT_IN.material = mouseSelected

                    if(ANIM_GAVETA!=0){
                        acao3.paused = false;
                        acao3.setLoop(THREE.LoopOnce)
                        acao3.timeScale = -1
                        acao3.play()
                        ANIM_GAVETA=0
                
                        acao1.reset()
                        acao2.reset()
                        const myTimeout = setTimeout(
                            ""
                            , 3000);
                    }
                
                    // if(ANIM_PORTA == 1){
                    //     acao1.reset()
                    //     acao1.stop()
                    //     acao2.reset()
                    //     acao2.stop()
                
                    //     ANIM_PORTA = 0
                    // }
                    //TO DO
                
                
                    // acao3.setLoop(THREE.LoopOnce)
                    // acao3.play()
                    
                    // acao3.clampWhenFinished = true
                
                    acao1.setLoop(THREE.LoopOnce)
                    acao2.setLoop(THREE.LoopOnce)
                    acao1.timeScale = 0.5;
                    acao2.timeScale = 0.5;
                    acao1.clampWhenFinished = true
                    acao2.clampWhenFinished = true
                
                    acao1.play()
                    acao2.play()
                
                    // camera.position.x = -1
                    // camera.position.y = 8
                    // camera.position.z = 15
                    ANIM_PORTA =1
                }
                
                //console.log(intersects[i].model1.parent.children)
                //console.log(model1.children[i])
                //model1.children[i].material= new THREE.MeshStandardMaterial({color:"yellow"})
                //model12[i].model1.material = new THREE.Color("red")

            //}
      //  }

       
            
        
        
    }




}

  function onPointerUp(){
    DOOR_LEFT_OUT.material = oldMaterialOUT
    DOOR_LEFT_IN.material = oldMaterialIN
    DOOR_RIGHT_OUT.material = oldMaterialOUT
    DOOR_RIGHT_IN.material = oldMaterialIN
}  
 

 
//window.addEventListener('mousehover', onPointerDown)
window.addEventListener('pointerdown', onPointerDown) 
window.addEventListener('pointerup', onPointerUp,true) 