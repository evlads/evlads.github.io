/* ---------------------------- begin viewCtrl ----------------------------- */
	var viewCtrl = (function() {

		var DOMstr = {
			modalBtn: ".modal__btn",
			modalWindow: document.getElementsByClassName("modal")[0],
			btnNew: ".btn__new",
			btnHold: ".btn__hold",
			btnRoll: ".btn__roll",
			player: document.getElementsByClassName("player__name"),
			score: document.getElementsByClassName("player__score"),
			currentBox: document.getElementsByClassName("player__current-box"),
			current: document.getElementsByClassName("player__current-score"),
			cube: document.getElementById("cube")
		}

		return {

			getDOMstr: function() {
				return DOMstr;
			},

			hideModalWindow: function() {
				DOMstr.modalWindow.style.display = "none";
			},

			enableBtn: function() {
				for (var i = 0; i < arguments.length; i++) {
					document.querySelector(arguments[i]).removeAttribute('disabled');	
				};
			},

			disableBtn: function() {
				for (var i = 0; i < arguments.length; i++) {
					document.querySelector(arguments[i]).setAttribute('disabled', 'disabled');		
				};
			},

			addPlayer: function(activePlayer) {				
				DOMstr.player[activePlayer].classList.add("player__name--active");	
				DOMstr.player[activePlayer].classList.add("shake");
			},

			removePlayerColor: function(activePlayer) {
				DOMstr.player[activePlayer].classList.remove("player__name--active");	
			},

			// addPlayerAnimate: function(activePlayer) {
			// 	DOMstr.player[activePlayer].classList.add("shake");	
			// },

			removePlayerAnimate: function() {
				DOMstr.player[0].classList.remove("shake");
				DOMstr.player[1].classList.remove("shake");
			},

			addScore: function(activePlayer, score) {
				DOMstr.score[activePlayer].textContent = score;
			},

			addCurrentBoxShadow: function(activePlayer) {
				DOMstr.currentBox[activePlayer].classList.add("player__current-box--active");
			},

			removeCurrentBoxShadow: function(activePlayer) {
				DOMstr.currentBox[activePlayer].classList.remove("player__current-box--active");
			},

			// addCurrentAnimate: function(activePlayer) {
			// 	DOMstr.current[activePlayer].classList.add("bounce");
			// },

			removeCurrentAnimate: function() {
				DOMstr.current[0].classList.remove("bounce");
				DOMstr.current[1].classList.remove("bounce");			
			},

			addCurrent: function(activePlayer, current, animate) {
				DOMstr.current[activePlayer].textContent = current;
				if (animate) {
					DOMstr.current[activePlayer].classList.add("bounce");				
				}
			},

			rotateCube: function(xRand, yRand) {

				this.disableBtn(DOMstr.btnNew, DOMstr.btnHold, DOMstr.btnRoll);

				cube.style.webkitTransform = 'rotateX('+ xRand +'deg) rotateY('+ yRand +'deg)';
				cube.style.transform = 'rotateX('+ xRand +'deg) rotateY('+ yRand +'deg)';
			},

			winner: function(activePlayer) {
				DOMstr.player[activePlayer].textContent = "Переможець!";
				DOMstr.player[activePlayer].classList.add("winner");	
				this.disableBtn(DOMstr.btnHold, DOMstr.btnRoll);
			},

			removeWinner: function() {
				DOMstr.player[0].textContent = "Гравець 1";
				DOMstr.player[1].textContent = "Гравець 2";
				DOMstr.player[0].classList.remove("winner");	
				DOMstr.player[1].classList.remove("winner");	
			}
		} 

	})();
/* ----------------------------- end viewCtrl ------------------------------ */

