var _words = ["cake", "croissant", "chocolate", "cinnamon bun", "danish pastry", "soup", "camp a", "mocha", "pie", "coffee" ];
var _wordList = [
{special: "broiled lobster", description : "Lorem Ipsum", image : "lobster.png"},
{special: "noodles", description : "Lorem Ipsum", image : "noodles.png"},
{special: "pancakes", description : "Lorem Ipsum", image : "pancakes.png"},
{special: "pizza four seasons", description : "Lorem Ipsum", image : "pizza.png"},
{special: "ramen", description : "Lorem Ipsum", image : "ramen.png"},
{special: "rice", description : "Lorem Ipsum", image : "rice.png"},
{special: "salad", description : "Lorem Ipsum", image : "salad.png"},
{special: "onion soup", description : "Lorem Ipsum", image : "soup.png"},
{special: "spaghetti and meatballs", description : "Lorem Ipsum", image : "spaguetti.png"},
{special: "tacos", description : "Lorem Ipsum", image : "tacos.png"}, 
{special: "buttered shrimp", description : "Lorem Ipsum", image : "shrimp.png"}
  ];
var _imagePrefix = "./assets/images/";
var _currentWord = "";
var _remainingAttemps = 0;
var _wonGames = 5;
var _totalGames = 0;
var _loseGames = 0;
var _foundLettersIndex = [];
var usedLetters = [];
var maskedString = "";
var _gameInProgress = false;
var _currentPosition = "";
var _founLetterSound = new Audio("./assets/sound/show.wav");
var _wrongLetterSound = new Audio("./assets/sound/wrong.wav");
var _winGameSound = new Audio("./assets/sound/win.wav");
var _failSound = new Audio("./assets/sound/fail.wav");


function startGame() {
	var randomIndex = Math.floor((Math.random() * 10));
	_currentPosition = randomIndex;
	_currentWord = _wordList[randomIndex].special;
	_remainingAttemps = _currentWord.length + 4;

	for (var i = 0; i < _currentWord.length; i++) {
		_currentWord[i] == " " ? maskedString += "&nbsp " : maskedString += "_ ";
	}

	document.getElementById("hiddenWord").innerHTML = maskedString;
	diplayCoffeeAttemps();
	document.getElementById("message").innerHTML ="";
	_gameInProgress = true;
}

function diplayCoffeeAttemps(){
	var attempImages ="";
	var missedAttemps = usedLetters.length;

	for(var i = 1; i <= usedLetters.length; i++) {
		attempImages += `<img id="coffee${i}" src="./assets/images/bad-coffee.jpg">`
	}

	for(var i = 1; i <= _remainingAttemps; i++) {
		attempImages += `<img id="coffee${i}" src="./assets/images/coffee1.png">`
	}

	document.getElementById("imageAttemps").innerHTML = attempImages;
}

function showWord(){
	document.getElementById("hiddenWord").innerHTML = _currentWord;
	document.getElementById("dish").src= `${_imagePrefix}${_wordList[_currentPosition].image}`;
}
 
window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 13: // start
    	if (!_gameInProgress) {
     		clearAll();
      		startGame();
    	}
    	break;
    default:
    	if (_gameInProgress) {
      		checkForLetter(event.key,event.keyCode);
    	}
    	break;
  }
}, false);

function validateAttemps() {
	if (_remainingAttemps == 0) {
		document.getElementById("message").innerHTML ="You have reached all your attemps =(";
		_failSound.play();
		showWord();
		_gameInProgress = false;
		return;
	}
}

function checkForLetter(letter, code) {
	
	if (!(code >= 65 && code <= 90)) { // A to Z non-case sensitive
		return;
	}

	validateAttemps();

	if (_currentWord.includes(letter)) {
		getAllOcurrencesOfLetter(letter);
		replaceFoundLetters();
		_founLetterSound.play();
	} else {
		hasBeenUsed(letter);
		displayUsedLetters();
	}
}

