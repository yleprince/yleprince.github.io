let scl = 10;

let snakes = [];
let nb_snakes = 2;

let foods = [];
let nb_foods = 5;

var score;
var max_score;

function setup() {
  var canvas = createCanvas(600, 400);
  canvas.parent('sketch-holder');
  frameRate(10);

  for (var i = 0; i < nb_snakes; i++){
    snakes[i] = new Snake();
  }
  
  for (var i = 0; i < nb_foods; i++){
    f = new Food(width, height, scl);
    f.pickLocation();
    foods[i] = f;
  }

  score = 0;
  max_score = 0;
}




function draw() {
  background(42);

  noStroke();
  fill(0, 102, 153, 100);
  textSize(64); 
  text(score,width/2-30,height/2+30);

  fill(0, 102, 153, 200);
  textSize(16); 
  text('Max: '+max_score,width*0.8,height*0.95);

  for (var i =0; i< nb_snakes; i++){
    s = snakes[i];
    for (var j = 0; j<nb_foods; j++){
      f = foods[j];
      if (s.eat(f)){
        f.pickLocation();
      }
    }
    s.death();
    s.update();
      
  }

  // score = s.score();
  // if (max_score<score){
  //   max_score = score;
  // }

  
  fill(0, 102, 153);
  for (var j = 0; j<nb_foods; j++){
    f = foods[j];
    rect(f.x, f.y, scl, scl)
  }

  for (var i=0; i<nb_snakes; i++){  
    s = snakes[i];
    stroke(s.color);
    s.show();
  }

}


function keyPressed(){
  s0 = snakes[0];
	if (keyCode == 90){ //Z
		s0.dir(0, -1);
	} else if (keyCode == 83){ //S
		s0.dir(0, 1);
	} else if (keyCode == 81){ //Q
		s0.dir(-1, 0);
	} else if (keyCode == 68){ //D
		s0.dir(1, 0);
	}

  s1 = snakes[1];
  if (keyCode == UP_ARROW){
    s1.dir(0, -1);
  } else if (keyCode == DOWN_ARROW){
    s1.dir(0, 1);
  } else if (keyCode == LEFT_ARROW){
    s1.dir(-1, 0);
  } else if (keyCode == RIGHT_ARROW){
    s1.dir(1, 0);
  }
}
