let objAnimated = []
let objMedidas=[]
let movel=[]
let ANIM_GAVETA = false
let ANIM_PORTA = false
let acao1,acao2,acao3
let matWood_1,matWood_2,matWood_3,matWood_4
let mat_MET_1,mat_MET_2,mat_MET_3
let mouseSelected
let RACK,DOOR_LEFT_IN,DOOR_LEFT_OUT,DOOR_RIGHT_IN,DOOR_RIGHT_OUT,DRAWER_UP,DRAWER_DOWN

let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)


//fov, aspect, near, far
//#region Set Camera
const fov = 45; //Define Campo de Visão da camera
const near = 0.1; //Evita o Clipping
const far = 100; //Evita o Clipping
const camera = new THREE.PerspectiveCamera(fov, 700 / 600, near, far); //Cria a Camara
camera.position.set(-11.167, 7.397, 15.736)  //Define a Posição Inicial da Camara
camera.rotation.set(140, -0.5, -0.072)  //Define a Rotação Inicial da Camara
//#endregion

const meuCanvas = document.getElementById('meuCanvas')
const renderer = new THREE.WebGLRenderer({canvas: meuCanvas})


let controls = new THREE.OrbitControls(camera, renderer.domElement )
controls.enableDamping = true; //Atribui um "Peso" às Rotações
controls.autoRotate = true; //Liga a Auto-Rotação da Camara em Torno do Objeto
controls.autoRotateSpeed = 0.5; //Atribui a velocidade 0.5 à Auto-Rotação da Camara em Torno do Objeto
controls.maxDistance = 30; //Maximo Afastamento do Objeto
controls.minDistance = 10; //Maximo Aproximação do Objeto
controls.zoomSpeed = 0.4; //Velocidade de Zoom
controls.target = new THREE.Vector3(0, 5, 0); //Desloca a Camara para a Posição Ideal à Vista de Decoração
controls.enablePan = false; //Desativa Movimentação da Camara pelo Utilizador

renderer.toneMapping = THREE.ACESFilmicToneMapping; //Define o Mapa de Tons
renderer.toneMappingExposure = 3; 
//renderer.shadowMap.enabled = true
renderer.setSize(700,500)

scene.background = new THREE.Color( 0xf0f0f0 )
const pmremGenerator = new THREE.PMREMGenerator( renderer )
scene.environment = pmremGenerator.fromScene( new THREE.RoomEnvironment(), 0.04 ).texture

camera.position.set( 4, 5, 20)

//LIMITA A VISIBILIDADE INFERIOR
controls.maxPolarAngle = Math.PI/2
//LIMITA A VISIBILIDADE SUPERIOR
controls.minPolarAngle = Math.PI/3

/*
-----------------------------------------
ANIMAÇÕES
-----------------------------------------
*/
let relogio = new THREE.Clock(scene)
let misturador = new THREE.AnimationMixer(scene)
/*---------------------------------------------*/


