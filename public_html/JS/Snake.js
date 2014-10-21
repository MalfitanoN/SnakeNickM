var Snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

gameInitialize();
snakeInitalize();
foodInitalize();
setInterval(gameLoop, 1000/30);

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");
    
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    
    document.addEventListener("keydown", keyboardHandler);
}

function gameLoop() {
    gameDraw();
    snakeUpdate();
    snakeDraw();
    foodDraw();
}

function gameDraw() {
    context.fillStyle = "rgb(52, 135, 194)";  
    context.fillRect(0, 0, screenWidth, screenHeight);
    
    snakeDraw();
}

function snakeInitalize() {
    snake = [];
    snakeLength = 1;
    snakeSize = 20;
    snakeDirection = "Down";
    
    for(var index = snakeLength - 1; index >= 0; index--) {
        snake.push( {
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
  for(var index = 0; index < snake.length; index++){
      context.fillStyle = "rgb(39, 93, 156)";
      context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
  } 
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);
    
    if(snakeDirection == "Down") {
        snakeHeadY++;
    }
    if(snakeDirection == "Up") {
        snakeHeadY--;
    }
    if(snakeDirection == "Right") {
        snakeHeadX++;
    }
    if(snakeDirection == "Left") {
        snakeHeadX--;
    }
    
    var snakeTail = snake.pop();
    snakeTail.x = snakeHeadX;
    snakeTail.y = snakeHeadY;
    
    snake.unshift(snakeTail);
}

function foodInitalize() {
    food = {
        x: 0,
        y: 0
    };
    setFoodposition();
}

function foodDraw(){
    context.fillStyle = "rgb(39, 93, 156)";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodposition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

function keyboardHandler(event){
    console.log(event);
    
    if(event.keyCode == "68" && snakeDirection != "Left"){
        snakeDirection = "Right"
    }
    
    if(event.keyCode == "65" && snakeDirection != "Right"){
        snakeDirection = "Left"
    }
    
    if(event.keyCode == "87" && snakeDirection != "Down"){
        snakeDirection = "Up"
    }
    
    if(event.keyCode == "83" && snakeDirection != "Up"){
        snakeDirection = "Down"
    }
}

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if(snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push( {
            x: 0,
            y: 0
        }); 
        snakeLength++;
        
        var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
    }
}

function checkWallCollisions(snakeHeadX, snakeHeadY){
    if(snakeHeadX * snakeSize >= screenWidth ||  snakeHeadX * snakeSize < 0){
        
    }
}