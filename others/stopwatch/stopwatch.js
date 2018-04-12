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

resetbtn.addEventListener('click', function(){
	watch.reset(); 
	while (lapsDiv.firstChild) {
	    lapsDiv.removeChild(lapsDiv.firstChild);
	}
	
});

startstopbtn.addEventListener('click', function(){

	if (startstopbtn.innerHTML === 'start'){ // Need to stop
		watch.start();
		startstopbtn.innerHTML = 'stop';
	}else{
		watch.stop();
		startstopbtn.innerHTML = 'start';
	}
});


let lapID = 1;
lapsbtn.addEventListener('click', function(){
	let lap = document.createElement('p');
	lap.class = 'lap';
	lap.textContent = 'lap ' + lapID + '      ---      ' + watch.getFormattedTime();
	lapsDiv.insertBefore(lap, lapsDiv.firstChild);

	lapID += 1;
});



