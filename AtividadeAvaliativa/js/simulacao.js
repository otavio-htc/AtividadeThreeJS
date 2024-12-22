import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

//Autores: Otavio Camargo e Viktor Blasck

//Criação da cena;

const cena = new THREE.Scene();

//Criação e posicionamento da camera

const camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight,
    0.1, 1000);

camera.position.z = 500;

//Criação do renderizador

const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight );
document.body.appendChild ( renderizador.domElement );

//Criação dos controles de rotação e aproximação

const controls = new OrbitControls( camera, renderizador.domElement );
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

//Criação da Luz Ambiente

const luzAmbiente = new THREE.AmbientLight( 0x404040, 1 );
cena.add(luzAmbiente);

//Criação da Luz Direcional

const luzDirecional = new THREE.DirectionalLight(0xff0000, 1 );
luzDirecional.position.set( 5, 5, 5 );
cena.add(luzDirecional);

//Carregamento da primeira árvore

const loaderPlant = new OBJLoader();

loaderPlant.load('/obj/plants1.obj', function(obj){

        obj.scale.set(0.2, 0.2, 0.2 );

        obj.position.set( 0, 0, 150 );

        cena.add(obj);

}, undefined, function(erro) {

    console.error("Erro ao carregar o modelo OBJ: ", erro );

});

//Carregamento da segunda árvore

const loaderPlant2 = new OBJLoader();

loaderPlant2.load('/obj/plants1.obj', function(obj){

        obj.scale.set(0.2, 0.2, 0.2 );

        obj.position.set( 100, 0, 75 );

        cena.add(obj);

}, undefined, function(erro) {

    console.error("Erro ao carregar o modelo OBJ: ", erro );

});

//Carregamento da terceira árvore

const loaderPlant3 = new OBJLoader();

loaderPlant3.load('/obj/plants1.obj', function(obj){

        obj.scale.set(0.2, 0.2, 0.2 );

        obj.position.set( -100 , 0, 50 );

        cena.add(obj);

}, undefined, function(erro) {

    console.error("Erro ao carregar o modelo OBJ: ", erro );

});

//Carregamento do primeiro objeto

const loaderDemon = new OBJLoader();

loaderDemon.load('/obj/demon1.obj', function(obj){

        obj.scale.set(3, -3, 3 );

        obj.position.set( -60 , 0, 10 );

        cena.add(obj);

}, undefined, function(erro) {

    console.error("Erro ao carregar o modelo OBJ: ", erro );

});

//Carregamento do segundo objeto

const loaderDemon2 = new OBJLoader();

loaderDemon2.load('/obj/demon2.obj', function(obj){

        obj.scale.set(0.8, -0.8, 0.8 );

        obj.rotation.x += 5;

        obj.position.set( 60 , 20, 50 );

        cena.add(obj);

}, undefined, function(erro) {

    console.error("Erro ao carregar o modelo OBJ: ", erro );

});

//Criação do terreno onde ficam os objetos

const larguraPlano = 600;
const alturaPlano = 600;
const espessuraPlano = 10;

const plano = new THREE.BoxGeometry( larguraPlano, espessuraPlano, alturaPlano );

//Carregamento da textura utilizada no terreno

const loader = new THREE.TextureLoader();
const textura = loader.load('/img/textura.png');

const material = new THREE.MeshStandardMaterial({
    map: textura,
    roughness: 0.5,
    metalness: 0.7,

});

//Junção do material com o plano e rotação para adequar ao modelo

const terreno = new THREE.Mesh( plano, material );
terreno.rotation.x = -Math.PI / 128;
terreno.rotation.y = - espessuraPlano / 2;
terreno.receiveShadow = true;
cena.add(terreno);

window.addEventListener( 'resize', ajustarTela, false );

// Ajustes de tela

function ajustarTela(){

    camera.aspect = window.innerWidth / window.innerHeight;

    renderizador.setSize( window.innerWidth, window.innerHeight);

    renderizador.render(cena, camera);

}

//Realizar as animações de controles de tela e renderização de camera

function animacao(){

    requestAnimationFrame ( animacao );

    controls.update();

    renderizador.render( cena, camera );

}

animacao();

