
(function() {
var btnNew  = document.getElementsByClassName("btn__new")[0],
	btnHold = document.getElementsByClassName("btn__hold")[0],
	btnRoll = document.getElementsByClassName("btn__roll")[0],
	cube    = document.getElementById("cube"),
	playerScore0 = document.getElementById("score0"),
	playerScore1 = document.getElementById("score1"),
	playerCurrent0 = document.getElementById("current0"),
	playerCurrent1 = document.getElementById("current1"),
	activePlayer0  = document.getElementsByClassName("player__name")[0],
	activePlayer1  = document.getElementsByClassName("player__name")[1],
	activecurrent0 = document.getElementsByClassName("player__current-box")[0],
	activecurrent1 = document.getElementsByClassName("player__current-box")[1],

    score0 = 0,
	score1 = 0,
	activePlayer = 0,
	min     = 1,
	max     = 24, //24
	dice 	= 0,
	current	= 0,
	newGame = false,
	degreeStart = 0;

	viewShackeInit ();

	btnRoll.addEventListener("click", diceRoll);
	// cube.addEventListener("click", diceRoll);
	btnNew.addEventListener("click", init);
	btnHold.addEventListener("click", addScore);
	document.getElementsByClassName("modal__btn")[0].addEventListener("click", hideModal);

	cube.addEventListener("transitionend", enableBtn);

function hideModal() {
	document.getElementsByClassName("modal")[0].style.display = "none";
}

function viewShackeInit () {
	if (!activePlayer0.classList.contains("shake")){
		activePlayer0.classList.add("shake");
	}   

	if (activePlayer1.classList.contains("shake")){
		activePlayer1.classList.remove("shake");
	}
}

function init () {

	disableBtn();

    score0  = 0;
	score1  = 0;
	current	= 0;
	activePlayer = 0;
	newGame = true;

	playerScore0.textContent = score0;
	playerScore1.textContent = score1;

	playerCurrent0.textContent = "0";
	playerCurrent1.textContent = "0";

	if (degreeStart == 0) {degreeStart = 360} else {degreeStart = 0}
	cube.style.webkitTransform = 'rotateX('+ degreeStart +'deg) rotateY('+ degreeStart +'deg)';
	cube.style.transform = 'rotateX('+ degreeStart +'deg) rotateY('+ degreeStart +'deg)';

	if (!activePlayer0.classList.contains("player__name--active")) {
		activePlayer0.classList.add("player__name--active");
		activecurrent0.classList.add("player__current-box--active");
	}

	if (activePlayer1.classList.contains("player__name--active")) {
		activePlayer1.classList.remove("player__name--active");
		activecurrent0.classList.remove("player__current-box--active");
	}

	if (activePlayer1.classList.contains("winner")) {
		activePlayer1.classList.remove("winner");
		activePlayer1.textContent = "Гравець 2";
	}
	if (activePlayer0.classList.contains("winner")) {
		activePlayer0.classList.remove("winner");
		activePlayer0.textContent = "Гравець 1";
	}

	removeCurrentAnimate()

	viewShackeInit ();
}

function addScore() {
	if (activePlayer == 1) {
		score1 += current;
		current = 0;
		viewScore(score0, score1);
		disableCurrent();
		if (score1 >= 100) {
			winner(activePlayer);
			return activePlayer;
		}
		viewChangeActive();	
		activePlayer = 0;
	} else {
		score0 += current;
		current = 0;
		viewScore(score0, score1);
		disableCurrent();		
		if (score0 >= 100) {
			winner(activePlayer);
			return activePlayer;
		}
		viewChangeActive();
		activePlayer = 1;
	}

}

function winner() {
	if (activePlayer == 1) {
		activePlayer1.textContent = "Переможець!";
		activePlayer1.classList.add("winner");
	} else {
		activePlayer0.textContent = "Переможець!";
		activePlayer0.classList.add("winner");
	}
	btnHold.setAttribute('disabled', 'disabled');
	btnRoll.setAttribute('disabled', 'disabled');
}

function enableBtn() {

	if (newGame == false) {calculateCurrent();}

	console.log(newGame); 

	newGame = false;

	btnRoll.removeAttribute('disabled');
	btnNew.removeAttribute('disabled');
	btnHold.removeAttribute('disabled');
}

function disableBtn() {
	
	btnRoll.setAttribute('disabled', 'disabled');
	btnNew.setAttribute('disabled', 'disabled');
	btnHold.setAttribute('disabled', 'disabled');

	removeCurrentAnimate()

}

function disableCurrent() {
	playerCurrent0.textContent = "0";
	playerCurrent1.textContent = "0";
	current	= 0;
}

function viewCurrent(a0, a1) {
	playerCurrent0.textContent = a0;
	playerCurrent1.textContent = a1;

	addCurrentAnimate();
}

function addCurrentAnimate() {

	if (activePlayer == 1) {
		activecurrent1.classList.add("bounce");
	}  

	if (activePlayer == 0) {
		activecurrent0.classList.add("bounce");
	}  

}

function removeCurrentAnimate() {

	if (activecurrent0.classList.contains("bounce")) {
		activecurrent0.classList.remove("bounce")
	}

	if (activecurrent1.classList.contains("bounce")) {
		activecurrent1.classList.remove("bounce")
	}

}

function viewScore(a0, a1) {
	playerScore0.textContent = a0;
	playerScore1.textContent = a1;
}

function viewChangeActive() {
	activePlayer0.classList.toggle("player__name--active");
	activecurrent0.classList.toggle("player__current-box--active");
	activePlayer0.classList.toggle("shake");
	activePlayer1.classList.toggle("player__name--active");
	activecurrent1.classList.toggle("player__current-box--active");
	activePlayer1.classList.toggle("shake");
}

function calculateCurrent() {
	
	if ( (dice == 1) || ((current + dice) % 10) == 0) {
		if (activePlayer == 1) {activePlayer = 0} else {activePlayer = 1}
		disableCurrent();
		viewChangeActive();
	} else {
		current += dice;
		if (activePlayer == 1) {
			viewCurrent(0, current);
		} else {
			viewCurrent(current, 0);
		}	
	}
}

function diceRoll() {

	disableBtn();

	var  xRand = getRandom(max, min);
	var  yRand = getRandom(max, min);
	var  y = [1,2,6,5];
	var  x = {
	  		1: [1,4,6,3],
	  		2: [2,4,5,3],
	  		6: [6,4,1,3],
	  		5: [5,4,2,3]
	  	};

	dice = x[y[getDecimal(yRand/360) * 4]][getDecimal(xRand/360) * 4];

	//console.log("xRand -> " + xRand/90, "yRand -> " + yRand/90, "dice -> " + dice);
	// console.log("getDecimal(yRand/360) * 4 -> " + getDecimal(yRand/360) * 4);

	cube.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
	cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';

	function getRandom(max, min) {
	  return (Math.floor(Math.random() * (max-min)) + min) * 90;
	}

	function getDecimal(num) {
	  var str = "" + num;
	  var zeroPos = str.indexOf(".");
	  if (zeroPos == -1) return 0;
	  str = str.slice(zeroPos);
	  return +str;
	}

}
})();