const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
const frames = 4;

const head = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    direction: ''
};

const apple = {
    x: Math.floor((Math.random() * canvas.width) / head.size) * head.size,
    y: Math.floor((Math.random() * canvas.height) / head.size) * head.size,
}

let snake = [head];

setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSnake();
    checkRules();
    drawSnake();
    drawApple();
},1000/frames);

function drawSnake() {
    ctx.fillStyle = '#ffffff';
    for(const body of snake) {
        ctx.fillRect(body.x, body.y, head.size, head.size);
    }
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, head.size, head.size);
}

function updateSnake() { 
    
    for (let index = snake.length - 1; index > 0; index--) {
            snake[index].x = snake[index - 1].x;
            snake[index].y = snake[index - 1].y;
    }

    if(head.direction == "right") head.x += head.size;
    if(head.direction == "left") head.x -= head.size;
    if(head.direction == "up") head.y -= head.size;
    if(head.direction == "down") head.y += head.size;
}

function checkRules() { 
    for (const [index, body] of snake.entries()) {
        if(!index) continue;
        if((head.x == body.x && head.y == body.y) || (head.x < 0) || (head.x > canvas.width) || (head.y < 0) || (head.y > canvas.height))
        {
            head.x = canvas.width / 2;
            head.y = canvas.height / 2;
            snake = [head];
        }
    }
    if (head.x == apple.x && head.y == apple.y) {

        increaseSnake();
        apple.x = Math.floor((Math.random() * canvas.width) / head.size) * head.size;
        apple.y = Math.floor((Math.random() * canvas.width) / head.size) * head.size;
    }
}

function increaseSnake() {
    const size = snake.length;

    snake.push(
        {
            x: snake[size-1].x,
            y: snake[size-1].y
        }
    );

    if(head.direction == "right") snake[size].x -= head.size;
    if(head.direction == "left") snake[size].x += head.size;
    if(head.direction == "up") snake[size].y += head.size;
    if(head.direction == "down") snake[size].y -= head.size;
}

window.addEventListener("keydown", event => {
    if (event.key == "ArrowRight" && head.direction != "left") head.direction = "right";
    if (event.key == "ArrowLeft" && head.direction != "right") head.direction = "left";
    if (event.key == "ArrowDown" && head.direction != "up") head.direction = "down";
    if (event.key == "ArrowUp"  && head.direction != "down") head.direction = "up";

    // window.addEventListener("click", increaseSnake);
});