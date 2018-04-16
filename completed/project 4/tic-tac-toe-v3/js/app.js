$(function(){

	const newBoard = `<div class="board" id="board">
	  <header>
	    <h1>Tic Tac Toe</h1>
	    <ul>
	      <li class="players" id="player1">
	        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg>
	      </li>
	      <li class="players" id="player2">
	        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg>
	      </li>
	    </ul>
	  </header>
	  <ul class="boxes">
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li>
	    <li class="box"></li> 
	    <li class="box"></li>
	  </ul>
	</div>`;

	const start = `<div class="screen screen-start" id="start">
	  <header>
	    <h1>Tic Tac Toe</h1>
	    <a href="#" class="button">Start game</a>
	  </header>
	</div>`;

	const tied = `<div class="screen screen-win" id="finish">
					  <header>
					    <h1>Tic Tac Toe</h1>
					    <p class="message">It's a Tie!</p>
					    <a href="#" class="button newGame">New game</a>
					  </header>
					</div>`;

	let gameOver = false;
	let playersTurn = 1;
	let p1Moves = [];
	let p2Moves = [];
	let xO = (playersTurn) => {
		return playersTurn === 1 ? 'o' : 'x' ;
	};
	xO(playersTurn);

	const $board = $('#board');
	// When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you.
	// Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins. Use the tictactoe-02-inprogress.png mockup, and the board.txt HTML snippet to guide you.

	$board.hide();
	$('body').prepend(start);

	const $start = $('a.button');

	// start the game
	$start.on('click', (event) => {
		event.preventDefault();
		$board.show();
		$('#start').remove();
	});
	$('#player1').addClass('active');

	// Add the game play following these rules:
	// Play alternates between X and O.
	// The current player is indicated at the top of the page -- the box with the symbol O or X is highlighted for the current player. You can do this by simply adding the class .active to the proper list item in the HTML. For example, if it's player one's turn, the HTML should look like this: <li class="players active" id="player1">
	// When the current player mouses over an empty square on the board, it's symbol the X or O should appear on the square. You can do this using the x.svg or o.svg graphics (hint use JavaScript to set the background-image property for that box.)
	// Players can only click on empty squares. When the player clicks on an empty square, attach the class box-filled-1 (for O) or box-filled-2 (for X) to the square. The CSS we're providing will automatically add the proper image to the square marking it as occupied.

	// create listeners for boxes
	const addListeners = () => {
		$('.boxes li').on({
			click: (e) => {
				if ( !$(e.target).hasClass('box-filled-1') && !$(e.target).hasClass('box-filled-2') ) {
					$(e.target).addClass( `box-filled-${playersTurn}` );
					winCheck();
					playersTurn === 1 ? playersTurn = 2 : playersTurn = 1;
					xO(playersTurn);
					$('#player1').toggleClass('active');
					$('#player2').toggleClass('active');
				};
			}, mouseenter: (e) => {
				if ( !$(e.target).hasClass('box-filled-1') && !$(e.target).hasClass('box-filled-2') ) {
					$(e.target).addClass( `${xO(playersTurn)}` );
				};
			}, mouseleave: (e) => {
				$(e.target).removeClass( `${xO(playersTurn)}` );
			}
		});
	};
	addListeners();
		

	// The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. If all of the squares are filled and no players have three in a row, the game is a tie.
	// Add programming so that when the game ends, the board disappears and the game end screen appears. Use the tictactoe-03-winner1.png and tictactoe-04-winner2.png mockups, and the win.txt HTML snippet for guidance. Depending on the game results the final screen should:
	// Show the word "Winner" or the phrase "It's a Tie!"
	// Add the appropriate class to the <div> for the winning screen: <div class="screen screen-win" id="finish"> screen-win-one for player 1, screen-win-two for player two, or screen-win-tie if the game ends with no winner. For example, if player 1 wins, the HTML should look like this: <div class="screen screen-win screen-win-one" id="finish">
	// Add programming so that when a player pushes the "New Game" button, the board appears again, empty, and a new game begins.

	// fresh start
	const restartGame = () => {
		$('body').children().remove();
		$('body').prepend(newBoard);
		gameOver = false;
		playersTurn = 1;
		xO(playersTurn);
		$('#player1').addClass('active');
		addListeners();
	}
	// when theres a winner
	const won = () => {
		$('#board').remove();
		gameOver = true;
		const finish = `<div class="screen screen-win" id="finish">
		  <header>
		    <h1>Tic Tac Toe</h1>
		    <p class="message">Winner</p>
		    <a href="#" class="button newGame">New game</a>
		  </header>
		</div>`

		$('body').prepend(finish);
		playersTurn === 1 ? $('#finish').addClass('screen-win-one') : $('#finish').addClass('screen-win-two') ;
		$('.newGame').on('click', () => {
			restartGame();
		});
	}
	// possible ways to win
	const toWin = [
		[0,1,2], [3,4,5], [6,7,8], // row
		[0,3,6], [1,4,7], [2,5,8], // col
		[0,4,8], [2,4,6] // x cross
	];
	// check for win helpers
	const containsAll = (toWin, playerMoves) => {

		const helper = (el, playerMoves) => { 
		  for(let i = 0 , len = el.length; i < len; i++){
		     if($.inArray(el[i], playerMoves) == -1) return false;
		  }
		  return true;
		};

		$(toWin).each((index, el) => {
			if(helper(el, playerMoves)){
				// won the game
				won();
			};
		});
		
	};
	// after each turn check for win
	const winCheck = () => {
		p1Moves = [];
		p2Moves = [];
		$('.box').each((index, el) => {
			if ($(el).hasClass('box-filled-1')){
				p1Moves.push(index);
				containsAll(toWin, p1Moves);
			};
			if ($(el).hasClass('box-filled-2')){
				p2Moves.push(index)
				containsAll(toWin, p2Moves);
			}; 
			if (p1Moves.length + p2Moves.length == 9){
				// handle game draw
				if ( gameOver === false ){
					$('body').children().hide();
					$('body').prepend(tied);
					$('#finish').addClass('screen-win-tie');
					$('.newGame').on('click', () => {
						restartGame();
					});
				};
			};
		});
	};
}); // end jquery