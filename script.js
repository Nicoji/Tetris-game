// DOM's Element:
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');
const nextDisplay = document.querySelector('.next');
const pauseButton = document.querySelector('.pause');
const pauseimg = document.querySelector('img');

// Place all cells and put them in a conts
for(let i = 0; i <= 209; i++) {
    const div = document.createElement('div');
    div.classList.add('cell');
    grid.appendChild(div);
}
const cells = document.querySelectorAll('.grid div');

for(let i = 200; i < 210; i++) {
    cells[i].classList.add('taken');
    cells[i].classList.add('hide');
}



// Variables: 
const lineWidth = 10; 

const nextCells = document.querySelectorAll('.small-grid div');

const pause = "https://img.icons8.com/metro/52/000000/pause.png";
const play = "https://img.icons8.com/metro/52/000000/play.png";

let isGameLive = true;
// The different shapes, and their 4 rotate
const lShape = [
    [1, lineWidth+1, lineWidth*2+1, 2],
    [lineWidth, lineWidth+1, lineWidth+2, lineWidth*2+2],
    [1, lineWidth+1, lineWidth*2+1, lineWidth*2],
    [lineWidth, lineWidth*2, lineWidth*2+1, lineWidth*2+2]
]
const zshape = [
    [0,lineWidth,lineWidth+1,lineWidth*2+1],
    [lineWidth+1, lineWidth+2,lineWidth*2,lineWidth*2+1],
    [0,lineWidth,lineWidth+1,lineWidth*2+1],
    [lineWidth+1, lineWidth+2,lineWidth*2,lineWidth*2+1]
]
const tShape = [
    [1,lineWidth,lineWidth+1,lineWidth+2],
    [1,lineWidth+1,lineWidth+2,lineWidth*2+1],
    [lineWidth,lineWidth+1,lineWidth+2,lineWidth*2+1],
    [1,lineWidth,lineWidth+1,lineWidth*2+1]
]
const oShape = [
    [0,1,lineWidth,lineWidth+1],
    [0,1,lineWidth,lineWidth+1],
    [0,1,lineWidth,lineWidth+1],
    [0,1,lineWidth,lineWidth+1]
]
const ishape = [
    [1,lineWidth+1,lineWidth*2+1,lineWidth*3+1],
    [lineWidth,lineWidth+1,lineWidth+2,lineWidth+3],
    [1,lineWidth+1,lineWidth*2+1,lineWidth*3+1],
    [lineWidth,lineWidth+1,lineWidth+2,lineWidth+3]
]

const shapes = [lShape, zshape, tShape, oShape, ishape];


const lShapeMini = [
    [1, 4+1, 4*2+1, 2],
    [4, 4+1, 4+2, 4*2+2],
    [1, 4+1, 4*2+1, 4*2],
    [4, 4*2, 4*2+1, 4*2+2]
]
const zshapeMini = [
    [0,4,4+1,4*2+1],
    [4+1, 4+2,4*2,4*2+1],
    [0,4,4+1,4*2+1],
    [4+1, 4+2,4*2,4*2+1]
]
const tShapeMini = [
    [1,4,4+1,4+2],
    [1,4+1,4+2,4*2+1],
    [4,4+1,4+2,4*2+1],
    [1,4,4+1,4*2+1]
]
const oShapeMini = [
    [0,1,4,4+1],
    [0,1,4,4+1],
    [0,1,4,4+1],
    [0,1,4,4+1]
]
const ishapeMini = [
    [1,4+1,4*2+1,4*3+1],
    [4,4+1,4+2,4+3],
    [1,4+1,4*2+1,4*3+1],
    [4,4+1,4+2,4+3]
]

const shapesMini = [lShapeMini, zshapeMini, tShapeMini, oShapeMini, ishapeMini];


const colors = ['green', 'red', 'yellow', 'blue', 'orange', 'violet'];