/* ---------------------------- begin modelCtrl ---------------------------- */
	var modelCtrl = (function(view) {

		var data = {
				dice: 0, 
				current: 0, 
				activePlayer: 0,
				score: [0,0],
				xRand: 0,
    			yRand: 0,
    			oldxRand: 0,
    			oldyRand: 0,
    			newGame: false
			};

	    function getRand() {

			var  min   = 1,
			     max   = 24, //24			    
			     y = [1,2,6,5],
			     x = {
			  		1: [1,4,6,3],
			  		2: [2,4,5,3],
			  		6: [6,4,1,3],
			  		5: [5,4,2,3]
			  	};

			data.xRand = getRandom(max, min);
			data.yRand = getRandom(max, min);

			if ((data.xRand === data.oldxRand) || (data.yRand === data.oldyRand)) {
				data.xRand += 360;
				data.yRand += 360;
			}

    		data.dice = x[y[getDecimal(data.yRand/360) * 4]][getDecimal(data.xRand/360) * 4];

    		data.oldxRand = data.xRand;
    		data.oldyRand = data.yRand;

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
		};

		function changePlayer() {

			data.current = 0;
			view.addCurrent(data.activePlayer, 0, false);
			view.removePlayerColor(data.activePlayer);
			view.removeCurrentBoxShadow(data.activePlayer);

			if (data.activePlayer === 1) {data.activePlayer = 0} else {data.activePlayer = 1}

			view.addPlayer(data.activePlayer);
			view.addCurrentBoxShadow(data.activePlayer);

		};

		return {

			getData: function() {
				return data;
			},

			setData: function(name, val) {
				return data[name] = val;
			},

			init: function() {

				data.dice = 0;
				data.activePlayer = 0;
				data.current	= 0;
				data.score = [0,0];
				data.xRand = 0;
				data.yRand = 0;
				data.oldxRand = 0;
    			data.oldyRand = 0;

				view.removePlayerColor(1);
				view.removeWinner();
				view.addPlayer(0);
				view.addScore(0,0);
				view.addScore(1,0);
				view.removeCurrentBoxShadow(1);
				view.addCurrentBoxShadow(0);
				view.addCurrent(0,0,false);
				view.addCurrent(1,0,false);

				if (data.newGame === true) {

					if (data.xRand === 0) {
						data.xRand = 360; 
					} else {
						data.xRand = 0;
					}

					view.rotateCube(data.xRand, data.xRand);
				}
			},	

			roll: function() {
				data.newGame = false;
				getRand();
				view.rotateCube(data.xRand, data.yRand);
			},

			calculateCurrent: function() {
	
				if ( (data.dice === 1) || (((data.current + data.dice) % 10) === 0) ) {
					changePlayer();
				} else {
					data.current += data.dice;
				}
			},

			addScore: function() {
				
				if (data.current > 0) {
					data.score[data.activePlayer] += data.current;
					view.addScore(data.activePlayer, data.score[data.activePlayer]);

					if (data.score[data.activePlayer] >= 100) {
						view.winner(data.activePlayer);
						return;
					}

					changePlayer();
				}			
			} 

		}
	}(viewCtrl));
/* ----------------------------- end modelCtrl ----------------------------- */

/* -------------------------- begin controller ------------------------- */
	var controller = (function(view, model) {

		var DOM = view.getDOMstr(),
			getData = model.getData();
			setData = model.setData;


		return {

			setEventListeners: function() {

				document.querySelector(DOM.modalBtn).addEventListener("click", view.hideModalWindow);

				document.querySelector(DOM.btnNew).addEventListener("click", function() {
					setData('newGame', true);
					model.init();
				});	

				document.querySelector(DOM.btnRoll).addEventListener("click", function() {

					model.roll();

					view.removePlayerAnimate();
					view.removeCurrentAnimate();
					
				});

				document.querySelector(DOM.btnHold).addEventListener("click", model.addScore);

				DOM.cube.addEventListener("transitionend", function(){

					if (!getData.newGame) {
						model.calculateCurrent();
						view.addCurrent(getData.activePlayer, getData.current, true);
					}

					view.enableBtn(DOM.btnNew, DOM.btnHold, DOM.btnRoll);

				});
				
			}
		}; 

	})(viewCtrl, modelCtrl);
/* --------------------------- end controller -------------------------- */


/* --------------------- anonymous initialize function ----------------- */
	(function(model,ctrl) {

		var app = {

			init: function() {
				this.main();
				this.event();
			},

			main: function() {
				model.init();
			},

			event: function() {	
				ctrl.setEventListeners();
			}

		};

		app.init();

	}(modelCtrl, controller)); 
/* --------------------- anonymous initialize function ----------------- */