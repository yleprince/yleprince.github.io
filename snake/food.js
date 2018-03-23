function Food(width, height, scl){
	this.w = width;
	this.h = height;
	this.s = scl;

	this.x = width;
	this.y = height;

	this.pickLocation = function (){
		var cols = floor(this.w/this.s);
		var rows = floor(this.h/this.s);
		this.x = floor(random(cols))*this.s;
		this.y = floor(random(rows))*this.s;
		//console.log(this.x, this.y);

	}
}