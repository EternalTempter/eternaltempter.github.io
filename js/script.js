'use strict';
let countdownTimerMode = false;
let calculationDurationMode = false;
let serverGame = false; 
let isJoined = false;

var playerName;
var difficulty;
var gameId;
var cardsCount;

let sendSize = document.getElementById('sendSize');

document.querySelector('.inputPlayerName').addEventListener('input', function(){
	document.querySelector('.classicGameButton').disabled = document.querySelector('.inputPlayerName').value === '';
	document.querySelector('.onlineGameButton').disabled = document.querySelector('.inputPlayerName').value === '';
});
document.querySelector('.classicGameButton').addEventListener('click',function(){
	document.querySelector('.gameInfoWrap').classList.toggle('off');
	document.querySelector('.chooseModeWrap').classList.toggle('off');
	playerName = document.querySelector('.inputPlayerName').value;
});
document.querySelector('.onlineGameButton').addEventListener('click',function(){
	document.querySelector('.gameInfoWrap').classList.toggle('off');
	document.querySelector('.serverModeWrap').classList.toggle('off');
	playerName = document.querySelector('.inputPlayerName').value;
	serverGame = true;
});
document.getElementById('createServerGame').addEventListener('click',function(){
	document.querySelector('.serverModeWrap').classList.toggle('off');
	document.querySelector('.chooseModeWrap').classList.toggle('off');
});
document.getElementById('joinServerGame').addEventListener('click',function(){
	document.querySelector('.serverModeWrap').classList.toggle('off');
	document.querySelector('.joinServerGameWrap').classList.toggle('off');
});
document.getElementById('inputId').addEventListener('input', function(){
	document.getElementById('joinGame').disabled = document.getElementById('inputId').value === '';
});
document.getElementById('joinGame').addEventListener('click',function(){
	isJoined = true;
	document.querySelector('.joinServerGameWrap').classList.toggle('off');
		fetch('ajax.php?id='+Number(inputId.value)+'&do=checkId')
		.then(data => data.json())
		.then(json => setData(JSON.parse(json)))
});

document.getElementById('timerMode').addEventListener('click',function(){
	document.querySelector('.chooseModeWrap').classList.toggle('off');
	document.querySelector('.chooseTypeWrap').classList.toggle('off');
	calculationDurationMode = true;
});
document.getElementById('countdownMode').addEventListener('click',function(){
	document.querySelector('.chooseModeWrap').classList.toggle('off');
	document.querySelector('.chooseTypeWrap').classList.toggle('off');
	countdownTimerMode = true;
});

document.getElementById('sizeType').addEventListener('click',function(){
	document.querySelector('.chooseTypeWrap').classList.toggle('off');
	document.querySelector('.chooseSizeWrap').classList.toggle('off');
});
// document.getElementById('sizeInput').addEventListener('input', function(){
// 	document.getElementById('sendSize').disabled = document.getElementById('sizeInput').value === '';
// });
sendSize.addEventListener('click',function(){
	let cardsAmount = document.getElementById('sizeInput').value;
	if(cardsAmount >= 2 && cardsAmount <= 60 && cardsAmount % 2 == 0){
		document.querySelector('.chooseSizeWrap').classList.toggle('off');
		createGame([cardsAmount,cardsAmount]);
	}
	else
		document.querySelector('.error').innerHTML = 'Число должно быть четным и в диапазоне от 2 до 60';
});
document.getElementById('difficultyType').addEventListener('click',function(){
	document.querySelector('.chooseTypeWrap').classList.toggle('off');
	document.querySelector('.chooseDifficultyWrap').classList.toggle('off');
});

document.getElementById('easyDifficulty').addEventListener('click',function(){
	document.querySelector('.chooseDifficultyWrap').classList.toggle('off');
	difficulty = 'Легко';
	createGame([6,6]);
});
document.getElementById('mediumDifficulty').addEventListener('click',function(){
	document.querySelector('.chooseDifficultyWrap').classList.toggle('off');
	difficulty = 'Средне';
	createGame([10,30]);
});
document.getElementById('hardDifficulty').addEventListener('click',function(){
	document.querySelector('.chooseDifficultyWrap').classList.toggle('off');
	difficulty = 'Сложно';
	createGame([10,20]);
});

function setData(data){
	setTimeout(() => {
		difficulty = data.difficulty;
		gameId = data.id;
		cardsCount = data.cardsCount;
		(data.calculationDurationMode) ? calculationDurationMode = true : calculationDurationMode = false;
		if(difficulty = 'Легко')
			createGame([cardsCount / 2,cardsCount / 2]);
		else if(difficulty = 'Легко')
			createGame([cardsCount / 3,cardsCount / 3]);
		else
			createGame([cardsCount / 4,cardsCount / 4]);
	},500);	
}
