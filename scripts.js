var i = 0;
var txt = '¡HOLA! Me llamo Itzamá y soy un anfibio endémico de México, me encuentro en peligro de extinción en mi país por falta de cuidado en mi entorno natural XOCHIMILCO y de ti depende que llegue sano y salvo a mi casa. ¿Me ayudarás a cruzar el lago sin morir en el intento?';
var speed = 70;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}





const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
let audio = new Audio();
audio.loop = true;
audio.src = './Resourses/jump and run - tropics.ogg';
let bulletSound = new Audio();
bulletSound.src='./Resourses/cartoon130.mp3'
let gameOverSound= new Audio();
gameOverSound.src='Resourses/gameover-game-over.mp3'
let priceSound = './Resourses/mario-kart-64.mp3'
let sadItzama = new Image();
sadItzama.src='./Resourses/died.png'
var enemies = [];
var bolsa = './Resourses/bag.png';
var vaso = './Resourses/vaso rojo.png' ;
let botella = './Resourses/botella.png';
var bullets = [];
let imgEnemy = [bolsa, vaso, botella];
const sprites = {
  swimming: "./Resourses/itzamas.png"
};
var score = 0

class character{
  constructor(x,y,width,height,health,img){ 
  this.health = 250;
  this.image = new Image();
  this.image.src = sprites.swimming;
  this.sx = 0;
  this.sy = 0;
  this.sw = 269;
  this.sh = 269;
  this.width = 120;
  this.height=150;
}
collision(item) {
  return (
    mouseX < item.x + item.width &&
    mouseX + this.width > item.x &&
    mouseY < item.y + item.height &&
    mouseY + this.height > item.y
  );
}


draw(x,y){
  if (this.sx > 1300) this.sx = 0;
   ctx.drawImage(
    this.image,
    this.sx,
    this.sy,
    this.sw,
    this.sh,
    x,
    y,
    this.width,
    this.height
   )
   if (frames % 6 === 0) this.sx += 268;
    }

    reset(){

    }
  
};

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./Resourses/BACKGROUND.png";
  }

  draw() {
    this.x--;
    if (this.x < -canvas.width) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.x + canvas.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.image = new Image();
    this.image.src = "./Resourses/BULLET.png";
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
    }
  draw() {
    this.x += 1;
    ctx.drawImage(this.image,this.x, this.y,this.width,this.height)
  }

}

class Enemy{
  constructor(img,y, width,height,damage){
      this.x = canvas.width;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = img;
      this.damage = damage;
  }

  draw(){
      if(frames % 19) this.x -= 5;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
class statusBar{
  constructor(x,y,width,height,radius,color){ 
  this.width= width;
  this.height = height;
  this.x = x;
  this.y =y;
  this.radius = radius
  this.color =color
  
  this.update = function(){
    
    ctx.fillRect(this.x, this.y,this.width,this.height,this.radius )
  }
}

draw(health){
    // ctx.moveTo(this.x , this.y);
    // ctx.lineTo(this.x + this.width - this.radius, this.y);
    // ctx.arcTo(this.x + this.width, this.y, this.x + this.width, this.y + this.radius, this.radius);
    // ctx.lineTo(this.x + this.width, this.y + this.height);
    // ctx.lineWidth = 5;
    // ctx.fillRect(this.x, this.y,this.width,this.height )
    ctx.fillStyle = this.color;
    if(health <= 0)health=0
    ctx.fillRect(this.x, this.y, health ,this.height,this.radius)
    }
  
};

const healthBar = new statusBar (700,20,250,50,10,'#FF4162');
const Itzama = new character (mouseX, mouseY);
const Fondo = new Background ();




//
const update = ()=>{
  Itzama.draw(mouseX,mouseY)
  //
  //   ctx.beginPath();
  //   ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2, true);
  //   ctx.fillStyle = "pink"; // !
  //   ctx.fill();
  requestAnimationFrame(update);
}

//
function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
    yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}  
var canvasPos = getPosition(canvas);

let frames = 0;

function start(){
  update()
interval = setInterval(function() {
  frames ++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  audio.play();
  Fondo.draw();
  generateEnemies();
  drawingEnemies();
  healthBar.draw(Itzama.health);
  drawingBullets();
  ctx.font = "bold 20px Verdana "
  ctx.fillText(`Score: ${score}`, 20,30,);
  if(frames % 120 === 0 ){
    printScore();
  }
  if (score >= 300){
    winner()
    
  }
  //enemy.draw(40,200);
}, 1000 / 100);
}

canvas.addEventListener("mousemove", setMousePosition, false);
 
function setMousePosition(e) {
  mouseX = e.clientX - canvasPos.x;
  mouseY = e.clientY - canvasPos.y;
}  

const generateEnemies = () =>{
  if(frames % 800 == 0 || frames % 60 == 0 || frames % 170 == 0){
    // creamos una instancia de Enemy y la agregamos aun arreglo
    let width , height ,damage= 0;
    const pos = Math.floor(Math.random() * canvas.width * 0.5);
    let imgPosition = Math.floor(Math.random() * imgEnemy.length);
    if(imgPosition == 0){
      width = 40 
      height = 60
      damage = 10
    }
    if (imgPosition == 1) {
      width = 50
      height = 50
      damage = 20
    }
    if (imgPosition == 2){
      width = 40
      height= 70
      damage = 30
    }
    const enemy = new Enemy (imgEnemy[imgPosition],pos,width,height,damage)
    enemies.push(enemy);
}
}
function drawingEnemies(){
  enemies.forEach((enemy,i) => {
    if (enemy.x + enemy.width < 0) {
      enemies.splice( i, 1);
    }
      enemy.draw();
      if(Itzama.collision(enemy)){
        Itzama.health= Itzama.health - enemy.damage 
        enemies.splice( i, 1);
        console.log('auch')
        if(Itzama.health <= 0){
          gameOver()
        }
      }
  })
}
//
function drawingBullets(){
  bullets.forEach((bullet,i)  => {
    bullet.draw()
    console.log(bullet)
    //if(bullet.collision(enemy)){
      enemies.forEach((enemy,j) => {
        if (bullet.collision(enemy)){
          enemies.splice(j,1)
          bullets.splice(i,1)
          score += 20
        }
      });
    //}
  })
}

addEventListener('click',(e)=>{
  if (e.button === 0){
    console.log('dipara')
    if (bullets.length <= 3){
      bullets.push(new Bullet(mouseX,mouseY))

    }
  }
  bulletSound.play();
})

 gameOver =()=> {
  audio.pause();
  gameOverSound.play();
  ctx.font = "bold 50px Verdana"
  ctx.fillText("Game Over", 300, 400);
  clearInterval(interval);
  canvas.removeEventListener("mousemove", setMousePosition, false);
 
}

 printScore = () =>{
    score++ 
    ctx.font = "bold 70px Verdana"
    ctx.fillText(`Score: ${score}`, 30,50,);
    
 }

 winner = () => {
  ctx.font = "bold 50px Verdana"
  ctx.fillText("ME SALVASTE", 300, 400);
  audio.pause();
  clearInterval(interval);
  canvas.removeEventListener("mousemove", setMousePosition, false);
 }

 reset =()=> {
  Itzama = 150;
  audio.currentTime = 0;
  enemies = [];
  score = 0;
  interval = undefined;

}

start()


