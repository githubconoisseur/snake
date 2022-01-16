let cnv = document.getElementById("myCanvas")
let ctx = cnv.getContext("2d");
cnv.width = 710;
cnv.height = 510;

let dx = 10;
let dy = 0;

function newboard() {
    ctx.clearRect(0, 0, cnv.width, cnv.height);
}

let snake = [{
        x: 180,
        y: 100
    },
    {
        x: 170,
        y: 100
    },
    {
        x: 160,
        y: 100
    },
    {
        x: 150,
        y: 100
    },
    {
        x: 140,
        y: 100
    },
    {
        x: 130,
        y: 100
    },
    {
        x: 120,
        y: 100
    },
    {
        x: 110,
        y: 100
    },
    {
        x: 100,
        y: 100
    }
];

var timer = setInterval(timer, 50);

function timer() {
    if (collision() === true) return;
    newboard();
    drawsnake();
    snakefood()
    foodgen()
    snake.unshift({
        x: snake[0].x + dx,
        y: snake[0].y + dy
    });
    if (grow() === true) return;
    snake.pop();
}

function drawsnake() {
    snake.forEach(movement);
}

function movement(e) {
    ctx.fillStyle = "green"
    ctx.fillRect(e.x, e.y, 10, 10);
}

document.onkeydown = function (event) {
    console.log(event.code)
    if (event.code === "ArrowUp" && dy != 10) {
        dx = 0;
        dy = -10;
    }
    if (event.code === "ArrowDown" && dy != -10) {
        dx = 0;
        dy = 10;
    }
    if (event.code === "ArrowRight" && dx != -10) {
        dx = 10;
        dy = 0;
    }
    if (event.code === "ArrowLeft" && dx != 10) {
        dx = -10;
        dy = 0;
    }
}

function collision() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    return snake[0].x < 0 || snake[0].y < 0 || snake[0].x > cnv.width || snake[0].y > cnv.height
}

let foodx = Math.floor(Math.random() * cnv.width /10) * 10;
let foody = Math.floor(Math.random() * cnv.height/10) * 10;

function snakefood() {
    ctx.fillStyle = "red"
    ctx.fillRect(foodx, foody, 10, 10)
}

function gen() {
    foodx = Math.floor(Math.random() * cnv.width /10) * 10;
    foody = Math.floor(Math.random() * cnv.height/10) * 10;
}

function foodgen() {
    snake.forEach(eat)
}

function eat(e) {
    if (e.x === foodx && e.y === foody) {
        gen()
    }
}

function grow() {
    if (snake[0].x === foodx && snake[0].y === foody) return true
}