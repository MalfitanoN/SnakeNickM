var snake;
var snakeLength;
var snakeSize;
var snakeDirection;

var food;

var context;
var screenWidth;
var screenHeight;

var gameState;
var gameOverMenu;

gameInitialize();
snakeInitalize();
foodInitalize();
setInterval(gameLoop, 50);

function gameInitialize() {
    var canvas = document.getElementById("game-screen");
    context = canvas.getContext("2d");

    screenWidth = 800;
    screenHeight = 500;

    document.addEventListener("keydown", keyboardHandler);

    gameOverMenu = document.getElementById("gameOver");
    centerMenuPosition(gameOverMenu);

    setState("PLAY");
}

function gameLoop() {
    gameDraw();
    if (gameState == "PLAY") {
        snakeUpdate();
        snakeDraw();
        foodDraw();
    }
}

function gameDraw() {
    context.fillStyle = "rgb(52, 135, 194)";
    context.fillRect(0, 0, screenWidth, screenHeight);

}

function snakeInitalize() {
    snake = [];
    snakeLength = 1;
    snakeSize = 17;
    snakeDirection = "Down";

    for (var index = snakeLength - 1; index >= 0; index--) {
        snake.push({
            x: index,
            y: 0
        });
    }
}

function snakeDraw() {
    for (var index = 0; index < snake.length; index++) {
        context.fillStyle = "rgb(39, 93, 156)";
        context.fillRect(snake[index].x * snakeSize, snake[index].y * snakeSize, snakeSize, snakeSize);
    }
}

function snakeUpdate() {
    var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;

    checkFoodCollisions(snakeHeadX, snakeHeadY);
    checkWallCollisions(snakeHeadX, snakeHeadY);

    if (snakeDirection == "Down") {
        snakeHeadY++;
    }
    else if (snakeDirection == "Up") {
        snakeHeadY--;
    }
    else if (snakeDirection == "Right") {
        snakeHeadX++;
    }
    else if (snakeDirection == "Left") {
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

function foodDraw() {
    context.fillStyle = "rgb(39, 93, 156)";
    context.fillRect(food.x * snakeSize, food.y * snakeSize, snakeSize, snakeSize);
}

function setFoodposition() {
    var randomX = Math.floor(Math.random() * screenWidth);
    var randomY = Math.floor(Math.random() * screenHeight);

    food.x = Math.floor(randomX / snakeSize);
    food.y = Math.floor(randomY / snakeSize);
}

function keyboardHandler(event) {
    console.log(event);

    if (event.keyCode == "68" && snakeDirection != "Left") {
        snakeDirection = "Right"
    }

    if (event.keyCode == "65" && snakeDirection != "Right") {
        snakeDirection = "Left"
    }

    if (event.keyCode == "87" && snakeDirection != "Down") {
        snakeDirection = "Up"
    }

    if (event.keyCode == "83" && snakeDirection != "Up") {
        snakeDirection = "Down"
    }


    if (event.keyCode == "39" && snakeDirection != "Left") {
        snakeDirection = "Right"
    }

    if (event.keyCode == "37" && snakeDirection != "Right") {
        snakeDirection = "Left"
    }

    if (event.keyCode == "38" && snakeDirection != "Down") {
        snakeDirection = "Up"
    }

    if (event.keyCode == "40" && snakeDirection != "Up") {
        snakeDirection = "Down"
    }
}

function checkFoodCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX == food.x && snakeHeadY == food.y) {
        snake.push({
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

function checkWallCollisions(snakeHeadX, snakeHeadY) {
    if (snakeHeadX * snakeSize >= screenWidth || snakeHeadX * snakeSize < 0) {
        setState("GAME OVER");
    }

    if (snakeHeadY * snakeSize >= screenHeight || snakeHeadY * snakeSize < 0) {
        setState("GAME OVER");
    }
}

function checkSnakeCollisions(snakeHeadX, snakeHeadY) {

}

function setState(state) {
    gameState = state;
    showMenu(state);
}

function displayMenu(menu) {
    menu.style.visibility = "visible";
}

function showMenu(state) {
    if (state == "GAME OVER") {
        displayMenu(gameOverMenu);
    }
}

function centerMenuPosition(menu) {
    menu.style.top = (screenHeight / 2) - (menu.offsetHeight / 2) + "px";
    menu.style.left = (screenWidth / 2) + "px";
}
