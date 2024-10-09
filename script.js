const loginContainer = document.getElementById('login-container');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-button');
const playerNameDisplay = document.getElementById('player-name');
const userScoreElement = document.getElementById('score');
const gameBoard = document.getElementById('game-board');

let userName = '';
let userAge = '';
const boardSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 };
let score = 0;
let gameInterval;

// Handle the login and start the game
startButton.addEventListener('click', () => {
    const nameInput = document.getElementById('name').value.trim();
    const ageInput = document.getElementById('age').value.trim();

    if (nameInput && ageInput) {
        userName = nameInput;
        userAge = ageInput;
        playerNameDisplay.textContent = `${userName} (Age: ${userAge})`;

        loginContainer.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        startGame();
    } else {
        alert('Please enter both name and age to start the game.');
    }
});

function startGame() {
    resetGame();
    placeFood();
    gameInterval = setInterval(updateGame, 100);
}

function resetGame() {
    gameBoard.innerHTML = '';
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    userScoreElement.textContent = score;
    document.addEventListener('keydown', changeDirection);
}

function updateGame() {
    moveSnake();
    if (isGameOver()) {
        alert(`Game Over, ${userName}! Final Score: ${score}`);
        clearInterval(gameInterval);
        loginContainer.classList.remove('hidden');
        gameContainer.classList.add('hidden');
    } else {
        drawGame();
    }
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        userScoreElement.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }
}

function drawGame() {
    gameBoard.innerHTML = '';
    snake.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameBoard.appendChild(snakeElement);
    });

    const foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    gameBoard.appendChild(foodElement);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y !== 1) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y !== -1) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x !== 1) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x !== -1) direction = { x: 1, y: 0 };
            break;
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * boardSize) + 1,
        y: Math.floor(Math.random() * boardSize) + 1
    };
}

function isGameOver() {
    const head = snake[0];
    return (
        head.x < 1 || head.x > boardSize ||
        head.y < 1 || head.y > boardSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
}