let random = Math.floor(Math.random() * shapes.length);
let randomNext = Math.floor(Math.random() * shapesMini.length);
let randomColor = Math.floor(Math.random() * colors.length);
let currentPosition = 4;
// let currentRotation = 0;
let indexRotate = 0; 
let currentColor = colors[random];
let current = shapes[random][indexRotate];
let nextShape = shapes[randomNext][indexRotate]; 
let nextShapeMini = shapesMini[randomNext][indexRotate]; 


let score = 0;

const draw = () => {
    current.forEach(index => {
        cells[currentPosition + index].classList.add('current-shape');
        cells[currentPosition + index].classList.add(currentColor);
    })
}

const drawNext = () => {
    nextShapeMini.forEach(index => {
        nextCells[1 + index].classList.add('orange');
    })
}

const undraw = () => {
    current.forEach(index => {
        cells[currentPosition + index].classList.remove('current-shape');
        cells[currentPosition + index].classList.remove(currentColor);
    })
}

const undrawNext = () => {
    for(let aCell of nextCells) {
        aCell.classList.remove('orange');
    }
}

const move = () => {
    
    undraw();
    currentPosition += lineWidth;
    draw();

    if(current.some(index => cells[currentPosition + lineWidth + index].classList.contains('taken'))) {
        current.forEach(index => cells[currentPosition + index].classList.add('taken'));
        indexRotate = 0;
        current = nextShape;
        randomNext = Math.floor(Math.random() * shapesMini.length);
        randomColor = Math.floor(Math.random() * colors.length);
        nextShape = shapes[randomNext][indexRotate];
        nextShapeMini = shapesMini[randomNext][indexRotate];
        currentColor = colors[randomColor];
        currentPosition = 4; 
        draw();
        undrawNext();   
        drawNext();
        score += 10;
        scoreDisplay.textContent = score;
    }
}

const moveLeft = () => {

    if(currentPosition % lineWidth == 0) {
        console.log('nop');        
    }

    undraw();
    currentPosition -= 1;
    draw();

    
}

const moveRight = () => {
    undraw();
    currentPosition += 1;
    draw();
}

const moveDown = () => {
    undraw();
    currentPosition += lineWidth;
    draw();

    if(current.some(index => cells[currentPosition + lineWidth + index].classList.contains('taken'))) {
        current.forEach(index => cells[currentPosition + index].classList.add('taken'));
        indexRotate = 0;
        current = nextShape;
        
        randomNext = Math.floor(Math.random() * shapesMini.length);
        randomColor = Math.floor(Math.random() * colors.length); 
        nextShape = shapes[randomNext][indexRotate];
        nextShapeMini = shapesMini[randomNext][indexRotate];
        
        currentColor = colors[randomColor];
        currentPosition = 4; 
        draw();
        undrawNext();   
        drawNext();

        score += 10;
        scoreDisplay.textContent = score;
    }
}

const pressKey = (event) => {

    if(!isGameLive) {
        return;
    } else {

        if(event.keyCode == 37) {
            moveLeft();
        }
        if(event.keyCode == 39) {
            moveRight();     
        }
        if(event.keyCode == 40) {
            moveDown();
        }
        if(event.keyCode == 32) {
            undraw();
    
            if(indexRotate == 3) {
                indexRotate = 0;
            } else {
                indexRotate += 1;
            }
            
            current = shapes[random][indexRotate];
            draw();
        }
    } 
}

const pausePlay = () => {
    if(isGameLive) {
        clearInterval(gameOn);
        isGameLive = false;
        pauseimg.removeAttribute('src');
        pauseimg.setAttribute('src', play);
    } else {
        gameOn = setInterval(move, 1000);
        isGameLive = true;
        pauseimg.removeAttribute('src');
        pauseimg.setAttribute('src', pause);
    }
}


draw();
drawNext();
let gameOn = setInterval(move, 1000);
scoreDisplay.textContent = score;

pauseButton.addEventListener('click', pausePlay);
document.addEventListener('keyup', pressKey);


console.log(current);
console.log(nextShape);
