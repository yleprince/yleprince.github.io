var mutation_rate = 0.01;
var nb_populations = 2;
var populations = [];

var count = 0;
var lifespan = 300;

var maxForce = 0.2;

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
	var canvas = createCanvas(canvas_width, canvas_height);
	canvas.parent('sketch-holder');
	
	for (var i=0; i<nb_populations; i++){
		populations[i] = new Population();
	}

	target = createVector(width/2, canvas_height*0.1);
}

function draw() {
	
	background(50);
	fill(0, 102, 153, 200);
	textSize(16); 
	text('Generation: ' + generationCount, width*0.8, height*0.95);
	
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
	ellipse(target.x, target.y, target_diameter, target_diameter);


	rect(rx, ry, rw, rh);
	ellipse(target.x, target.y, target_diameter, target_diameter);

	fill(0, 102, 153, 200);
	rect(rx, ry, rw*count/lifespan, rh);

}


