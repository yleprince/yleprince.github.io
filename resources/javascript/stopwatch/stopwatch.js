function Stopwatch(elem){

	var time = 0;
	var interval;
	var offset;


	function update(){
		if (this.isOn){
			time += delta();
		}
		elem.textContent = timeFormatter(time);
	}

	function delta(){
		var now = Date.now();
		var timePassed = now - offset;
		offset = now;
		return timePassed;
	}

	function timeFormatter(timeMilliseconds){
		var t = new Date(timeMilliseconds);
		var min = t.getMinutes().toString();
		var sec = t.getSeconds().toString();
		var mil = t.getMilliseconds().toString();

		if (min.length < 2){
			min = '0' + min;
		}

		if (sec.length < 2){
			sec = '0' + sec;
		}

		if (mil.length < 2){
			mil = '0' + mil;
		}
		if (mil.length < 3){
			mil = '0' + mil;
		}



		return min + ' : ' + sec + ' . ' + mil;
	}

	this.isOn = false;

	this.start = function(){

		if (!this.isOn){
			interval = setInterval(update.bind(this), 10);
			offset = Date.now();
			this.isOn = true;
		}
	}


	this.stop = function(){
		if (this.isOn){
			clearInterval(interval);
			interval = null;
			this.isOn = false;
		}
	}

	this.reset = function(){
		time = 0;
		elem.textContent = timeFormatter(time);
	}

	this.getFormattedTime = function(){
		return timeFormatter(time);
	}
}


let lapsDiv = document.getElementById('laps');

var stopwatch = document.getElementById('stopwatch');

var startstopbtn = document.getElementById('startstopbtn');
var lapsbtn = document.getElementById('lapsbtn');
var resetbtn = document.getElementById('resetbtn');

var watch = new Stopwatch(stopwatch);
let lapID = 1;

function reset(){
	watch.reset(); 
	lapID = 1;
	while (lapsDiv.firstChild) {
	    lapsDiv.removeChild(lapsDiv.firstChild);
	}
}

function startstop(){
	if (startstopbtn.innerHTML === 'start'){ // Need to stop
		watch.start();
		startstopbtn.innerHTML = 'stop';
	}else{
		watch.stop();
		startstopbtn.innerHTML = 'start';
	}
}

function addLap(){
	let lap = document.createElement('p');
	lap.class = 'lap';
	lap.textContent = 'lap ' + lapID + '      ---      ' + watch.getFormattedTime();
	lapsDiv.insertBefore(lap, lapsDiv.firstChild);

	lapID += 1;
}

resetbtn.addEventListener('click', reset);

startstopbtn.addEventListener('click', startstop);

lapsbtn.addEventListener('click', addLap);


document.addEventListener("keydown", keyDownTextField, false);
function keyDownTextField (e) {
  var keyCode = e.keyCode;

  if (keyCode === 32){ //space bar
  	startstop();
  }
  if (keyCode === 76){ // 'L'
  	addLap();
  }
  if (keyCode === 82){ // 'R'
  	reset();
  }
}
