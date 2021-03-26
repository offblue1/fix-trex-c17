var PLAY = 1;
var END = 0;
var gameState = PLAY



var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstacleGroup,obstacle1,obstacle2,obstacle3,obstacle4,
    obstacle5,obstacle6;
var gameOverImg;
var score;
var restartImg;
var jumpSound , checkPointSound, dieSound



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg  = loadImage("restart.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("hello" + 5);
  score = 0;
  trex.setCollider("circle",0,0,40);
  //trex.debug = true
  console.log("this is ",gameState);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {
  background("white");
  fill("black");
  text("Score: "+ score, 500,50);

  if(score>0 && score%100 === 0){
    
  }
  
  
  if (gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    ground.velocityX = -4;
    score = score + Math.round(frameCount/60);
    if(score>0 && score%100 === 0){
    checkPointSound.play();
  }
  
      
  if(keyDown("space") && trex.y>=100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  trex.collide(invisibleGround);
   //spawn the clouds
  spawnClouds();
  
  spawnObstacles();
 

  
  if(obstacleGroup.isTouching(trex)){
    gameState = END;
        dieSound.play()
      jumpSound.play();
  }
  }
 //spawn the clouds

  else if (gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    if(mousePressedOver(restart)){
      reset();
    }
  }

  
  
  
  
  
  
  trex.collide(invisibleGround)
  
  
  drawSprites();
  
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visiable = false;
  
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}

function spawnObstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40)
    obstacle.velocityX = -6
    
    var rand = Math.round(random(1,6));
    switch(rand){
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
        default:break;
    }
    obstacle.scale = 0.5;
obstacle.lifetime = 100
    obstacleGroup.add(obstacle);
  }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.6;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud)
    }
}

