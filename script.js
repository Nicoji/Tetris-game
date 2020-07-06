// DOM's Element:
const grid = document.querySelector('.grid');

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

const colors = ['green', 'red', 'yellow', 'blue', 'orange'];

let random = Math.floor(Math.random() * shapes.length);
let currentPosition = 4;
let currentRotation = 0;
let currentColor = colors[random];
let current = shapes[random][0];


const draw = () => {
    current.forEach(index => {
        cells[currentPosition + index].classList.add('current-shape');
        cells[currentPosition + index].classList.add(currentColor);
    })
}

const undraw = () => {
    current.forEach(index => {
        cells[currentPosition + index].classList.remove('current-shape');
        cells[currentPosition + index].classList.remove(currentColor);
    })
}


const move = () => {
    
    undraw();
    currentPosition += lineWidth;
    draw();

    if(current.some(index => cells[currentPosition + lineWidth + index].classList.contains('taken'))) {
        current.forEach(index => cells[currentPosition + index].classList.add('taken'));
        random = Math.floor(Math.random() * shapes.length);
        current = shapes[random][0];
        currentColor = colors[random];
        currentPosition = 4;    
        draw();
    }
}

const moveLeft = () => {
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
}


const pressKey = (event) => {

    if(event.keyCode == 37) {
        moveLeft();
    }
    if(event.keyCode == 39) {
        moveRight();     
    }
    if(event.keyCode == 40) {
        moveDown();
    }
}

draw();
setInterval(move, 1000);



document.addEventListener('keyup', pressKey);



