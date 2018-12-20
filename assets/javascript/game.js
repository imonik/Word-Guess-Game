
var words = ["awkward a", "Banjo a", "Cat a", "Machine a", "Cake a", "Land a", "Camp a", "air a", "Battle a", "Starbucks a" ];
var currentWord = "";
var maxAttempts = 0;
var wins = 0;
var foundLettersIndex = [];
var usedLetters = [];
var maskedString = "";

function selectAWord(){
	var x = Math.floor((Math.random() * 10));
	currentWord = words[x];
	maxAttempts = 0;

	for (var i = 0; i < currentWord.length; i++) {
			currentWord[i] == " " ? maskedString += "&nbsp " : maskedString += "_ ";
	}
	 	document.getElementById("hiddenWord").innerHTML = maskedString;
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
      checkForLetter(event.key);
    break;
  }
}, false);

function checkForLetter(letter){
	if(currentWord.includes(letter)){
		usedLetters.push(letter);
		console.log(`${letter} exists in this word`);
		getAllOcurrencesOfLetter(letter);
		replaceFoundLetters();
	}else {
		maxAttempts--;
		hasBeenUsed(letter);
	}

	console.log("You have tried: " + usedLetters);
}

function hasBeenUsed(letter){
	 if(!usedLetters.includes(letter)){
		usedLetters.push(letter);
	}
}

function getAllOcurrencesOfLetter(a){
	console.log(`Letter to find is: ${a}`);
	for (var i = 0; i < currentWord.length; i++) {
		if(currentWord[i] == a){
			foundLettersIndex.push(i);
		}
	}
}

function replaceFoundLetters(){
	var replacedWord = maskedString.trim().split(" ");

	for (var i = 0; i < replacedWord.length; i++){
		for (var j = 0; j < foundLettersIndex.length; j++){
			if(i == foundLettersIndex[j]){
				replacedWord[i] = currentWord[foundLettersIndex[j]]
				maskedString = replacedWord.join(" ");
			}
		}
	}

	document.getElementById("hiddenWord").innerHTML = maskedString;
	document.getElementById("usedLetters").innerHTML = usedLetters;
}