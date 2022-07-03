'use sctrict';
let startGame = document.querySelector('.startGame'); 
let endGame = document.querySelector('.endGame');

let startTime;
let endTime;

let time = 5000; 
let difficulty = 'Сложный';
let name = 'Аркадий Святослав Евклидович';
let amountOfMoves = 10;

startGame.addEventListener('click',function(){
	startTime = new Date();
});
endGame.addEventListener('click',function(){
	endTime = new Date();
	time = endTime.getTime() - startTime.getTime();
});

let array = [
	{ name: "Привет Андрей Васильевич", time: 200, movesCount: 10, difficulty: 'Сложный'},
	{ name: "Пока Андрей Геннадьевич", time: 1000, movesCount: 7, difficulty: 'Легкий' },
	{ name: "Василий Андрей Васильевич", time: 500, movesCount: 9, difficulty: 'Средний'}
			];

function setNewPlayer(name,time,amountOfMoves,difficulty){
 	array.push({name:name, time:time, movesCount:amountOfMoves, difficulty:difficulty});
 	sortByTime(array);
 	console.log(array);
}
setNewPlayer(name,time,amountOfMoves,difficulty);
function sortByTime(array) {
 	 array.sort((a, b) => a.time > b.time ? 1 : -1);
}
sortByTime(array);

