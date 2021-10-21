const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var base,base2,bridge,joinPoint,jointLink;
var stones = [];

var zombie1, backgroundImg,wood;
var zombie

var ground;

function preload(){

  zombie1 = loadImage("./assets/zombie.png");
  backgroundImg = loadImage("./assets/background.png")
  axe = loadImage("./assets/axe.png")

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  //base = new Base(50,500,100,200)
  //base2 = new Base(windowWidth/2+700,windowHeight/2+120,100,500)

  zombie = createSprite(width/2,height - 110)
  zombie.addImage("zombie",zombie1)
  zombie.scale = 0.2
  zombie.velocityX = 3



  ground = new Base(width/2,height/2+380,windowWidth,20)

  bridge = new Bridge(25,{x:0,y:290})

  joinPoint = new Base(windowWidth/2+600,windowHeight/2-70,20,20)

  Matter.Composite.add(bridge.body,joinPoint);
  jointLink = new Link(bridge,joinPoint);

  for(var i = 0; i <= 8; i++) {
    var x = random(width/2-200, width/2+300);
    var y = random(-10,140);
    var stone = new Stone(x,y,60,60);
    stones.push(stone)

  }

  breakButton = createButton("")
  breakButton.position(width-200,height/2-50);
  breakButton.class("breakbutton")
  breakButton.mouseClicked(handleButtonPress)

}


function draw() {

  background(backgroundImg);
  Engine.update(engine);
  //base.show()
  //base2.show()
  bridge.show()
  joinPoint.show()
  ground.show()
  
  if(zombie.position.x <= 300){
    zombie.velocityX = 10
  }
  if(zombie.position.x>=width-300){
    zombie.velocityX = -10
  }

  for (var stone of stones) { 
    stone.show();
    var pos=stone.body.position;
    var distance = dist(zombie.position.x,zombie.position.y,pos.x,pos.y)
    if(distance <=50 && jointLink===null){
      zombie.velocityX = 0
      Matter.Body.setVelocity(stone.body,{x:10,y:-10})

      collided = true;

    }
    if(zombie.velocityX === 0){
      fill("red")
      textSize(100)
      text("GAME OVER",windowWidth/2-300,windowHeight/2)
      textSize(50)
      text("You Crushed the Zombie",windowWidth/2-300,windowHeight/2+100)
    }
   }

   drawSprites()  
}

function handleButtonPress() {
  jointLink.detach();
  jointLink=null
   setTimeout(() => {
     bridge.break();
   }, 1500);
 }
 