function displayUsedLetters(){
	var displayLetter = "";

	for(var i = 0; i < usedLetters.length; i++) {
		displayLetter += `<div class="letterCircle">${usedLetters[i]}</div>`
	}

	document.getElementById("styled-letter").innerHTML = displayLetter;
}

function hasBeenUsed(letter){
	if (!usedLetters.includes(letter)) {
		//to do verificar el numero de intentos y cambiar _in progress variable
		usedLetters.push(letter);
		_remainingAttemps--;
		_wrongLetterSound.play();
		displayUsedLetters();
		diplayCoffeeAttemps();
		validateAttemps();
	}
}

function getAllOcurrencesOfLetter(letter) {

	for (var i = 0; i < _currentWord.length; i++) {
		if (_currentWord[i] == letter){
			
			if(!_foundLettersIndex.includes(i)){
				_foundLettersIndex.push(i);
			}
			 console.log( "indexes after push " + _foundLettersIndex );
			

			console.log( "currentword " + _currentWord.replace(" ", ""));
			console.log( "found indexes " +  _foundLettersIndex.length);


			
		}
	}

	if (_currentWord.split(" ").join("").length == _foundLettersIndex.length) {
				_wonGames++;
				_winGameSound.play();
				var image = document.getElementById("imgWins");
				if(_wonGames <= 6){
					image.src = `./assets/images/muffin5.png` 
					document.getElementById("message").innerHTML ="You got our biggest muffin!";
				}else {
					image.src = `./assets/images/muffin${_wonGames}.png`;
					document.getElementById("message").innerHTML ="Congratulations! Here is you muffin. Try again to make it bigger!";
				}
				
				document.getElementById("dish").src= `${_imagePrefix}${_wordList[_currentPosition].image}`;
				_gameInProgress = false;
				confeti();
			}
}

function replaceFoundLetters() {
	var replacedWord = maskedString.trim().split(" ");

	for (var i = 0; i < replacedWord.length; i++) {
		for (var j = 0; j < _foundLettersIndex.length; j++) {
			if (i == _foundLettersIndex[j]) {
				replacedWord[i] = _currentWord[_foundLettersIndex[j]];
				maskedString = replacedWord.join(" ");
			}
		}
	}

	document.getElementById("hiddenWord").innerHTML = maskedString;
	displayUsedLetters();
}

function clearAll() {
	_currentWord = "";
	_remainingAttemps = 0;
	_foundLettersIndex = [];
	usedLetters = [];
	maskedString = "";

	
	document.getElementById("hiddenWord").innerHTML = maskedString;
	document.getElementById("styled-letter").innerHTML = usedLetters;
	document.getElementById("message").innerHTML ="";
	document.getElementById("imageAttemps").innerHTML ="";
	document.getElementById("dish").src= "";
	document.getElementById("confetti-wrapper").innerHTML = "";
}

function confeti(){
	for(i=0; i<200; i++) {
		// Random rotation
		var randomRotation = Math.floor(Math.random() * 360);
		// Random width & height between 0 and viewport
		var randomWidth = Math.floor(Math.random() * Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
		var randomHeight =  Math.floor(Math.random() * Math.max(document.documentElement.clientHeight, window.innerHeight || 0));

		// Random animation-delay
		var randomAnimationDelay = Math.floor(Math.random() * 10);
		console.log(randomAnimationDelay)

		// Random colors
		var colors = ['#0CD977', '#FF1C1C', '#FF93DE', '#5767ED', '#FFC61C', '#8497B0']
		var randomColor = colors[Math.floor(Math.random() * colors.length)];

		// Create confetti piece
		var confetti = document.createElement('div');
		confetti.className = 'confetti';
		confetti.style.top=randomHeight + 'px';
		confetti.style.left=randomWidth + 'px';
		confetti.style.backgroundColor=randomColor;
		confetti.style.transform='skew(15deg) rotate(' + randomRotation + 'deg)';
		confetti.style.animationDelay=randomAnimationDelay + 's';
		document.getElementById("confetti-wrapper").appendChild(confetti);
	}
}