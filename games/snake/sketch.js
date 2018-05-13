let s;
let scl = 10;
let foods = [];
var score;
var max_score;

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  s = new Snake();
  frameRate(10);

  f = new Food(width, height, scl);
  f.pickLocation();
  foods[0] = f;

  score = 0;
  max_score = 0;
}




function draw() {
  background(50);

  noStroke();
  fill(23, 183, 140, 100);
  textSize(64); 
  text(score,width/2-30,height/2+30);

  fill(23, 183, 140, 200);
  textSize(16); 
  text('Max: '+max_score,width*0.8,height*0.95);

  for (var i=0; i<foods.length; i++){
    f = foods[i];
    if (s.eat(f)) {
  	 f.pickLocation();
     new_f = new Food(width, height, scl);
     new_f.pickLocation();
     foods.push(new_f);
     break;
    }
  }

  score = s.score();
  if (max_score<score){
    max_score = score;
  }
  if (s.death()){foods = [foods.pop()]; };
  s.update();

  
  fill(23, 183, 140);
  for (var i=0; i<foods.length; i++){
    f = foods[i];
    rect(f.x, f.y, scl, scl);
  }
  stroke('rgb(0, 102, 153)');
  s.show();

}


function keyPressed(){
	if (keyCode == UP_ARROW){
		s.dir(0, -1);
	} else if (keyCode == DOWN_ARROW){
		s.dir(0, 1);
	} else if (keyCode == LEFT_ARROW){
		s.dir(-1, 0);
	} else if (keyCode == RIGHT_ARROW){
		s.dir(1, 0);
	}

}