new THREE.GLTFLoader().load(
    './ficheiro_gltf/TV_vewV8.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )
     
    gltf.parser.getDependencies( 'material' ).then( ( materials ) => {
        //materials1=materials[2]
        console.log( materials )

        for(let i =0; i<materials.length;i++){
            switch(materials[i].name){
                case "wood1":
                    matWood_1=materials[i]
                    break;
                case "wood2":
                    matWood_2=materials[i]
                    break;
                case "wood3":
                    matWood_3=materials[i]
                    break;
                case "wood4":
                    matWood_4=materials[i]
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

    scene.traverse( function(obj) {
        if (obj.isMesh) {
            //obj.castShadow = true
            //obj.receiveShadow = true			
        }

        if (obj.name.includes("door") || obj.name.includes("drawer") || obj.name.includes("rack")) {
            //Se o Objeto for uma Decoração, vai para o Array decor
           objAnimated.push(obj)
        }

        if (obj.name.includes("Cube_") || obj.name.includes("txt_")) {
            //Se o Objeto for uma Decoração, vai para o Array decor
           objMedidas.push(obj)
        }

        if (obj.name.includes("rack") || obj.name.includes("doorLeft")|| obj.name.includes("doorRight")|| obj.name.includes("drawerUp")|| obj.name.includes("drawerDown")|| obj.name.includes("shelf")) {
            //Se o Objeto for uma Decoração, vai para o Array decor
            movel.push(obj)
        }

        //console.log(objAnimated)
        //console.log(objMedidas)

        hideMedidas()

        clip1 = THREE.AnimationClip.findByName( gltf.animations, 'doorRightAction')
        clip2 = THREE.AnimationClip.findByName( gltf.animations, 'doorLeftAction.001' )
        clip3 = THREE.AnimationClip.findByName( gltf.animations, 'drawerUp' ) 
        //console.log(clip1)
        acao1 = misturador.clipAction(clip1)
        acao2 = misturador.clipAction(clip2)
        acao3 = misturador.clipAction(clip3)

    })
}
)

addLights()
animate()

//#region Disables Auto-Rotate OnClick
//Desativa a Rotação Automática ao clicar
document.getElementById("meuCanvas").onclick = function stopAutoRotate() {
    controls.autoRotate = false;
    controls.update();
  };


function animate() {
    requestAnimationFrame( animate )
    controls.update();
    renderer.render( scene, camera )
    misturador.update( relogio.getDelta() )
}

function addLights(){
    //MEtal
    //let lightAmb = new THREE.AmbientLight( 0xffffff, 2.0); 
    const lightAmb = new THREE.AmbientLight( 0xffffff, 2.0); 
    //&const lightAmb1 = new THREE.AmbientLight( 0xffffff, 4.0); 
    scene.add( lightAmb );
    //  sceneDesc.add( lightAmb1 );

    const lightDir = new THREE.DirectionalLight( 0xffffff, 1 );
   // const lightDir1 = new THREE.DirectionalLight( 0xffffff, 1 );
    lightDir.position.set(2,8,10)
    //lightDir1.position.set(2,8,10)

    //const dlHelper,dlHelper1 = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000)
    //scene.add(dlHelper);
    scene.add( lightDir );
   // sceneDesc.add( lightDir1 );
}

function hideMedidas(){
    for(let i=0;i<objMedidas.length;i++){
        //console.log(objMedidas[i])
        objMedidas[i].visible= false
    }
    enableMedidas= false
   
}

function showMedidas(){
    for(let i=0;i<8;i++){
        objMedidas[i].visible= true
        objMedidas[i].material.color= new THREE.Color("red")
    }
    enableMedidas= true
}
/*
----------------------------------------------------------------------------------------------------------------------------
TIPOS DE VISTA
----------------------------------------------------------------------------------------------------------------------------
*/

document.getElementById("crItem_Vist_port").addEventListener("click",function(){
    Vist_Normal_VAL=false
    hideobjMedidas()
    if(ANIM_GAVETA==true){
        fecharGaveta()
    }
    if(ANIM_PORTA!=true){
        abrirPortas()
    }else{
        fecharPortas()
    }
})


document.getElementById("crItem_Vist_gav").addEventListener("click",function(){
    Vist_Normal_VAL=false
    hideobjMedidas()

    if(ANIM_PORTA==true){
        fecharPortas()   
    }
    if(ANIM_GAVETA!=true){
        abrirGaveta()
    }else{
        fecharGaveta()
    }
   
 })
 

document.getElementById("crItem_Vist_scale").addEventListener("click",function(){
    Vist_Normal_VAL=false

    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

    showMedidas()
})

document.getElementById("crItem_Vist_normal").addEventListener("click",function(){
  
    Vist_Normal_VAL=true
    hideobjMedidas()

    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

    //verificar se a porta ou a gaveta estam abertas 


    /* camera.position.x = -7
    camera.position.y = 8
    camera.position.z = 15
    controls.enabled= true;

    acao1.reset()
    acao2.reset()
 
    acao3.reset() */
 
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


function changeMaterial(id){

    let count = 0
    while(movel.length>count){
        switch(id){
            case "wood1":
                paintMovel(matWood_1)
                break
            case "wood2":
                paintMovel(matWood_2)
                break;
            case "wood3":
                paintMovel(matWood_3)
                break;
    
        }
        count++
    }
}

function paintMovel(mat){

    console.log(movel)
    for(let i=0; i<movel.length;i++){
        if(movel[i].name=="doorLeft" || movel[i].name=="doorRight"){
            
            i++;
        }
        movel[i].material=mat
    }

}

/* btn_mad_1.addEventListener('click',function(){

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
}) */

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

   
let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster()
let oldMaterialOUT,oldMaterialIN



window.onclick = function (event) {
event.preventDefault();
  let rect = event.target.getBoundingClientRect();
  mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;


    //invocar raycaster 
    //if(Vist_Normal_VAL!=false){
        catchFirst()//identifica o Primeiro Objeto em
    //}
    

 
    //window.innerHeight window.innerWidth
}

function catchFirst(){
    //calculate pointer position in normalized device coordinates
    //(-1 to +1) for both components

    raycaster.setFromCamera(mouse, camera)

    let intersectedArray  = raycaster.intersectObjects(objAnimated,true)

    console.log(objAnimated)
    console.log(intersectedArray )

    if(intersectedArray.length>0){

        let intersectedObject = intersectedArray[0].object

        
        if(intersectedObject.parent.name.includes("doorRight")){

        /*       oldMaterialOUT= DOOR_LEFT_OUT.material
            oldMaterialIN= DOOR_LEFT_IN.material
            DOOR_LEFT_OUT.material = mouseSelected
            DOOR_LEFT_IN.material = mouseSelected
            DOOR_RIGHT_OUT.material = mouseSelected
            DOOR_RIGHT_IN.material = mouseSelected */
            if(ANIM_PORTA!=true){
                abrirPortas()
                //setTimeout(function(){ fecharPortas()}, 5000);
            }else{
                fecharPortas()
            }
                    
        }

        console.log(intersectedObject.parent)

        if(intersectedObject.parent.name.includes("drawerUp")){
            if(ANIM_GAVETA!=true){
                abrirGaveta()
                setTimeout(function(){ fecharGaveta()}, 5000)
            }else{
                fecharGaveta()
            }
        }   
    }
}


function abrirPortas(){
    acao1.reset()
    acao2.reset()
    acao1.setLoop(THREE.LoopOnce)
    acao2.setLoop(THREE.LoopOnce)
    acao1.timeScale = 0.5;
    acao2.timeScale = 0.5;
    acao1.clampWhenFinished = true
    acao2.clampWhenFinished = true

    acao1.play()
    acao2.play()

    ANIM_PORTA =true
}

function fecharPortas(){
    console.log("entrei")

    acao1.paused = false;
    acao2.paused = false;
    acao1.timeScale = -0.5
    acao2.timeScale = -0.5
    acao1.play()
    acao2.play()
    ANIM_PORTA=false
}

function abrirGaveta(){
    acao3.reset()
    acao3.setLoop(THREE.LoopOnce)
    acao3.timeScale = 0.5
    acao3.clampWhenFinished = true
    

    //hideobjMedidas()
    acao3.play()
    ANIM_GAVETA=true
}

function fecharGaveta(){

    acao3.paused = false;
    acao3.timeScale = -0.5
    acao3.setLoop(THREE.LoopOnce)
    acao3.clampWhenFinished = true
    //hideobjMedidas()
    acao3.play()
    ANIM_GAVETA=false
}
 
