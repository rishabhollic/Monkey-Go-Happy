var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstaclesGroup;
var score = 0;
var bananasEaten = 0;
function preload()
{
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() 
{
  createCanvas(600, 300);
  
  monkey = createSprite(50,280,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(500,290,1500,20);
  ground.velocityX= -4
  ground.x = ground.width /2;
  ground.log=(ground.x);
  
  
  invisibleGround = createSprite(200,290,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
  foodGroup = createGroup();
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false;
  
  
  score = 0;
  
}

function draw() 
{
  
  background("lightgreen");
  //displaying score
  textSize(15);
  fill("black");
  text("Survival Time : "+ score, 450,50);
  textSize(15);
  fill("black");
  text("Total Health :"+ bananasEaten, 250, 50);
  
  
  if(gameState === PLAY)
  {
    //move the ground
    ground.velocityX = -(2+score/100);
    //scoring
    score = score + Math.round(getFrameRate()/60);
    if (ground.x < 0)
    {
      ground.x = ground.width/10;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y>=120) 
    {
        monkey.velocityY = -10;
      
    }
      
    //add gravity
    monkey.velocityY =monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if (foodGroup.isTouching(monkey))
    {
      foodGroup.destroyEach();
      bananasEaten = bananasEaten + 2;
    }
    if(obstaclesGroup.isTouching(monkey))
    {
        gameState = END;
    }
  }
   else if (gameState === END)
   {
     ground.velocityX = 0;
     monkey.velocityY = 0;
     fill("red");
     text("Game Over !!!!",260,150);
     fill("green");
     text("Press R to Restart",250,175);
     
     //set lifetime of the game objects so that they are never destroyed
     obstaclesGroup.setLifetimeEach(-1);
     foodGroup.setLifetimeEach(-1);
     
     bananasEaten = 0;
     
     //stopping things from moving
     obstaclesGroup.setVelocityXEach(0);
     foodGroup.setVelocityXEach(0);
   }
  
  //restarting the game
  if (keyDown("r"))
  {
    gameState = PLAY;
    score = 0;
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();
  }
  
 
  //stop trex from falling down
  monkey.collide(invisibleGround);
  
  //drawing the sprites
  drawSprites();
}

function spawnObstacles()
{
 if (frameCount % 100 === 0)
 {
    var obstacle = createSprite(600,260,10,40);
    obstacle.velocityX = -(6+score/80);
   
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand)
    {
      case 1: obstacle.addImage(obstacleImage);
              break;
      case 2: obstacle.addImage(obstacleImage);
              break;
      case 3: obstacle.addImage(obstacleImage);
              break;
      case 4: obstacle.addImage(obstacleImage);
              break;
      case 5: obstacle.addImage(obstacleImage);
              break;
      case 6: obstacle.addImage(obstacleImage);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

function spawnbanana() 
{
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) 
  {
     banana = createSprite(600,80,40,10);
     banana.y = Math.round(random(120,200));
     banana.addImage(bananaImage);
     banana .scale = 0.1 ;
     banana.velocityX = -3;
    
     //assign lifetime to the variable
     banana.lifetime = 250;
  
     //add each banana to the group
     foodGroup.add(banana);
    }
}
 





