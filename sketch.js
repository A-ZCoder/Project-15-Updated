var island, man, coin, chest, ore, pirate, sword, crystal, pond;
var islandImg, manImg, coinImg, oreImg, pirateImg, swordImg, chestImg, crystalImg, pondImg;
var money = 0;
var life = 2;
var gem = 0;

var heabImg;
var knife;
var knifeImg;

var rule, button, coin2;
var ruleImg, buttonImg, coin2Img;

var heart;
var heartImg;

var END = 0
var PLAY = 1
var gameState = "serve"

var coinGroup;
var pirateGroup; 
var chestGroup;
var oreGroup;
var swordGroup;
var pondGroup;
var extraGroup;

function preload() 
{
islandImg = loadImage("Island.jpg");
manImg = loadAnimation("Runner-1.png","Runner-2.png");
swordImg = loadImage("sword.png");
oreImg = loadImage("ore.png");
crystalImg = loadImage("crystal.png");
coinImg = loadImage("coin.png");
pirateImg = loadImage("pirate.png");
chestImg = loadImage("chest.png");
ruleImg = loadImage("paper.jpg");
buttonImg = loadImage("play.png");
pondImg= loadImage("pond.png");
heartImg= loadImage("heart.png");
coin2Img= loadImage("co.png");
knifeImg= loadImage("knife.png");
heabImg= loadAnimation("black.png", "heart.png");
}



function setup() 
{
createCanvas(745,650);

island = createSprite(425,330);
island.addImage(islandImg);
island.scale = 1.450;
island.velocityY = 4;

man = createSprite(370,550);
man.addAnimation("Man-running",manImg);
man.scale= 0.0800

rule = createSprite(400,300);
rule.addImage(ruleImg);
rule.scale= 1;

button = createSprite(360, 600);
button.addImage(buttonImg);
button.scale = 0.350;

coinGroup = new Group();
chestGroup = new Group();
pirateGroup= new Group();
oreGroup= new Group();
swordGroup= new Group();
pondGroup= new Group();
extraGroup= new Group();

heart= createSprite(635, 75);
heart.addImage(heartImg);
heart.addAnimation("hab", heabImg);
heart.scale= 0.1;

crystal= createSprite(50,80);
crystal.addImage(crystalImg);
crystal.scale=0.1;

coin2= createSprite(50,130);
coin2.addImage(coin2Img);
coin2.scale=0.1;

knife= createSprite(-100,-500);
        knife.addImage(knifeImg);
        knife.scale= 0.4;
        knife.mirrorY(-1);
        knife.visible=true;
}


function draw() 
{
background(0);

if(mousePressedOver(button)) {
    button.destroy();
    rule.destroy();
}

if(gameState === "PLAY") {
    island.velocityY = 6;

    knife.x= World.mouseX;
    man.x = World.mouseX;
    knife.debug= false;
    knife.setCollider("circle", 0, 0, 155)

    if(island.y > 437) {
        island.y = height/3
    }

    edges = createEdgeSprites();
    man.collide(edges);
    man.debug =false;
    man.setCollider("circle", 0, 0, 650)

    createCoin();
    createOre();
    createPirate();
    createChest();
    createSword();
    createPond();


    if(man.isTouching(coinGroup)) {
        coinGroup.destroyEach();
        money = money+50        
    }

    if(man.isTouching(chestGroup)) {
        chestGroup.destroyEach();
        money = money+200;
    }

    if(man.isTouching(swordGroup)) {
        swordGroup.destroyEach();
        knife.x= World.mouseX;
        knife.y= 500;
    }
    
    if(knife.isTouching(oreGroup)) {
        oreGroup.destroyEach();
        knife.x= -100;
        knife.y= -500;
        gem = gem+50;
    }

    if(knife.isTouching(pirateGroup)) {
        pirateGroup.destroyEach();
        knife.x= -100;
        knife.y= -500;
        }

    if(man.isTouching(pirateGroup)) {
        life = life-1;
        man.collide(pirateGroup);
        pirateGroup.destroyEach();
        money = money-100;
    }

    if(man.isTouching(oreGroup) || man.isTouching(pirateGroup) || man.isTouching(pondGroup)) {
        life = life-1;
        man.collide(extraGroup)
        extraGroup.destroyEach();
        heart.changeAnimation("hab", heabImg);
    }}

    else {
    if (life < 1) {
        gameState == "END"
    }
}

drawSprites();
textSize(27)
fill("crimson")
text("      :"   +money, 45, 140);
textSize(27)
fill("purple")
text("      :"   +gem, 45, 85);
textSize(27)
fill("red")
text("     :"  +life, 635, 90);

if(gameState === "serve") 
{
  island.velocityY = 0;  
  textSize(25)  
  fill("crimson")
  text("Collect the coins, chests and crystals for money", 100,200);
  textSize(25)  
  fill("crimson")
  text("Dont bumb into crystals and trees", 185,250);
  textSize(25)  
  fill("crimson")
  text("If you hit Pirates, you lose 100 coins and a life", 120,300);
  textSize(25)  
  fill("crimson")
  text("Use swords to attack Pirates and collect crystals", 112,350);
  
} else {
    gameState = "PLAY";
}

if(mousePressedOver(button)) {
    gameState = "PLAY";
}

if(life < 1) {
    textSize(50);
    fill("red")
    text("GAME OVER", 235, 300)
    island.velocityY = 0
        extraGroup.destroyEach();
        swordGroup.destroyEach();
        coinGroup.destroyEach();
        chestGroup.destroyEach();
        rule = createSprite(300,300);
        rule.addImage(ruleImg);
        rule.scale = 1;
}
}


