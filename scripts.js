const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var mouseX = 0;
var mouseY = 0;
var enemies = [];
var bolsa = './Resourses/bag.png';
var vaso = './Resourses/vaso rojo.png' ;
let botella = './Resourses/botella.png';
var bullets = [];
let imgEnemy = [bolsa, vaso, botella];


class character{
  constructor(x,y,width,height,img){ 
  this.width= width;
  this.height = height;
  this.image = new Image();
  this.image.src = './Resourses/itzama.png';
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
   ctx.drawImage(this.image,x, y,this.width,this.height)
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




class Enemy{
  constructor(img,y, width,height){
      this.x = canvas.width;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src = img;
  }

  draw(){
      if(frames % 10) this.x -= 5;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
const Itzama = new character (mouseX, mouseY, 50, 50,);
const Fondo = new Background ();


const update = ()=>{
  Itzama.draw(mouseX,mouseY)
  //
  //   ctx.beginPath();
  //   ctx.arc(mouseX, mouseY, 20, 0, Math.PI * 2, true);
  //   ctx.fillStyle = "pink"; // !
  //   ctx.fill();
  requestAnimationFrame(update);
}


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
start=()=>{
setInterval(function() {
  frames ++;
  Fondo.draw();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  generateEnemies();
  drawingEnemies();
  
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
    let width , height = 0;
    const pos = Math.floor(Math.random() * canvas.width * 0.5);
    let imgPosition = Math.floor(Math.random() * imgEnemy.length);
    if(imgPosition == 0){
      width = 30 
      height =50
    }
    if (imgPosition == 1) {
      width = 40
      height = 40
    }
    if (imgPosition == 2){
      width = 30
      height= 60
    }
    const enemy = new Enemy (imgEnemy[imgPosition],pos,width,height)
    enemies.push(enemy);
}
}
function drawingEnemies(){
  enemies.forEach(enemy => {
    if (enemy.x + enemy.width < 0) {
      enemies.splice( 0, 1);
    }
      enemy.draw();
      if(Itzama.collision(enemy)){
        console.log('byebye')
      }
  })
}





start()
update()

