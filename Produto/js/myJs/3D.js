let objAnimated = []
let objMedidas=[]
let descMedidas=[]
let objs_Decor=[]
let movel=[]
let movelDesc=[]
let ANIM_GAVETA = false
let ANIM_PORTA = false
let ANIM = true
let stsMedidas = false
let stsDecor = true
let acao1,acao2,acao3
let OBJ1_LOADING=0
let OBJ2_LOADING=2
let MOVE =true
let LOADING=0
let progress=0


let obj_Dir_Light
let obj_Dir_LightDESC
let obj_Amb_Light
let obj_Amb_LightDESC


let scene = new THREE.Scene()
let sceneDesc = new THREE.Scene()
//scene.background = new THREE.Color(0xE5E5DA)


//fov, aspect, near, far
//#region Set Camera
const fov = 45; //Define Campo de Visão da camera
const near = 0.1; //Evita o Clipping
const far = 100; //Evita o Clipping
const camera = new THREE.PerspectiveCamera(fov, 700 / 500, near, far); //Cria a Camara
camera.position.set(-11.167, 7.397, 15.736)  //Define a Posição Inicial da Camara
camera.rotation.set(140, -0.5, -0.072)  //Define a Rotação Inicial da Camara

const cameraDesc = new THREE.PerspectiveCamera(fov, 700 / 500, near, far); //Cria a Camara
cameraDesc.position.set(-11.167, 7.397, 15.736)  //Define a Posição Inicial da Camara
cameraDesc.rotation.set(140, -0.5, -0.072)  //Define a Rotação Inicial da Camara
//#endregion

const meuCanvas = document.getElementById('meuCanvas')
const canvasDesc= document.getElementById('canvasDesc')

const renderer = new THREE.WebGLRenderer({canvas: meuCanvas,antialias: true })
const rendererDesc = new THREE.WebGLRenderer({canvas: canvasDesc,antialias: true })


let controls = new THREE.OrbitControls(camera, renderer.domElement )
//let controlsDesc = new THREE.OrbitControls(cameraDesc, rendererDesc.domElement )
controls.enableDamping = true; //Atribui um "Peso" às Rotações
//controls.autoRotate = true; //Liga a Auto-Rotação da Camara em Torno do Objeto
//controls.autoRotateSpeed = 0.5; //Atribui a velocidade 0.5 à Auto-Rotação da Camara em Torno do Objeto
controls.maxDistance = 30; //Maximo Afastamento do Objeto
controls.minDistance = 10; //Maximo Aproximação do Objeto
controls.zoomSpeed = 0.4; //Velocidade de Zoom
controls.target = new THREE.Vector3(0, 5, 0); //Desloca a Camara para a Posição Ideal à Vista de Decoração
controls.enablePan = false; //Desativa Movimentação da Camara pelo Utilizador

//controlsDesc.enabled = false;
let controls2 = new THREE.OrbitControls(cameraDesc, rendererDesc.domElement )
controls2.target = new THREE.Vector3(0,5,0); //Desloca a Camara para a Posição Ideal à Vista de Decoração
controls2.enableZoom = false
controls2.enableRotate =false

renderer.toneMapping = THREE.ACESFilmicToneMapping; //Define o Mapa de Tons
renderer.toneMappingExposure = 3; 
//renderer.shadowMap.enabled = true
renderer.setSize(700,500)

rendererDesc.toneMapping = THREE.ACESFilmicToneMapping; //Define o Mapa de Tons
rendererDesc.toneMappingExposure = 3; 
//renderer.shadowMap.enabled = true
rendererDesc.setSize(700,500)

scene.background = new THREE.Color( 0xffffff )
const pmremGenerator = new THREE.PMREMGenerator( renderer )
scene.environment = pmremGenerator.fromScene( new THREE.RoomEnvironment(), 0.04 ).texture

sceneDesc.background = new THREE.Color( 0xffffff )
const pmremGeneratorDesc = new THREE.PMREMGenerator( rendererDesc )
sceneDesc.environment = pmremGeneratorDesc.fromScene( new THREE.RoomEnvironment(), 0.04 ).texture

camera.position.set( 4, 5, 20)
cameraDesc.position.set( -13, 9, 15)
//cameraDesc.position.set( -13, 9, 15)

//LIMITA A VISIBILIDADE INFERIOR
controls.maxPolarAngle = Math.PI/2
//LIMITA A VISIBILIDADE SUPERIOR
controls.minPolarAngle = Math.PI/3


