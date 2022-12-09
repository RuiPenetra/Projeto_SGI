let objAnimated = []
let objMedidas=[]
let objs_Decor=[]
let movel=[]
let ANIM_GAVETA = false
let ANIM_PORTA = false
let ANIM = false
let stsMedidas = false
let stsDecor = true
let acao1,acao2,acao3

let obj_Dir_Light
let obj_Amb_Light
let RACK,DOOR_LEFT_IN,DOOR_LEFT_OUT,DOOR_RIGHT_IN,DOOR_RIGHT_OUT,DRAWER_UP,DRAWER_DOWN

let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)


//fov, aspect, near, far
//#region Set Camera
const fov = 45; //Define Campo de Visão da camera
const near = 0.1; //Evita o Clipping
const far = 100; //Evita o Clipping
const camera = new THREE.PerspectiveCamera(fov, 700 / 500, near, far); //Cria a Camara
camera.position.set(-11.167, 7.397, 15.736)  //Define a Posição Inicial da Camara
camera.rotation.set(140, -0.5, -0.072)  //Define a Rotação Inicial da Camara
//#endregion

const meuCanvas = document.getElementById('meuCanvas')
const renderer = new THREE.WebGLRenderer({canvas: meuCanvas})


let controls = new THREE.OrbitControls(camera, renderer.domElement )
//controls.enableDamping = true; //Atribui um "Peso" às Rotações
//controls.autoRotate = true; //Liga a Auto-Rotação da Camara em Torno do Objeto
//controls.autoRotateSpeed = 0.5; //Atribui a velocidade 0.5 à Auto-Rotação da Camara em Torno do Objeto
controls.maxDistance = 30; //Maximo Afastamento do Objeto
controls.minDistance = 10; //Maximo Aproximação do Objeto
controls.zoomSpeed = 0.4; //Velocidade de Zoom
controls.target = new THREE.Vector3(0, 5, 0); //Desloca a Camara para a Posição Ideal à Vista de Decoração
controls.enablePan = false; //Desativa Movimentação da Camara pelo Utilizador

renderer.toneMapping = THREE.ACESFilmicToneMapping; //Define o Mapa de Tons
renderer.toneMappingExposure = 3; 
//renderer.shadowMap.enabled = true
renderer.setSize(700,500)

scene.background = new THREE.Color( 0xffffff )
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

new THREE.GLTFLoader().load(
    './ficheiro_gltf/TV_vewV9.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )

    scene.traverse( function(obj) {
        if (obj.isMesh) {
            //obj.castShadow = true
            //obj.receiveShadow = true			
        }

        console.log(obj)
        if (obj.type=="DirectionalLight") {
            //Se o Objeto for uma Decoração, vai para o Array decor
            obj_Dir_Light=obj
        }

        
        if (obj.type=="DirectionalLight") {
            //Se o Objeto for uma Decoração, vai para o Array decor
            obj_Amb_Light=obj
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

        if (obj.name.includes("rack") || obj.name.includes("doorLeft")|| obj.name.includes("doorRight")|| obj.name.includes("drawerUp")|| obj.name.includes("drawerDown")|| obj.name.includes("shelf")) {
            //Se o Objeto for uma Decoração, vai para o Array decor
            movel.push(obj)
        }

        if (obj.name.includes("Decor") || obj.name.includes("Tapete_mesa")) {
            //Se o Objeto for uma Decoração, vai para o Array decor
            //console.log(obj)
            
            objs_Decor.push(obj)
        }
        

        //console.log(objAnimated)
        //console.log(objMedidas)

        changeMaterial("wood1")
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

/*
----------------------------------------------------------------------------------------------------------------------------
TEXTURAS
----------------------------------------------------------------------------------------------------------------------------
*/

function changeMaterial(id){
    let count = 0
    while(movel.length>count){
        switch(id){
            case "wood1":
                paintMovel(matWood_1)
                obj_Dir_Light.intensity=1
                obj_Amb_Light.intensity=1
                break
            case "wood2":
                paintMovel(matWood_2)
                obj_Dir_Light.intensity=1
                obj_Amb_Light.intensity=0.2
                break
            case "wood3":
                paintMovel(matWood_3)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.2
                break
            case "wood4":
                paintMovel(matWood_4)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.4
                break
            case "metal1":
                paintMovel(matMetal_1)
                obj_Dir_Light.intensity=0
                obj_Amb_Light.intensity=0.5
                obj_Amb_Light.color= new THREE.Color(0x000000)
                break
            case "metal2":
                paintMovel(matMetal_2)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=0.5
                break
            case "metal3":
                paintMovel(matMetal_3)
                obj_Dir_Light.intensity=0.5
                obj_Amb_Light.intensity=1
                break
    
        }
        count++
    }
}

function paintMovel(mat){
    for(let i=0; i<movel.length;i++){
        if(movel[i].name=="doorLeft"){
            movel[i].children[0].material=mat
        }else if(movel[i].name=="doorRight" || movel[i].name=="drawerDown"){
            movel[i].children[1].material=mat
        }else if(movel[i].name=="drawerUp"){
            movel[i].children[0].material=mat
        }else{
            movel[i].material=mat
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
    ANIM=true
    if(stsMedidas!=false){
        hideMedidas()
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
    ANIM=true

    if(stsMedidas!=false){
        hideMedidas()
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
    //Vist_Normal_VAL=false
    ANIM=false
  /*   camera.position.z=7
    camera.position.y=8
    camera.position.x=-4
    camera.zoom=5 */
    //camera.lookat(0,4,0)

    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

    disableDecor()
    showMedidas()
})

document.getElementById("crItem_Vist_normal").addEventListener("click",function(){
  
    Vist_Normal_VAL=true
    enableDecor()
    hideMedidas()

    if(ANIM_GAVETA!=false){
        fecharGaveta()
    }
    if(ANIM_PORTA!=false){
        fecharPortas()
    }

 
})



   
let mouse = new THREE.Vector2()
let raycaster = new THREE.Raycaster()
let oldMaterialOUT,oldMaterialIN



document.getElementById("meuCanvas").onclick = function (event) {
event.preventDefault();
  let rect = event.target.getBoundingClientRect();
  mouse.x = ( ( event.clientX - rect.left ) / ( rect.right - rect.left ) ) * 2 - 1;
  mouse.y = - ( ( event.clientY - rect.top ) / ( rect.bottom - rect.top) ) * 2 + 1;


    //if(ANIM!=false){
        catchFirst()//identifica o Primeiro Objeto em 
    //}
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
    stsMedidas= false
   
}

function showMedidas(){
    for(let i=0;i<8;i++){
        objMedidas[i].visible= true
        objMedidas[i].material.color= new THREE.Color("red")
    }
    stsMedidas= true

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

/*
----------------------------------------------------------------------------------------------------------------------------
DECOR
----------------------------------------------------------------------------------------------------------------------------
*/

function disableDecor(){
    console.log(objs_Decor)
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
 
function animate() {
    requestAnimationFrame( animate )
    controls.update()
    renderer.render( scene, camera )
    misturador.update( relogio.getDelta() )
}

function addLights(){
    //MEtal
    const lightAmb = new THREE.AmbientLight( 0xffffff, 1)
    scene.add( lightAmb );
    const lightDir = new THREE.DirectionalLight( 0xffffff, 1 )
    lightDir.position.set(2,8,10)
    //const dlHelper,dlHelper1 = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000)
    //scene.add(dlHelper);
    scene.add( lightDir );
   // sceneDesc.add( lightDir1 );
}