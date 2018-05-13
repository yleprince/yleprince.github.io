var bird;
var score;
var max_score;
var holes = [];

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  bird = new Bird();
  holes.push(new Hole());

  score = 0;
  max_score = 0;
}

function draw() {
	background(50);
	fill(23, 183, 140, 200);
	textSize(64); 
	text(score,width/2-30,height/2+30);

	fill(23, 183, 140, 200);
	textSize(16); 
	text('Max: '+max_score,width*0.8,height*0.95);

	for (var i = holes.length-1; i >= 0 ; i--){
		holes[i].update();
		holes[i].show();


		if (holes[i].offscreen()){

			if (holes[i].hit){
				score = 0;
			} else {
				score ++;
				if (score > max_score) {
					max_score = score;
				}
			}

			holes.splice(i, 1);
		}
	}

	bird.update();
	bird.show();

	if (frameCount % 40 == 0){
		holes.push(new Hole());
	}

}


function keyPressed(){
	if (key == ' '){
		bird.up();
	}
}




