const canvas=document.getElementById('game');
const ctx=canvas.getContext('2d');
let tileCount = 20;
let tileSize = 18;
let headX = 10;
let headY = 10;
let xvelocity = 0;
let yvelocity = 0;
let appleX = 5;
let appleY = 5;


document.body.addEventListener('keydown', keyDown);


function drawGame(){
    let speed = 20; // frame
    setTimeout(drawGame,1000/speed);

    clerarScreen();
    drawSnake();
    changeSnakePosition();
    checkCollision();
    drawApple();
}


function clerarScreen(){
    ctx.fillStyle='black'// make screen black
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight) // black color start from 0px left, right to canvas width and canvas height
}


function drawSnake(){
    ctx.fillStyle="orange";
    ctx.fillRect(headX* tileCount,headY* tileCount, tileSize, tileSize);
}


function changeSnakePosition(){
    headX = headX + xvelocity;
    headY = headY + yvelocity;
}


function drawApple(){
    ctx.fillStyle = "red"; //make apple red
    ctx.fillRect(appleX*tileCount, appleY* tileCount, tileSize, tileSize); //position apple within tile count
}


function checkCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
    }
}


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
