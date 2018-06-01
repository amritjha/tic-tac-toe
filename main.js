var MODE = "ONEPLAYER";
var P1SYMBOL = 'X';
var P2SYMBOL = '0';
var P1SCORE = 0;
var P2SCORE = 0;
var boardSlots = [];
var boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var GAME = true;
var HUMAN = false;
var COMPUTER = true;
var HUMVAL = -1;
var COMPVAL = 1;
var winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var winningCombo = [];

function onInit() {
	$.each($(".board-slot"), function(idx, val) { boardSlots.push(val); });
	$("#get-started-btn").on("click", onGetStarted);
	//$(".oppn-btn").on("click", onSelectOpponent);
	$(".symb-btn").on("click", onSelectSymbol);
	$(".board-slot").on("click", makeMove);
	$("#reset-btn").on("click", resetGame);
}

function resetGame() {
	boardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	GAME = true;
	$.each($(".board-slot"), function(idx, val) {
		$(val).html("");
		$(val).css({
			backgroundColor: "rgb(250, 250, 250)",
			color: "rgb(0, 0, 0)"
		});
	});
}

function onGetStarted() {
	$(".init-div").hide('slide', {direction: 'left'}, 200);
	setTimeout(function() {
		$(".symbol-div").css("display", "block");
	}, 210);
}

/*function onSelectOpponent() {
	MODE = $(this).attr("id") == "COMPUTER" ? "ONEPLAYER" : "TWOPLAYER";
	$(".mode-div").hide('slide', {direction: 'left'}, 200);
	setTimeout(function() {
		$(".symbol-div").css("display", "block");
	}, 210);
}*/

function onSelectSymbol() {
	P1SYMBOL = $(this).attr("id") == "X" ? "X" : "O";
	P2SYMBOL = P1SYMBOL == "X" ? "O" : "X";
	$(".symbol-div").hide('slide', {direction: 'left'}, 200);
	setTimeout(function() {
		$(".app-container").css({
			backgroundColor: "rgb(30, 30, 30)",
			marginTop: "100px"
		});
		$(".game-div").css("display", "block");
	}, 210);
}

function makeMove() {
	if(!GAME)
		return;
	for(var i = 0; i < 9; i++) {
		if(boardSlots[i] == this && boardState[i] == 0) {
			completeMove(i, HUMAN);
			if(MODE == "ONEPLAYER")
				computersMove();
		}
	}
}

function completeMove(index, player) {
	if(!GAME)
		return;
	if(boardState[index] == 0) {
		if(player == HUMAN) {
			boardSlots[index].innerHTML = P1SYMBOL;
			boardState[index] = HUMVAL;
		}
		else {
			boardSlots[index].innerHTML = P2SYMBOL;
			boardState[index] = COMPVAL;
		}
	}
	if(findWinner(boardState, player, "NOT_AI")) {
		for(var i = 0; i < 3; i++) 
			$($(".board-slot")[winningCombo[i]]).css({ backgroundColor: "#22f", color: "#111" });
		if(!player)
			P1SCORE += 1;
		else 
			P2SCORE += 1;
		$("#pointsP1").html(P1SCORE);
		$("#pointsP2").html(P2SCORE);
		GAME = false;
	}
}

function findWinner(board, player, caller) {
	var value = player == HUMAN ? HUMVAL : COMPVAL;
	for(var i = 0; i < 8; i++) {
		var win = true;
		for(var j = 0; j < 3; j++) {
			if(board[winCombos[i][j]] != value) {
				win = false;
				break;
			}
		}
		if(win) {
			if(caller == "NOT_AI") {
				winningCombo = winCombos[i];
			}
			return true;
		}
	}
	return false;
}

function checkForDraw(board) {
	for(var i = 0; i < 9; i++) {
		if(board[i] == 0)
			return false;
	}
	return true;
}

function computersMove() {
	if (MODE == "ONEPLAYER")
		minimaxForMove(boardState, 0, COMPUTER);
}

function minimaxForMove(board, depth, player) {
	if(findWinner(board, !player, "AI"))
		return -10 - depth;

	if(checkForDraw(board))
		return 0;

	var value = player == HUMAN ? HUMVAL : COMPVAL;
	var max = -Infinity;
	var index = 0;

	for(var i = 0; i < 9; i++) {
		if(board[i] == 0) {
			var newboard = board.slice();
			newboard[i] = value;

			var moveval = -minimaxForMove(newboard, depth + 1, !player);
			if(moveval > max) {
				max = moveval;
				index = i;
			}
		}
	}

	if(depth == 0)
		completeMove(index, COMPUTER);

	return max;
}


$(document).ready(onInit);