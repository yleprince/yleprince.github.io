
function Hole(){
	this.size = random(height*0.4, height*0.9);
	this.y = random(height*0.1, height*0.9 - this.size);
	this.x = width;
	this.w = 20;
	this.speed = 3;
	this.color = [255, 255, 255];

	this.hit = false;


	this.update = function(){
		this.x -= this.speed;

		if (bird.y < this.y || bird.y > this.y + this.size){
			if (bird.x > this.x && bird.x < this.x + this.w){
				this.color = [255, 20, 20];
				this.hit = true;
			}
		}
	}

	this.show = function(){
		noStroke();
		fill(this.color);
		rect(this.x, 0, this.w, this.y);
		rect(this.x, this.y+this.size, this.w, height);
	}

	this.offscreen = function(){
		return this.x < -this.w;
	}
}
