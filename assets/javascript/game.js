var words = ["awkward a", "banjo a", "cat a", "machine a", "cake a", "land a", "camp a", "air a", "battle a", "starbucks a" ];
var currentWord = "";
var maxAttempts = 0;
var wonGames = 0;
var foundLettersIndex = [];
var usedLetters = [];
var maskedString = "";

function selectAWord(){
	var randomIndex = Math.floor((Math.random() * 10));
	currentWord = words[randomIndex];
	maxAttempts = currentWord.length-1 + 4;

	for (var i = 0; i < currentWord.length; i++) {
		currentWord[i] == " " ? maskedString += "&nbsp " : maskedString += "_ ";
	}

	document.getElementById("hiddenWord").innerHTML = maskedString;
	document.getElementById("remainingAttemps").innerHTML = `Remaining attemps: ${maxAttempts}`;
	document.getElementById("message").innerHTML ="";
}

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 13: // start
      selectAWord();
    break;

    case 38: // Exit
      //Game.player.moveUp();
    break;

    case 39: // Restart
      //Game.player.moveRight();
    break;

    default:
      checkForLetter(event.key,event.keyCode);
    break;
  }
}, false);

function checkForLetter(letter, code) {
	if(!(code >= 97 && code <= 122 ) && !(code >= 65 && code <= 90) ) {
		return;
	}

	if (maxAttempts == 0) {
		document.getElementById("message").innerHTML ="You have reached all your attemps";
		return;
	}

	if (currentWord.includes(letter)) {
		//usedLetters.push(letter);
		getAllOcurrencesOfLetter(letter);
		replaceFoundLetters();
	} else {
		hasBeenUsed(letter);
		document.getElementById("usedLetters").innerHTML = usedLetters;
	}
}

function hasBeenUsed(letter){
	if (!usedLetters.includes(letter)) {
		usedLetters.push(letter);
		maxAttempts--;
		document.getElementById("remainingAttemps").innerHTML = `Remaining attemps: ${maxAttempts}`;
	}
}

function getAllOcurrencesOfLetter(letter){
	//console.log(`Letter to find is: ${a}`);   
	for (var i = 0; i < currentWord.length; i++) {
		if (currentWord[i] == letter){
			foundLettersIndex.push(i);
			if (currentWord.replace(" ", "").length == foundLettersIndex.length) {
				wonGames++;
				document.getElementById("imgWins").src= `./assets/images/muffin${wonGames}.png`;
				document.getElementById("wins").innerHTML = `Wins: ${wonGames}`;
				document.getElementById("message").innerHTML ="YOU WON!";
				clearAll();
				window.setTimeout(selectAWord, 5000);
			}
		}
	}
}

function replaceFoundLetters(){
	var replacedWord = maskedString.trim().split(" ");

	for (var i = 0; i < replacedWord.length; i++) {
		for (var j = 0; j < foundLettersIndex.length; j++) {
			if (i == foundLettersIndex[j]) {
				replacedWord[i] = currentWord[foundLettersIndex[j]];
				maskedString = replacedWord.join(" ");
			}
		}
	}

	document.getElementById("hiddenWord").innerHTML = maskedString;
	document.getElementById("usedLetters").innerHTML = usedLetters;
}

function clearAll()
{
	currentWord = "";
	maxAttempts = 0;
	foundLettersIndex = [];
	usedLetters = [];
	maskedString = "";
	document.getElementById("hiddenWord").innerHTML = maskedString;
	document.getElementById("usedLetters").innerHTML = usedLetters;
	document.getElementById("remainingAttemps").innerHTML = `Remaining attemps: ${maxAttempts}`;
	document.getElementById("message").innerHTML ="";
}