let lightAmb = new THREE.AmbientLight( 0xffffff, 1)
let lightDir = new THREE.DirectionalLight( 0xffffff, 1 )
lightDir.position.set(2,8,10)
scene.add( lightAmb );
scene.add( lightDir )

let lightAmb2 = new THREE.AmbientLight( 0xffffff, 2)
let lightDir2 = new THREE.DirectionalLight( 0xffffff, 1 )
lightDir2.position.set(2,8,10) 
sceneDesc.add( lightDir2 )
sceneDesc.add( lightAmb2 )



/*
-----------------------------------------
ANIMAÇÕES
-----------------------------------------
*/
let relogio = new THREE.Clock(scene)
let misturador = new THREE.AnimationMixer(scene)

/*---------------------------------------------*/

let glassBlack 

const glassWhite = new THREE.MeshPhysicalMaterial({
    metalness: 1.0,
    roughness: 0.2,
    transparent: true,
    opacity: 0.5,
    transmission: 0.1,
    side: THREE.FrontSide,
    clearcoat: 1.0,
    clearcoatRoughness: 0.39,
  });

const matWood_1 = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/madeira/text_1.png" ),
    side: THREE.DoubleSide,
    shininess: 49.1,
    reflectivity:1,
})

const matWood_2 = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/madeira/text_2.jpg" ),
    side: THREE.DoubleSide,
    shininess: 30,
    reflectivity:1,
})

const matWood_3 = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/madeira/text_3.png" ),
    side: THREE.DoubleSide,
    shininess: 1,
    specular: new THREE.Color(0x000000),
    reflectivity:0,
})

const matWood_4 = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/madeira/text_4.png" ),
    side: THREE.DoubleSide,
    shininess: 1,
    specular: new THREE.Color(0x000000),
    reflectivity:0,
})

const matMetal_1 = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/metal/metal_1.png" ),
    side: THREE.DoubleSide,
    metalness: 0.2,
    roughness:0,
    reflectivity:0,
})

const matMetal_2 = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/metal/metal_2.png" ),
    side: THREE.DoubleSide,
    metalness: 0.364,
    roughness:0,
    reflectivity:1,
})

const matMetal_3 = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/metal/metal_3.png" ),
    side: THREE.DoubleSide,
    metalness: 0.364,
    roughness:0,
    reflectivity:1,
})


/* let texture =new THREE.TextureLoader().load('./ficheiro_gltf/textures/decoracoes/moldura/moldura_interior2.jpg')
texture.center = new THREE.Vector2(0.5, 0.5);
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = - 1;

const imgMod = new THREE.MeshBasicMaterial({
    map: texture,
  }); */

/* const matPano = new THREE.MeshPhysicalMaterial({
    map: new THREE.TextureLoader().load( "./ficheiro_gltf/textures/Textura pano mesa/Fabric065_1K_Color.jpg" ),
    side: THREE.DoubleSide,
    metalness: 0.364,
    roughness:0,
    reflectivity:1,
}) */
let Progress = document.getElementById("Progress")
let progBar = document.getElementById("progressBar")

//-------------------------------------------------
//LOAD OBJ_1
//-------------------------------------------------
const manager_OB1 = new THREE.LoadingManager();

manager_OB1.onStart = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    document.body.style.overflow="hidden"
};

manager_OB1.onLoad = function ( ) {

    OBJ1_LOADING=1
	console.log("Loading OBJ_1 completed")
    OBJ2_LOADING=0
    carregar_OB2()

};

manager_OB1.onProgress = function ( url, itemsLoaded, itemsTotal ) {

	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    let value = Math.round((itemsLoaded/itemsTotal *100)/2)
    //if(value<50){
    console.log("==> OBJ [1] " + value + "%")
    progressBar(value)
    //}
}

manager_OB1.onError = function ( url ) {

	console.log( 'There was an error loading ' + url )
}

