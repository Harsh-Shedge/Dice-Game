'use strict';

// SELECTING ELEMENTS ON WHICH ACTION SHOULD BE TAKEN

const player1 = document.querySelector('.player--0');
const player2 = document.querySelector('.player--1');


const firstPlayerScore = document.querySelector('#score--0');
const secondPlayerScore = document.getElementById('score--1');

const currentPlayerOne = document.getElementById('current--0');
const currentPlayerTwo = document.getElementById('current--1');


const diceImg = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold')

let scores,currentScore,activePlayer,playing;

// Initializing function
const init = function(){

    diceImg.classList.add('hidden');

    scores = [0,0]; // Store pts of player1 and 2
    currentScore = 0; 
    activePlayer = 0; // Switch btw player 1 and two
    playing = true; // Stop plaing after score reaches 100

    firstPlayerScore.textContent = 0;
    secondPlayerScore.textContent = 0;

    currentPlayerOne.textContent = 0;
    currentPlayerTwo.textContent = 0;

    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.add('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
}

init();


// Switch Players

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer===0 ? 1: 0;

    // toggle will add class if not present else remove it if present.
    player1.classList.toggle('player--active');
    player2.classList.toggle('player--active');
}






// Current score cannot be inside the btnroll event
// as it will get reset everytime btn is clicked.

// Rolling dice functionality
btnRoll.addEventListener('click',function(){

    if(playing){
        // Generate random dice rolls
        const dice = Math.trunc(Math.random()*6)+1;
        
        // Display dice number
        diceImg.classList.remove('hidden');

        // CHANGING IMG of HTML IN JAVASCRIPT
        diceImg.src = `dice-${dice}.png`;

        if(dice!=1){
            currentScore +=dice;
            // BUILDING ID NAME DYNAMICALLY
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else{
            switchPlayer();
        }

    }
    
})

btnHold.addEventListener('click',function(){

    if(playing){
        // Add current score to active player score
        scores[activePlayer]+=currentScore;
        // scores[1] = scores[1]+currentScore

        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];


        // Check if player's score is >=100
        if(scores[activePlayer]>=100){
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else{
            // Swicth to nxt player
            switchPlayer();
        }
    }
})

btnNew.addEventListener('click',init); //Javascript will call init function as soon asplayer clicks new button
    








