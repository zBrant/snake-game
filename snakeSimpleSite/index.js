const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class snakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let tileCount = 20;
let tileSize = canvas.clientWidth/tileCount-2;
let headX = 10;
let headY = 10;
let xvelocity = 0;
let yvelocity = 0;
let appleX = 5;
let appleY = 5;
let speed = 7; // frame rate
let score = 0; // scores

//array for snake parts
const snakeParts = [];
let tailLength = 2; //initial parts of snake


function drawGame(){
    changeSnakePosition();

    //game over logic
    let result = isGameOver();
    if(result){
      return
    }

    clearScreen();
    drawSnake();
    drawApple();

    checkCollision();
    drawScore();
    setTimeout(drawGame,1000/speed); // screen update
}


function clearScreen(){
    ctx.fillStyle='black'// make screen black
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight) // black color start from 0px left, right to canvas width and canvas height
}

// game loop
function drawSnake(){
    ctx.fillStyle = "green";
    //loop through our snakeparts array
    for(let i =0; i < snakeParts.length;i++){
        //draw snake parts
        let part = snakeParts[i]
        ctx.fillRect(part.x *tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new snakePart(headX,headY)); // put item at the end of list next to the head
    if(snakeParts.length > tailLength){
        snakeParts.shift();
    }

    ctx.fillStyle ="orange";
    ctx.fillRect(headX* tileCount, headY* tileCount, tileSize, tileSize);
}


function changeSnakePosition(){
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}


function drawApple(){
    ctx.fillStyle = "red" //make apple red
    ctx.fillRect(appleX*tileCount, appleY* tileCount, tileSize, tileSize) //position apple within tile count
}


function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount)
        appleY = Math.floor(Math.random()*tileCount)
        tailLength++;
        score++;
    }
}

function drawScore(){
    ctx.fillStyle = "white" // set color text
    ctx.font ="10px verdena" // set font size and font family
    ctx.fillText("Score: " + score, canvas.clientWidth-50,10)// positon score
}


function isGameOver(){
    let gameOver = false;

    // check whether game has started
    if(yvelocity === 0 && xvelocity === 0) return false;

    if(headX < 0){
        gameOver = true;
    }
    else if ( headX === tileCount){
        gameOver = true;
    }
    else if ( headY < 0){
        gameOver =  true;
    }
    else if ( headY === tileCount){
        gameOver = true;
    }

    for(let i =0; i < snakeParts.length; i++){
        let part=snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    return gameOver;
}


document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //up
    if(event.keyCode == 38){
        if(yvelocity == 1) return;
        yvelocity = -1;
        xvelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yvelocity == -1) return;
        yvelocity = 1;
        xvelocity = 0;
    }
    //left
    if(event.keyCode == 37){
        if(xvelocity == 1) return;
        yvelocity = 0;
        xvelocity = -1;

    }
    //right
    if(event.keyCode==39){
        if(xvelocity == -1) return;
        yvelocity = 0;
        xvelocity = 1;
    }
}

drawGame();