const loader_OB1 = new THREE.GLTFLoader( manager_OB1 );
loader_OB1.load( './ficheiro_gltf/TV_vewV10.gltf', function ( gltf ) {
    scene.add( gltf.scene )
    //sceneDesc.add( gltf.scene )
    scene.traverse( function(obj) {
        if (obj.isMesh) {
            //obj.castShadow = true
            //obj.receiveShadow = true			
        }
                //console.log(obj)
            if (obj.type=="DirectionalLight") {
                //Se o Objeto for DirectionalLight
                obj_Dir_Light=obj
                console.log(obj_Dir_Light)
            }

            
            if (obj.type=="AmbientLight") {
                //Se o Objeto for AmbientLight
                obj_Amb_Light=obj
            }
            

            if (obj.name.includes("door") || obj.name.includes("drawer") || obj.name.includes("rack")) {
                //Todos os objetos que se pretende animar
                objAnimated.push(obj)
            }

            if (obj.name.includes("Cube_") || obj.name.includes("txt_")) {
                //Se o Objeto for uma Decoração, vai para o Array decor
                obj.visible=false
                objMedidas.push(obj)
                console.log("aqui")
            }

            if (obj.name.includes("rack") || obj.name.includes("doorLeft")|| obj.name.includes("doorRight")|| obj.name.includes("drawerUp")|| obj.name.includes("drawerDown")|| obj.name.includes("shelf")) {
                //Se o Objeto for uma Decoração, vai para o Array decor
                movel.push(obj)
            }

            if (obj.name.includes("Decor") || obj.name.includes("Tapete_mesa")) {
                //Se o Objeto for uma Decoração, vai para o Array decor
                // if(obj.name.includes("DecorOut_moldura")){
                    //  obj.children[2].material= imgMod
                // }

                objs_Decor.push(obj)
            }


            if (obj.name.includes("doorLeft")){
                //Recolher o material da parte interior da porta
                glassBlack=obj.children[2].material

            }


        clip1 = THREE.AnimationClip.findByName( gltf.animations, 'doorRightAction')
        clip2 = THREE.AnimationClip.findByName( gltf.animations, 'doorLeftAction.001' )
        clip3 = THREE.AnimationClip.findByName( gltf.animations, 'drawerUp' ) 
        //console.log(clip1)
        acao1 = misturador.clipAction(clip1)
        acao2 = misturador.clipAction(clip2)
        acao3 = misturador.clipAction(clip3)

    })
})

//-------------------------------------------------
//LOAD OBJ_1
//-------------------------------------------------
function carregar_OB2(){
    const manager_OB2 = new THREE.LoadingManager();

    manager_OB2.onStart = function ( url, itemsLoaded, itemsTotal ) {

        console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
    };

    manager_OB2.onLoad = function ( ) {

        
        console.log("Loading OBJ_2 completed")
        //Desabilitar o progress OBJ2
        OBJ2_LOADING=1
        //Carregar o resto que falta e esconder
        changeMaterial('MOVEL',"wood1")
        document.body.style.overflow="visible"
        document.querySelector(".load").style.display="none"
        //changeMaterial('MOVEL',"wood1")
       // document.body.style.overflow="visible"
        //document.querySelector(".load").style.display="none"
    };

    manager_OB2.onProgress = function ( url, itemsLoaded, itemsTotal ) {

        console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        let value = Math.round((itemsLoaded/itemsTotal *100)/2)
       // if(value<50){
           console.log("==> OBJ [2] " + value + "%") 
           console.log("==>OBJ1_LOADING" + OBJ1_LOADING) 
        progressBar(value)
        
       // }
    }

    manager_OB2.onError = function ( url ) {

        console.log( 'There was an error loading ' + url )
    }

    const loader_OB2 = new THREE.GLTFLoader( manager_OB2 );
    loader_OB2.load( './ficheiro_gltf/TV_vewV10.gltf', function ( gltf ) {
        sceneDesc.add( gltf.scene )
        sceneDesc.traverse( function(obj2) {
            //Se o Objeto for Cube_ ou txt_, vai para o Array decor
            if (obj2.name.includes("Cube_") || obj2.name.includes("txt_")) {
                obj2.visible=false
            }

            if (obj2.name.includes("Decor") || obj2.name.includes("Tapete_mesa")) {
                //Se o Objeto for uma Decoração, vai para o Array decor
                //console.log(obj)    
                obj2.visible=false
            }
        })
    })


}


 function progressBar(value){

    //Loading OBJ1
    if(OBJ1_LOADING==0){
        progress = value
        progBar.style.width = progress + "%"
        //Progress.innerHTML=progress+ "%"
    }


    //Loading OBJ2
    if(OBJ2_LOADING==0){
        progress = parseInt(progress + value) 
        console.log("load2"+progress)
        progBar.style.width = progress + "%"
       // Progress.innerHTML=progress+ "%"
    }
}

/*
----------------------------------------------------------------------------------------------------------------------------
TEXTURAS
----------------------------------------------------------------------------------------------------------------------------
*/

