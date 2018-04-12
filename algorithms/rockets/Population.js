
function Population(){
	this.rockets = [];
	this.popsize = 100;
	this.matingpool = [];
	this.color = [random(255), random(255), random(255), 150];

	for (var i=0; i < this.popsize; i++){
		this.rockets[i] = new Rocket(new DNA(), this.color);
	}

	this.evaluate = function(){
		var maxfit = 0;

		for (var i=0; i < this.popsize; i++){
			this.rockets[i].calcFitness();
			if(this.rockets[i].fitness > maxfit){
				maxfit = this.rockets[i].fitness;
			}
		}

		for (var i=0; i < this.popsize; i++){
			this.rockets[i].fitness /= maxfit;
		}

		this.matingpool = [];
		
		for (var i=0; i < this.popsize; i++){
			var n = this.rockets[i].fitness *100;
			for (var j=0; j < n; j++){
				this.matingpool.push(this.rockets[i]);
			}
		}
	}

	this.selection = function(){
		var newRockets = [];

		for(var i = 0; i < this.rockets.length; i++){
			var parentA = random(this.matingpool).dna;
			var parentB  = random(this.matingpool).dna;
			var child = parentA.crossover(parentB);	
			child.mutation();	
			newRockets[i] = new Rocket(child, this.color);	
		}

		this.rockets = newRockets;

	}

	this.evolve = function(){
		this.evaluate();
		this.selection();
	}

	this.run = function (){
		for (var i=0; i < this.popsize; i++){
			this.rockets[i].update();
			this.rockets[i].show();
		}		

	}
}
