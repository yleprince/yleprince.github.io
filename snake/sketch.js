let s;
let scl = 10;
let foods = [];

function setup() {
  // put setup code here
  createCanvas(300, 300);
  s = new Snake();
  frameRate(10);

  f = new Food(width, height, scl);
  f.pickLocation();
  foods[0] = f;
}




function draw() {
  // put drawing code here
  background(51);

  for (var i=0; i<foods.length; i++){
    f = foods[i];
    if (s.eat(f)) {
  	 f.pickLocation();
     new_f = new Food(width, height, scl);
     new_f.pickLocation();
     foods.push(new_f);
     break;
     console.log(foods.length);
    }
  }
  s.death();
  s.update();

  
  fill(255, 0, 100);
  for (var i=0; i<foods.length; i++){
    f = foods[i];
    rect(f.x, f.y, scl, scl);
  }
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
