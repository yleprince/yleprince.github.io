var mutation_rate = 0.01;
var nb_populations = 2;
var populations = [];

var lifeP;
var count = 0;
var lifespan = 400;

var maxForce = 0.2;

var generationP;
var generationCount = 0;

var target;
var target_diameter = 16;

var canvas_width = 600;
var canvas_height = 400;

var rw = 100;
var rh = 10;
var rx = canvas_width/2 - rw/2;
var ry = canvas_height/2;

function setup() {
	createCanvas(canvas_width, canvas_height);
	lifeP = createP();
	generationP = createP();
	
	for (var i=0; i<nb_populations; i++){
		populations[i] = new Population();
	}

	target = createVector(width/2, canvas_height*0.1);
}

function draw() {
	
	background(50);
	lifeP.html('Life: ' + count);
	generationP.html('Generation: ' + generationCount);
	
	for (var i=0; i<nb_populations; i++){
		populations[i].run();
	}

	count++;

	if (count == lifespan){
		for (var i=0; i<nb_populations; i++){
			populations[i].evolve();
		}
		count = 0;
		generationCount ++;
	}


	noStroke();
	fill(255);

	rect(rx, ry, rw, rh);
	ellipse(target.x, target.y, target_diameter, target_diameter);

}


