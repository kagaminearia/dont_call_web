
// refer: https://www.youtube.com/watch?v=ej8SatOj3V4


// initialize the variables
let currtile;
let score = 0;
let sanity = 100;
let level = 1;
let gameOver = false;


window.onload = function(){
    if (window.location.pathname.includes("main.html")) {
        setGame(); // Start the game
    }
}


function displayLevel() {
    const levelDisplay = document.getElementById('level');
    levelDisplay.textContent = `Level ${level}`; // Update the displayed level number
}

function increaseLevel() {
    level++; // Increment of the level
    displayLevel(); // Show the new level before starting
    setGame();
}


function setGame(){
    let num;
    if (level < 4) {
        num = 3;
    } else if (level < 8) {
        num = 4;
    } else {
        num = 5;
    }
    // set up the grid for the board
    // Update grid size in CSS dynamically
    let board = document.getElementById('board');
    let tileSize = 480 / num; // Calculate the size of each grid tile based on the grid size

    board.style.gridTemplateColumns = `repeat(${num}, ${tileSize}px)`;
    board.style.gridTemplateRows = `repeat(${num}, ${tileSize}px)`;

    // Clear the board before creating new tiles
    board.innerHTML = '';

    // Update size of grid elements (divs) dynamically
    for (let i = 0; i < num * num; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        tile.style.width = `${tileSize}px`;
        tile.style.height = `${tileSize}px`;
        tile.style.background = 'url(./idle.jpg)';
        tile.style.backgroundSize = 'cover';
        board.appendChild(tile);
    }

    // let millisec = 2000 - (level * 50);
    // setInterval(setCall, millisec); // call this function every *millisec milliseconds
    startCallIntervals();
}

function getRandomTile(){
    let num;
    if (level < 4) {
        num = 3;
    } else if (level < 8) {
        num = 4;
    } else {
        num = 5;
    }
    let n = num*num;
    let ans = Math.floor(Math.random() * n);
    return ans.toString();
}

let intervalBetweenCalls = 2000; 
let callDisplayDuration = 1500; 
let callDisplayInterval;

function setCall() {
    let num;
    if (level < 4) {
        num = 3;
    } else if (level < 8) {
        num = 4;
    } else {
        num = 5;
    }

    if (gameOver) {
        return;
    }

    if (currtile) {
        currtile.innerHTML = ""; // Clear all tags in the div tag
    }

    let call = document.createElement("img"); // Create img tag
    call.src = "./call.jpg";

    let tileSize = 480 / num; // Define tileSize variable here or calculate it based on the current level

    // Adjust image size based on tileSize
    if (tileSize) {
        call.style.width = `${tileSize}px`;
        call.style.height = `${tileSize}px`;
    } else {
        // Default size if tileSize is not available
        call.style.width = "160px"; 
        call.style.height = "160px"; 
    }

    let tile_id = getRandomTile();
    currtile = document.getElementById(tile_id);
    currtile.appendChild(call);

    // Set a timeout to remove the call after the display duration
    let callTimeout = setTimeout(() => {
        if (currtile) {
            currtile.innerHTML = ""; // Clear after display duration
            decreaseScore(); // Call the function to decrease score when call disappears
        }
    }, callDisplayDuration);

    // Function to decrease score when call disappears
    function decreaseScore() {
        // Update the score and sanity
        if (score > 0) {
            score -= 5; // Decrease the score by 5 (adjust as needed)
            document.getElementById("score").innerText = "score: " + score.toString();
        }
    }

    // Add a click event listener to the call image
    call.addEventListener('click', () => {
        clearTimeout(callTimeout); // Clear the timeout if the call is clicked
        // Add your existing logic for handling when the call is clicked
    });
}

function startCallIntervals() {
    setCall(); // Initial call

    // Set interval for the interval between two calls
    setInterval(() => {
        setCall(); // Display the call
    }, intervalBetweenCalls);
}


function selectTile(){
    if (gameOver){
        return;
    }

    if(this == currtile){
        // update params
        if (sanity < 100) sanity += 1;
        score += 10;
        document.getElementById("score").innerText = "score: " + score.toString();
        document.getElementById("sanity").innerText = "sanity: " + sanity.toString();

        // Check if the score reaches a certain threshold to advance to the next level
        if (score >= level * 50) {
            increaseLevel(); // Increase the level
        }
    }
    else{ // click idle tile when there is no msg
        sanity -= 10;
        document.getElementById("sanity").innerText = "sanity: " + sanity.toString();
        if (sanity < 1){
            gameOver = true;
        }
    }
}
