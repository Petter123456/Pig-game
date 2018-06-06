/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/













var scores, roundScore, activePlayer, gamePlaying;

init();

//Adding event listener on click of dice button
document.querySelector('.btn-roll').addEventListener('click', function(){

  if (gamePlaying) {

    // 1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; //changing the dice css. element to a random number + the correct png image.


    //3. Updated the roud score IF the rolled number was not a 1.
    if (dice !== 1 ) {

      //add scores of dice throw to roundscore
      roundScore += dice;

      //selects the css element and sets the text content to the activePlayer variable and then generates a random number through the dice variable.
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else{
      //next player
      nextPlayer();
    }
  }
});


document.querySelector('.btn-hold').addEventListener('click', function(){

  if (gamePlaying) {
  //1. Add current score to Global score.
    scores[activePlayer] += roundScore;

    //2.Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //3. check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner'
      //again removing the dice
      document.querySelector('.dice').style.display = 'none';
      //ADD winner css class and remove css class active
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      //Setting the state variable to false
      gamePlaying = false;
    }
  } else{
      //4. next player
        nextPlayer();
    }
});

function nextPlayer(){
  //next players turn
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //if active player is equal to 0 then active player is 1, else active player is equal to 0. THIS IS CALLED A TURNERY OPERATOR
  roundScore = 0;

  //Setting the current score to 0 when a 1 i rolled
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  //switching the active player to the one that is rolling the dice with the classList.toggle
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.player-0-panel').classList.toggle('active');

  //EXAMPLE of how to add and remove an entire class
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    //removing the dice when a 1 is rolled (so that the next player starts at a clean slate)
    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // how to use the css property through javascript and   manipulating the objects style.
  document.querySelector('.dice').style.display = 'none';
  //Resetting the scores to 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  //Resetting the player names
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  //Removing the active and winner class
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  //and adding a active player again
  document.querySelector('.player-0-panel').classList.add('active');


}



//selects the css element and sets the text content to the activePlayer variable and then generates a random number through the dice variable.
  //document.querySelector('#current-' + activePlayer).textContent = dice;

// Just an example of how to change the inner html instead of the textContent _ OR AS ITS CALLED A SETTER
  //document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// Just an example of how to use the querySelector stored in a variable - OR AS ITS CALLED A GETTER
  //var x = document.querySelector('#score-1').textContent;
//console.log(x);
