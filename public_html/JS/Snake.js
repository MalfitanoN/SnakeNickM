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
    snakeLength = 5;
    snakeSize = 20;
    snakeDirection = "Left";
    
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
    context.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function setFoodposition(){
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);
    
    food.x = randomX;
    food.y = randomY;
}