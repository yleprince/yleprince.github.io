let x_vals, y_vals;

let c, context;

let predict;
let coefs;

let opt_algo;
let optimizer;


let r_degree = document.getElementById('degree-range');
let lr_range = document.getElementById('lr_range');
let opt_select = document.getElementById('opt_select');
let b_reset = document.getElementById('b_reset');


const setup = () => {
	x_vals = [];
	y_vals = [];

	c = document.getElementById('p_canvas');
	c.width = 600;
	c.height = 400;

	c.addEventListener('click', e => {
		let pos = getMousePos(c, e);
		let x = map(pos.x, 0, c.width, -1, 1);
		let y = map(c.height - pos.y, 0, c.height, -1, 1);

		x_vals.push(x);
		y_vals.push(y);
	}, false);

	ctx = c.getContext('2d');

	setup_predict(+r_degree.value +1)
	r_degree.addEventListener('change', e => {
		document.getElementById('degree-html').innerHTML = +e.target.value;
		tf.tidy( () => setup_predict(+e.target.value +1));
	});

	opt_select.addEventListener('change', e => {
		opt_algo = e.target.value;
		setup_optimizer();
	});

	b_reset.addEventListener('click', e => {
		x_vals = [];
		y_vals = [];
		ctx.clearRect(0, 0, c.width, c.height);
	});

	lr_range.addEventListener('change', e => {
		document.getElementById('lr_html').innerHTML = +e.target.value;
		setup_optimizer(+e.target.value);
	});

	setup_optimizer(lr_range.value);
}


const setup_optimizer = (learning_rate) => {
 	if (opt_select.value === 'sgd'){
 		optimizer = tf.train.sgd(learning_rate);
 	} else if (opt_select.value === 'adam'){
 		optimizer = tf.train.adam(learning_rate);
 	} else if (opt_select.value === 'momentum'){
 		optimizer = tf.train.momentum(learning_rate, 0.001);
 	} else if (opt_select.value === 'rmsprop'){
 		optimizer = tf.train.rmsprop(learning_rate);
 	} else if (opt_select.value === 'adamax'){
 		optimizer = tf.train.adamax(learning_rate);
 	} else if (opt_select.value === 'adagrad'){
 		optimizer = tf.train.adagrad(learning_rate);
 	} else if (opt_select.value === 'adadelta'){
 		optimizer = tf.train.adadelta(learning_rate);
 	}




 	
}


const getMousePos = (c, e) => {
	let rect = c.getBoundingClientRect();
	return {x: e.clientX - rect.left, y:c.height - e.clientY + rect.top};
}


const map = (value, min_in, max_in, min_out, max_out) => {

	return (value-min_in)/(max_in-min_in)*(max_out-min_out)+min_out;
}

const draw_point = (x, y) => {
	const xc = map(x, -1, 1, 0, c.width);
	const yc = map(y, -1, 1, 0, c.height);

	let radius = 4;

	ctx.beginPath();
	ctx.arc(xc, yc, radius, 0, 2*Math.PI, false);
	ctx.fillStyle = '#17b78c';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#007A58';
	ctx.stroke();
}


const setup_predict = (d) => {

	coefs = [];
	for (let i=0; i<d; ++i){
		coefs.push(tf.variable(tf.scalar(Math.random()*2-1)));
	}

	predict = (x) => {

		xtf = tf.tensor1d(x);

		let y_pred = coefs[0];
 		for (let i=1; i<coefs.length; ++i){
			y_pred = y_pred.add(xtf.pow(tf.scalar(i)).mul(coefs[i]));
		}
		return y_pred;
	}
}


const loss = (pred, labels) => {
	const y_real = tf.tensor1d(labels);
	const loss_tf = pred.sub(y_real).square().mean();
	current_loss = Math.trunc(loss_tf.dataSync()[0]*10000)/100;
	return loss_tf;
}


const draw_curve = (xs, y_tf) => {


	let xc = [];
	for (let xi of xs){
		xc.push(map(xi, -1, 1, 0, c.width));
	}

	let yc = [];
	for (let yi of y_tf.dataSync()){
		yc.push(map(yi, -1, 1, 0, c.height));
	}

	for (let i=1; i<xc.length; ++i){

		ctx.beginPath();
		ctx.moveTo(xc[i-1], yc[i-1]);
		ctx.lineTo(xc[i], yc[i]);
		ctx.lineWidth = 3;
		ctx.strokeStyle = '#ffffff';
		ctx.stroke();
	}
}


const display_text = (text) => {
	ctx.font = "2em Lato sans-serif";
	ctx.fillStyle = '#ffffff';
	ctx.fillText(text,15,40);
}


const draw = () => {

	if (x_vals.length > 1){
		ctx.clearRect(0, 0, c.width, c.height);
	
		tf.tidy( () => {
			optimizer.minimize( () => loss(predict(x_vals), y_vals));

			let x_curve = [];
			for (let i=-1; i<1.1; i+=0.01){x_curve.push(i);};
			const y_curve = tf.tidy( () => predict(x_curve));

			draw_curve(x_curve, y_curve);

			display_text('Loss: ' + current_loss);
		});
	}


	for (let i=0; i<x_vals.length; ++i){
		draw_point(x_vals[i], y_vals[i]);
	}

	// console.log('TODO -> nb_tensor:',tf.memory().numTensors);
}

setup();

let t = setInterval(draw, 10);






























