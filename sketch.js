var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

localStorage["highestScore"];

var gameOver, gameOverImage
var restart, restartImage
var win, winImage

var PLAY = 1; 
var END = 0;
var WIN = 2;
var gameState = PLAY;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  winImage = loadImage("unnamed.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  gameOver = createSprite(275,75,20,20)
  gameOver.addImage("gameOver",gameOverImage)
  gameOver.scale = 0.5
  
  restart = createSprite(275,100,20,20)
  restart.addImage("restart",restartImage)
  restart.scale = 0.3

  win = createSprite(275,75,20,20)
  win.addImage("win",winImage)
  win.scale = 0.5
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  
  
  trex.velocityY = trex.velocityY + 0.6
  
  
  
  if(gameState === PLAY){
    win.visible = false
    gameOver.visible = false
    restart.visible = false
    restart.x = 600
    image(groundImage,0,-displayHeight*4,displayWidth,displayHeight*5)
    // ground.velocityX = -(4+3*score/100);
    obstaclesGroup.setVelocityXEach(-(4+3*score/100));

    
    if(keyDown("space")&&trex.y > 161) {
      trex.velocityY = -12;
    } 
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }  
    
    if(trex.isTouching(obstaclesGroup)){
      gameState = END
    }
        
    score = score + Math.round(getFrameRate()/60);
    spawnClouds();
    spawnObstacles();
  
  }
  else if(gameState === END){
    trex.changeImage("collided", trex_collided)
    gameOver.visible = true
    restart.visible = true
    restart.x = 275
    
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    
    if(mousePressedOver(restart)){
     reset(); 
    }  
  }
  
  if(score > 1000){
    win.visible = true
  
  restart.visible = true
  restart.x = 275
  restart.y = 170
  // score = 0
    
    ground.velocityX = 0
    obstaclesGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)

    
    if(mousePressedOver(restart)){
     reset(); 
    }  
  }

  
    
  trex.collide(invisibleGround);
  
  text("Score: "+ score, 450,50);
  
  
  
  drawSprites();
      text("High Score: "+localStorage["highestScore"],450,65)

}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  trex.changeAnimation("running",trex_running);
  
  if(localStorage["highestScore"] < score){
    localStorage["highestScore"] = score  

  }
  console.log(localStorage["highestScore"])
    score = 0


}