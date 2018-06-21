console.log('Linear regression');

let x_vals, y_vals;	//store xs and ys values

let m, b; // y = m*x+b

let c, context; // canvas and context

let lr_range = document.getElementById('lr_range');

let opt_algo = 'sgd';
let learning_rate = lr_range.value;

let optimizer;
setup_optimizer();

function setup_optimizer(){
 	if (opt_algo === 'sgd'){
 		optimizer = tf.train.sgd(learning_rate);
 	} else if (opt_algo === 'adam'){
 		optimizer = tf.train.adam(learning_rate);
 	} else if (opt_algo === 'momentum'){
 		console.log(opt_algo);
 		optimizer = tf.train.momentum(learning_rate, 0.001);
 	}
}

lr_range.addEventListener('change', e => {
	learning_rate = +e.target.value;
	document.getElementById('lr_html').innerHTML = +e.target.value;
	setup_optimizer();
});

let opt_select = document.getElementById('opt_select');
opt_select.addEventListener('change', e => {
	opt_algo = e.target.value;
	setup_optimizer();
});

let b_reset = document.getElementById('b_reset');
b_reset.addEventListener('click', e => {
	x_vals = [];
	y_vals = [];
	context.clearRect(0, 0, c.width, c.height);
	console.log('click reset');
});



function setup(){
	x_vals = [];
	y_vals = [];

	c = document.getElementById("l_canvas");
	c.width = 600;
	c.height = 400;

	c.addEventListener('click', e => {
		let pos = getMousePos(c, e);
		let x = map(pos.x, 0, c.width, 0, 1);
		let y = map(c.height - pos.y, 0, c.height, 0, 1);

		x_vals.push(x);
		y_vals.push(y);

	}, false);
	
	context = c.getContext('2d');

	m = tf.variable(tf.scalar(Math.random()));
	b = tf.variable(tf.scalar(Math.random()));
}

function map(value, min_in, max_in, min_out, max_out){

	return value*(max_out - min_out)/(max_in - min_in);
}

function getMousePos(c, e){
	let rect = c.getBoundingClientRect();
	return {x: e.clientX - rect.left, y: c.height - e.clientY + rect.top};
}

function draw_line(x1, y1, x2, y2){
	const x1c = map(x1, 0, 1, 0, c.width);
	const x2c = map(x2, 0, 1, 0, c.width);

	const y1c = map(y1, 0, 1, 0, c.height);
	const y2c = map(y2, 0, 1, 0, c.height);

	context.beginPath();
	context.moveTo(x1c, y1c);
	context.lineTo(x2c, y2c);
	context.lineWidth = 3;
	context.strokeStyle = '#d30000';
	context.stroke();
}

function add_point(x, y){
	const xc = map(x, 0, 1, 0, c.width);
	const yc = map(y, 0, 1, 0, c.height);

	let radius = 4;

	context.beginPath();
	context.arc(xc, yc, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 1;
	context.strokeStyle = '#003300';
	context.stroke();
}	

function predict(x){
	const xtf = tf.tensor1d(x);

	// y = mx + b;
	const y_pred = xtf.mul(m).add(b);
	return y_pred;
}

function loss(pred, labels){
	const y_real = tf.tensor1d(labels);
	return pred.sub(y_real).square().mean();
}

function draw(){

	if (x_vals.length > 1) {
		context.clearRect(0, 0, c.width, c.height);
		tf.tidy(() => {
			optimizer.minimize(() => loss(predict(x_vals), y_vals));
		const x1_2 = [0, c.width];
		const y1_2 = tf.tidy( () => predict(x1_2));

		let lineY = y1_2.dataSync();

		draw_line(x1_2[0], lineY[0], x1_2[1], lineY[1]);
		});
	}

	for (let i=0; i<x_vals.length; ++i){
		add_point(x_vals[i], y_vals[i]);
	}
}


setup();

let t = setInterval(draw, 10);