function changeMaterial(FLAG,id){

    //MUDAR O MATERIAL DO MOVEL COMPLETO
    if(FLAG=="MOVEL"){
        switch(id){
            case "wood1":
                paintMovel(FLAG,matWood_1)
                //paintMovelDesc(matWood_1)
                //console.log(obj_Dir_Light)
                obj_Dir_Light.intensity=1
                obj_Amb_Light.intensity=1
                //obj_Dir_LightDESC.intensity=1
                //obj_Amb_LightDESC.intensity=1
    
                break
            case "wood2":
                paintMovel(FLAG,matWood_2)
                //paintMovelDesc(matWood_2)
                obj_Dir_Light.intensity=1
                obj_Amb_Light.intensity=0.2
                //obj_Dir_LightDESC.intensity=1
                //obj_Amb_LightDESC.intensity=0.2
                break
            case "wood3":
                paintMovel(FLAG,matWood_3)
                //paintMovelDesc(matWood_3)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.2
                //obj_Dir_LightDESC.intensity=0.5
               // obj_Amb_LightDESC.intensity=0.2
                break
            case "wood4":
                paintMovel(FLAG,matWood_4)
               // paintMovelDesc(matWood_4)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.4
               // obj_Dir_LightDESC.intensity=0.5
                //obj_Amb_LightDESC.intensity=0.4
                break
            case "metal1":
                paintMovel(FLAG,matMetal_1)
                //paintMovelDesc(matMetal_1)
                obj_Dir_Light.intensity=0
                obj_Amb_Light.intensity=0.5
                //obj_Amb_Light.color= new THREE.Color(0x000000)
                //obj_Dir_LightDESC.intensity=0
                //obj_Amb_LightDESC.intensity=0.5
                //obj_Amb_LightDESC.color= new THREE.Color(0x000000)
                break
            case "metal2":
                paintMovel(FLAG,matMetal_2)
                //paintMovelDesc(matMetal_2)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.5
                //obj_Dir_LightDESC.intensity=0.5
                //obj_Amb_LightDESC.intensity=0.5
                break
            case "metal3":
                paintMovel(FLAG,matMetal_3)
                //paintMovelDesc(matMetal_3)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=1
                //obj_Dir_LightDESC.intensity=0.5
                //obj_Amb_LightDESC.intensity=1
                break
    
        }
    }

    if(FLAG=="DOOR"){
        switch(id){
            case "glassWhite":
                paintMovel(FLAG,glassWhite)
                break
            case "glassBlack":
                paintMovel(FLAG,glassBlack)
                break
        }
    }


    
}


function paintMovel(FLAG,mat){
    for(let i=0; i<movel.length;i++){

        if(FLAG=="MOVEL"){
            if(movel[i].name=="doorLeft" ||movel[i].name=="drawerUp"||movel[i].name=="drawerUp"){
                movel[i].children[0].material=mat
            }else if(movel[i].name=="doorRight" || movel[i].name=="drawerDown"){
                movel[i].children[1].material=mat
            }else{
                movel[i].material=mat
            } 
        }else{
            if(movel[i].name=="doorLeft"){
                movel[i].children[2].material=mat
            }else if(movel[i].name=="doorRight" ){
                movel[i].children[2].material=mat
            }
        }      
    }

}


addLights()
animate()

//#region Disables Auto-Rotate OnClick
//Desativa a Rotação Automática ao clicar
// document.getElementById("meuCanvas").onclick = function stopAutoRotate() {
//     controls.autoRotate = false;
//     controls.update();
//   };


/*
----------------------------------------------------------------------------------------------------------------------------
TIPOS DE VISTA
----------------------------------------------------------------------------------------------------------------------------
*/

document.getElementById("crItem_Vist_port").addEventListener("click",function(){

    if(MOVE != true){
        restoreMove()
    }

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

    if(MOVE != true){
        restoreMove()
    }

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

    camera.position.set( -13, 9, 15)

    if(MOVE != false){
        controls.enableZoom = false
        controls.enableRotate = false
        MOVE = false
    }

    //Desativar inputs por parte do utilizador (sem animações)
    ANIM=false

    //Verificar se a gaveta se enquantra aberta, caso esteja, fecha a gaveta
    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    
    //Verificar se as portas se enquantram abertas, caso esteja, fecha a gaveta
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

    //desativar decorações caso estejam visiveis
    disableDecor()
    
    //mostrar medidas
    showMedidas()
})

