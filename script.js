'use strict';
// for(let i = 0;i < 10; i++){
//  	let tr = document.createElement('tr');
//  	for(let j = 0;j < 10;j++){
//  		let td = document.createElement('td');
//  		tr.appendChild(td);
//  	}
//  	playField.appendChild(tr);
//  }
 let startGame = document.querySelector('.startGame');
 let repeatButton = document.querySelector('.repeatButton');
 let playField = document.querySelector('.playField');
 let playFieldBody = document.querySelector('.playFieldBody');
 let playFieldHeader = document.querySelector('.playFieldHeader');

 let inputGamerName = document.querySelector('.inputGamerName');
let inputNumber = document.querySelector('.inputNumber');

let startButton = document.querySelector('.startButton');
let cancelButton = document.querySelector('.cancelButton');

let playerNameHeader = document.querySelector('.playerNameHeader');
let timerHeader = document.querySelector('.timerHeader');
let movesCountHeader = document.querySelector('.movesCountHeader');
let rightCellsHeader = document.querySelector('.rightCellsHeader');
let records = document.querySelector('.records');
let stats = document.querySelector('.stats');

let playerName;
let movesCount = 0;
let unguessedCells;
let playerNumber;
let value = 1;
let difference;
let showInterval;
let helpInterval;
let isHelpUsed;

let startDate;
let currentDate;

let gameTimer;

let randomNumbers = [];
let players = [];
let playersWithModifiedDate = [];

