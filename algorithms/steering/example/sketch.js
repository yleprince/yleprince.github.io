var agents;
var value;
function setup() {
	var canvas = createCanvas(600, 400);
	canvas.parent('sketch-holder');
	agents = [];
	value = 0;

}

function draw() {
	background(50);
	
	noStroke();
	fill(23, 183, 140, 200);
	if (agents.length > 0){
		textSize(28); 
		text(agents.length,width*0.85,height*0.95);
	} else {
		textSize(64); 
		text('Click',width/2-60,height/2+30);
	}
	


	let mouse = createVector(mouseX, mouseY);

	fill(255, 80);
	ellipse(mouse.x, mouse.y, 30, 30);


	for (var i = 0; i < agents.length; i++){
		agents[i].seek(mouse);
		agents[i].update();
		agents[i].show();
	}

}


function mouseClicked() {
  agents.push(new Agent(mouseX, mouseY));
}

function Agent(x, y){
	this.pos = createVector(x, y);
	this.vel = createVector(random(8), random(8));
	this.acc = createVector(random(3), random(3));
	this.color = [random(255), random(255), random(255), 100];
	this.r = 4;
	this.max_speed = 8;
	this.max_force = 0.2;

	this.update = function(){
		this.vel.add(this.acc);
		this.vel.limit(this.max_speed);
		this.pos.add(this.vel);

		this.acc.mult(0);
	}

	this.applyForce = function(force){
		this.acc.add(force);
	}

	// Steering force toward the given target
	this.seek = function(target){
		var desired = p5.Vector.sub(target, this.pos);

		// Scale to max speed
		desired.setMag(this.max_speed);

		// Steering = desired minus velocity
		var steer = p5.Vector.sub(desired, this.vel);
		steer.limit(this.max_force);

		this.applyForce(steer);

	}

	this.show = function(){
		var agent_angle = this.vel.heading() + PI / 2;
		fill(this.color);
		noStroke();
		push();
		translate(this.pos.x, this.pos.y);
		rotate(agent_angle);

		beginShape();
		vertex(0, -this.r*2);
		vertex(-this.r, this.r*2);
		vertex(this.r, this.r*2);
		endShape(CLOSE);
		pop();
	}
}