document.getElementById("crItem_Vist_normal").addEventListener("click",function(){
  
    if(MOVE != true){
        restoreMove()
    }

    enableDecor()
    
    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

 
})

/*
----------------------------------------------------------------------------------------------------------------------------
INTERAÇÃO COM O MOVEL
----------------------------------------------------------------------------------------------------------------------------
*/
   
let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster()


document.getElementById("meuCanvas").onclick = function (event) {
event.preventDefault();
  let rect = event.target.getBoundingClientRect();
  mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;


    if(ANIM!=false){
        catchFirst()//identifica o Primeiro Objeto em 
    }
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

            if(ANIM_PORTA!=true && ANIM_GAVETA!=true){
                abrirPortas()
            }else{
                fecharPortas()
            }
                    
        }

        if(intersectedObject.parent.name.includes("drawerUp")){
            if(ANIM_GAVETA!=true && ANIM_PORTA!=true){
                abrirGaveta()
                setTimeout(function(){ fecharGaveta()}, 5000)
            }else{
                fecharGaveta()
            }
        }   
    }
}


/*
----------------------------------------------------------------------------------------------------------------------------
MEDIDAS
----------------------------------------------------------------------------------------------------------------------------
*/
function hideMedidas(){
    for(let i=0;i<objMedidas.length;i++){
        //console.log(objMedidas[i])
        objMedidas[i].visible= false
    }
    //console.log(objMedidas)
    stsMedidas= false

  
}

function showMedidas(){

    for(let i=0;i<8;i++){
        objMedidas[i].visible= true
        objMedidas[i].material.color= new THREE.Color("black")
    }
    stsMedidas= true

}




/* function moveBlock(){


    if(MOVE != true){
        controls.enableZoom = false
        controls.enableRotate = false
        MOVE = true
    }else{
        controls.enableZoom = true
        controls.enableRotate = true
        MOVE= false
    }
} */
/*
----------------------------------------------------------------------------------------------------------------------------
DECOR
----------------------------------------------------------------------------------------------------------------------------
*/

function disableDecor(){
    
    console.log("aquiii no DISdecor")
    for(let j=0;j<objs_Decor.length;j++){
        objs_Decor[j].visible=false
    }
    stsDecor=false
    document.getElementById("disableOPT").style.display="flex"
}

function enableDecor(){
    for(let k =0; k<objs_Decor.length;k++){
        objs_Decor[k].visible=true
    }
    document.getElementById("disableOPT").style.display="none"
    stsDecor=true
}

document.getElementById("btn_decor").addEventListener("click",function(){

    if(stsMedidas!=true){
        if(stsDecor!=false){
            disableDecor()
            document.getElementById("disableOPT").style.display="flex"
        }else{
            enableDecor()
            document.getElementById("disableOPT").style.display="none"
        }
    }

})
/*
----------------------------------------------------------------------------------------------------------------------------
ANIMAÇÕES
----------------------------------------------------------------------------------------------------------------------------
*/


function restoreMove(){

    if(stsMedidas!=false){
        hideMedidas()
    }

    controls.enableZoom = true
    controls.enableRotate = true
    controls.target = new THREE.Vector3(0, 5, 0); //Desloca a Camara para a Posição Ideal à Vista de Decoração
    camera.position.set( 4, 5, 20)
    MOVE = true
    ANIM = true

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
    ANIM_PORTA=FALSE
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
 
function animate() {
    requestAnimationFrame( animate )
    controls.update()
    renderer.render( scene, camera )
    rendererDesc.render( sceneDesc, cameraDesc )
    misturador.update( relogio.getDelta() )
}

function addLights(){
    //MEtal
/*     let lightAmb = new THREE.AmbientLight( 0xffffff, 1)
    let lightDir = new THREE.DirectionalLight( 0xffffff, 1 )
    lightDir.position.set(2,8,10)
    scene.add( lightAmb );
    scene.add( lightDir )

    let lightAmb2 = new THREE.AmbientLight( 0xffffff, 2)
    let lightDir2 = new THREE.DirectionalLight( 0xffffff, 1 )
    lightDir2.position.set(2,8,10) 
    sceneDesc.add( lightDir2 )
    sceneDesc.add( lightAmb2 ) */
    //const dlHelper,dlHelper1 = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000)
    //scene.add(dlHelper);
  
   // sceneDesc.add( lightDir1 );
}