inputGamerName.focus();
inputGamerName.addEventListener('keydown',function(event){
	if(event.key == 'Enter' && inputGamerName.value != ''){
		inputGamerName.setAttribute('type','input');
		inputNumber.removeAttribute('disabled');
		playerName = inputGamerName.value;
		inputNumber.focus();
	}
	else{
		startButton.setAttribute('disabled','disabled');
		inputGamerName.setAttribute('type','text');
		inputNumber.setAttribute('disabled','disabled');
	}
});
inputNumber.addEventListener('keydown',function(event){
	if(event.key == 'Enter' && inputGamerName.value != ''){
		if(Number(inputNumber.value) > 0 && Number(inputNumber.value) < 11){
			inputNumber.setAttribute('type','input');
			startButton.removeAttribute('disabled');
			playerNumber = inputNumber.value;
			startButton.focus();
		}
		else{
			inputNumber.setAttribute('type','number');
			inputNumber.value = '';
			alert('Принимаются только значения от 1 до 10');
		}
	}
	else{
		inputNumber.setAttribute('type','number');
		startButton.setAttribute('disabled','disabled');
	}
});
startButton.addEventListener('click',function(event){
	unguessedCells = 'Имя игрока: ' + Number(playerNumber);
	unguessedCells = Number(playerNumber);
	rightCellsHeader.innerHTML = 'Количество не отгаданных ячеек: ' + playerNumber;
	playerNameHeader.innerHTML = playerName;
	startGame.classList.toggle('off');
	playField.classList.toggle('off');
	set(createTable(Number(playerNumber),Number(playerNumber)),playFieldBody);
	for(let i = 0; i < Number(playerNumber);i++){
		randomNumbers.push(getUniqueRandomNumber(randomNumbers));
	}
	startDate = new Date(0,0,0,0,0,0,0);
	gameTimer = setInterval(function(){
		startDate.setSeconds(startDate.getSeconds()+1);
		difference = addZero(startDate.getHours()) + ' : '
					+ addZero(startDate.getMinutes()) + ' : '
					+ addZero(startDate.getSeconds());
		timerHeader.innerHTML = 'Таймер: ' + difference;
	},1000);
	console.log(randomNumbers);
});
repeatButton.addEventListener('click',function(){
	playField.classList.toggle('off');
	startGame.classList.toggle('off');
	records.classList.toggle('off');
	inputGamerName.focus();
	inputGamerName.value = '';
	inputNumber.value = '';
	value = 1;
	records.innerHTML = '';
	movesCount = 0;
	playerName = '';
	playerNumber = 0;
	isHelpUsed = false;
	startDate = new Date(0,0,0,0,0,0,0);
	playFieldHeader.appendChild(playerNameHeader);
	playFieldHeader.appendChild(timerHeader);
	playFieldHeader.appendChild(movesCountHeader);
	playFieldHeader.appendChild(rightCellsHeader);
	inputNumber.setAttribute('type','number');
	startButton.setAttribute('disabled','disabled');
	inputGamerName.setAttribute('type','text');
	inputNumber.setAttribute('disabled','disabled');
	repeatButton.classList.toggle('off');
});
function createTable(rows,columns){
	let table = document.createElement('table');
	for(let i = 0;i < rows; i++){
		let tr = document.createElement('tr');
		for(let j = 0;j < columns; j++,value++){
			let td = document.createElement('td');
			td.classList.add('lightblue');
			td.classList.add('cell');
			td.id = value;
			td.addEventListener('click',function click(){
				if(randomNumbers.includes(Number(td.id))){
					unguessedCells--;
					rightCellsHeader.innerHTML = 'Количество не отгаданных ячеек: ' + String(unguessedCells);
					let index = randomNumbers.indexOf(Number(td.id));
					randomNumbers.splice((index),1);
					td.style.background = 'green';
					td.innerHTML = '<img src="images/happySmile.png" width="30px" height="30px">';
					td.removeEventListener('click',click);
					if(unguessedCells == 0){
						playFieldBody.removeChild(table);
						win();
					}
				}
				else{
					movesCount++;
					movesCountHeader.innerHTML = 'Количество ходов: ' + movesCount;
					td.innerHTML = '<img src="images/sadSmile.png" width="30px" height="30px">';
					td.removeEventListener('click',click);
					setInterval(function(){
						clearInterval(this);
						td.innerHTML = '';
					},1000);
					td.addEventListener('click',click);
				}
			});
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	table.setAttribute('cellpadding','5');
	table.setAttribute('border','1px');
	document.addEventListener('keyup',function(event){
		if(event.ctrlKey && event.code == 'KeyQ' && isHelpUsed != true){
			isHelpUsed = true;
			for(let i = 0;i < table.children.length;i++)
			{
				for(let j = 0;j < table.children[i].children.length;j++)
				{
					if(randomNumbers.includes(Number(table.children[i].children[j].id))){
						console.log('Условие проверяется')
						table.children[i].children[j].classList.add('red');
			 			let inter = setInterval(function(){
			 				table.children[i].children[j].classList.remove('red');
							clearInterval(inter);
							console.log('sadfsadfsdf');
			 			},1000)
			 		}
			 	}
			}
		}
	});
	return table;
}
function set(setter,holder){
	holder.appendChild(setter);
}
function getUniqueRandomNumber(array){
	let randomNumber = Math.floor(Math.random() * ((Number(playerNumber)*Number(playerNumber)) - 1 + 1)) + 1;
	return (!array.includes(randomNumber)) ? randomNumber : getUniqueRandomNumber(array);
}
function addZero(number){
	return (number < 10) ? '0' + String(number) : String(number);
}
function win(){
	clearInterval(gameTimer);
	playFieldHeader.innerHTML = '<p>Победа!</p>';
	stats.innerHTML = 'Имя игрока: ' + playerName + '<br>' +
					'Время игры : ' + difference + '<br>' +
					'Количество попыток: ' + movesCount + '<br>';
	showInterval = setInterval(function(){
		stats.innerHTML = '';
		addBest();
 		addInTable();
 		records.classList.toggle('off');
 		clearInterval(showInterval);
	},5000);
	repeatButton.classList.toggle('off');
	randomNumbers = [];
}

function addBest(){
	let time = startDate.getMinutes() * 60 + startDate.getSeconds();
	playersWithModifiedDate.push({name:playerName, time:time,guessedcells:playerNumber, movesCount:movesCount,isHelpUsed:isHelpUsed});
	sortByTime(playersWithModifiedDate);
	players = setTime(playersWithModifiedDate);
}
function sortByTime(array) {
 	array.sort((a, b) => a.time < b.time ? 1 : -1);
}
function addInTable(){
	getTableHead();
	for(let i = 0;i < players.length; i++){
		let tr = document.createElement('tr');
		for(let key in players[i]){
			if(key != 'isHelpUsed'){
				let td = document.createElement('td');
				td.innerHTML = players[i][key];
				tr.appendChild(td);
				if(key == 'name' && players[i].isHelpUsed == true){
					td.style.color = 'red';
				}
			}
		}
		records.appendChild(tr);
	}
}
function getTableHead(){
	let tr = document.createElement('tr');
	tr.innerHTML = '<td>Имя игрока</td>' +
					'<td>Время (с)</td>' +
					'<td>Количество отгаданных ячеек</td>' +
					'<td>Количество ходов</td>';
	records.appendChild(tr);
}
function setTime(playersWithModifiedDate){
	for(let i = 0;i < playersWithModifiedDate.length; i++){
		if(typeof(playersWithModifiedDate[i].time) != "string")
		playersWithModifiedDate[i].time = addZero(Math.round(playersWithModifiedDate[i].time / 60 / 60)) + ' : '
											+ addZero(Math.round(playersWithModifiedDate[i].time / 60)) + ' : '
											+ addZero(Math.round(playersWithModifiedDate[i].time % 60));
		console.log(playersWithModifiedDate[i].time);
	}
	return playersWithModifiedDate;
}

