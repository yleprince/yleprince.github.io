
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}





var clock_obj = document.getElementById('clock');

function clock(){
	var time = new Date();
	var hours = (time.getHours()).toString();
	var minutes = time.getMinutes().toString();
	var seconds = time.getSeconds().toString();


	if (hours.length <2){
		hours = '0' + hours;
	}
	
	if (minutes.length <2){
		minutes = '0' + minutes;
	}

	if (seconds.length <2){
		seconds = '0' + seconds;
	}

	var clockStr = hours + ' : ' + minutes + ' . ' + seconds;

	clock_obj.textContent = clockStr;
}




clock();

setInterval(clock, 1000);








function barClock(){
	var time = new Date();

	var milliseconds = time.getMilliseconds();
	var milli_bar = document.getElementById('MillisecondsBar');
	milli_bar.style.width = milliseconds/10+'%';

	var seconds = time.getSeconds();
	var seconds_bar = document.getElementById('SecondsBar');
	seconds_bar.style.width = seconds/60*100+'%';

	var minutes = time.getMinutes();
	var minutes_bar = document.getElementById('MinutesBar');
	minutes_bar.style.width = minutes/60*100+'%';


	var hours = time.getHours();
	var hours_bar = document.getElementById('HoursBar');
	hours_bar.style.width = hours/24*100 + '%';
	//hours_bar.style.backgroundColor = 'rgba('+getRandomInt(255)+','+ getRandomInt(255)+','+ getRandomInt(255)+')';



}

barClock()
setInterval(barClock, 10);












