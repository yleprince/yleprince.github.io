function Bird(){
	this.x = width*0.15;
	this.y = height/2;

	this.gravity = 0.6;
	this.lift = -15;
	this.velocity = 0;

	this.show = function(){
		fill(255);
		ellipse(this.x, this.y, 20, 20);
	}

	this.update = function(){
		this.velocity += this.gravity;
		this.y += this.velocity;

		if (this.y > height){
			this.y = height;
			this.velocity = 0;
		}else if (this.y < 0) {
			this.y = 0;
			this.velocity = 0;		}
	}

	this.up = function(){
		this.velocity += this.lift;
	}
}