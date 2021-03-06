function Snake() {
	this.x = 0;
	this.y = 0;
	this.xspeed = 1;
	this.yspeed = 0;
	this.color = [random(255), random(255), random(255)];

	this.total = 0;
	this.tail = [];

	this.eat = function(food){
		var d = dist(this.x, this.y, food.x, food.y);
		if (d<1){
			this.total++;
			return true;
		} else {
			return false;
		}
	}

	this.dir = function(x, y){
		this.xspeed = x;
		this.yspeed = y;
	}

	this.score = function(){
		return this.tail.length;
	}

	this.death = function(othersnake){
		for (var i = 0; i < this.tail.length; i++){
			var pos = this.tail[i];
			var d = dist(this.x, this.y, pos.x, pos.y);
			if (d<1){
				this.total = 0;
				this.tail = [];
			}

			for (var j = 0; j < othersnake.tail.length; j++){
				var othersnakepos = othersnake.tail[j];
				var d_othersnake = dist(this.x, this.y, othersnakepos.x, othersnakepos.y);
				if (d_othersnake<1){
					this.total = 0;
					this.tail = [];
				}
			}
		}

	}

	this.update = function () {
		if (this.total === this.tail.length){
			for (var i = 0; i<this.tail.length-1; i++){
				this.tail[i] = this.tail[i+1];
			}
		}
		this.tail[this.total-1] = createVector(this.x, this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;

		this.x = constrain(this.x, 0, width-scl);
		this.y = constrain(this.y, 0, height-scl);
	}
	
	this.show = function () {
		fill(this.color);
		//Drawing tail
		for (var i = 0; i < this.tail.length; i++){
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}
		rect(this.x, this.y, scl, scl);
	}
}