function createCoin() 
{
    if (World.frameCount % 300 == 0) {
        coin = createSprite(Math.round(random(30, 740),40, 10, 10));
        coin.addImage(coinImg);
        coin.scale=0.2;
        coin.velocityY = 6;
        coin.lifetime = 240;
        coinGroup.add(coin)
        }

}


function createOre() {
   if(World.frameCount % 700 == 0) { 
    ore = createSprite(Math.round(random(50,500), 40, 10, 10));
    ore.addImage(oreImg);
    ore.scale = 0.200;
    ore.velocityY = 6;
    ore.lifetime = 240;
    oreGroup.add(ore);
    extraGroup.add(ore);
   }
}


function createPirate() {
    if(World.frameCount % 600 == 0) {
        pirate = createSprite(Math.round(random(350,745), 40, 10, 10));
        pirate.addImage(pirateImg);
        pirate.scale = 0.2;
        pirate.velocityY = 6;
        pirate.lifetime =240;
        pirateGroup.add(pirate);
        extraGroup.add(pirate);
    }
}

function createChest() {
   if(World.frameCount % 900 == 0) {
    chest = createSprite(Math.round(random(20,100), 40, 10, 10));
    chest.addImage(chestImg);
    chest.scale = 0.07;
    chest.velocityY = 6;
    chest. lifetime =240;
    chestGroup.add(chest);
}
}

function createSword() {
    if(World.frameCount% 800 == 0) {
        sword = createSprite(Math.round(random(15,300), 40, 10, 10));
        sword.addImage(swordImg);
        sword.scale = 0.2;
        sword.velocityY = 6;
        sword.lifetime =240; 
        swordGroup.add(sword);
    }
}







function createCoin() 
{
    if (World.frameCount % 200 == 0) {
        coin = createSprite(Math.round(random(30, 740),40, 10, 10));
        coin.addImage(coinImg);
        coin.scale=0.2;
        coin.velocityY = 6;
        coin.lifetime = 240;
        coinGroup.add(coin)
        }

}


function createOre() {
   if(World.frameCount % 1050 == 0) { 
    ore = createSprite(Math.round(random(50,500), 40, 10, 10));
    ore.addImage(oreImg);
    ore.scale = 0.200;
    ore.velocityY = 6;
    ore.lifetime = 240;
    oreGroup.add(ore);
    extraGroup.add(ore);
   }
}


function createPirate() {
    if(World.frameCount % 1200 == 0) {
        pirate = createSprite(Math.round(random(350,745), 40, 10, 10));
        pirate.addImage(pirateImg);
        pirate.scale = 0.2;
        pirate.velocityY = 6;
        pirate.lifetime =240;
        pirateGroup.add(pirate);
        extraGroup.add(pirate);
    }
}

function createChest() {
   if(World.frameCount % 1300 == 0) {
    chest = createSprite(Math.round(random(20,100), 40, 10, 10));
    chest.addImage(chestImg);
    chest.scale = 0.07;
    chest.velocityY = 6;
    chest. lifetime =240;
    chestGroup.add(chest);
}
}

function createSword() {
    if(World.frameCount% 550 == 0) {
        sword = createSprite(Math.round(random(15,300), 40, 10, 10));
        sword.addImage(swordImg);
        sword.scale = 0.2;
        sword.velocityY = 6;
        sword.lifetime =240; 
        swordGroup.add(sword);
    }
}

function createPond() {
    if(World.frameCount% 500 == 0) {
        pond = createSprite(Math.round(random(60,750), 40, 10, 10));
        pond.addImage(pondImg);
        pond.scale= 0.170;
        pond.velocityY=6;
        pond.lifetime =240;
        pondGroup.add(pond);
        extraGroup.add(pond);
    }
}

function createPond() {
    if(World.frameCount% 785 == 0) {
        pond = createSprite(Math.round(random(60,750), 40, 10, 10));
        pond.addImage(pondImg);
        pond.scale= 0.170;
        pond.velocityY=6;
        pond.lifetime =240;
        pondGroup.add(pond);
        extraGroup.add(pond);
    }
}




