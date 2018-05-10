console.log("Hello, France!");



// Create a blank canvas
const margin = {top: 30, bottom: 30, left: 40, right: 30};
const w = 650; 
// - margin.left - margin.right; 
const h = 650; 
// - margin.top - margin.bottom; 

// const w = 650;
// const h = 650;
let dataset = [];

let y, x;
let radius, color;

let place = document.getElementById('place');
let population = document.getElementById('population');

//Create svg element
let svg = d3.select('[id="my_map"]')
			.append("svg")
				.attr("width", w + margin.left + margin.right)
				.attr("height", h + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//Load Data
d3.tsv("data/france.tsv")
	.row((d, i) => {
		if (d.x !== "NaN" && d.y !== "NaN" && d.population !== "NaN") {
			return {
				codePostal: +d["Postal Code"],
				inseeCode:  +d.inseecode,
				place:       d.place,
				longitude:  +d.x,
				latitude:   +d.y,
				population: +d.population,
				density:    +d.density
			}
		}
	})
	.get ((error, rows) => {
		// Handle error or set up visualization here
		console.log("Loaded " + rows.length + " rows");
		if (rows.length > 0) {
			console.log('First row: ', rows[0]);
			console.log('Last row: ', rows[rows.length-1]);
			dataset = rows;

			x = d3.scaleLinear()
				.domain(d3.extent(rows, (row) => row.longitude))
				.range([0, w]);
			
			y = d3.scaleLinear()
				.domain(d3.extent(rows, (row) => row.latitude))
				.range([h, 0]);

			radius = d3.scaleLinear()
				.domain(d3.extent(rows, (row) => row.population))
				.range([1, 20]);

			color = d3.scalePow().exponent(0.2)
				.domain(d3.extent(rows, (row) => row.density))
				.range([1,0]);

			draw();
		}

	});



function draw(){
	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0, " + h + ")")
		.call(d3.axisBottom(x))

	svg.append("g")
		.attr("class", "y axis")
		// .attr("transform", "translate(0, " + w + ")")
		.call(d3.axisLeft(y))




	svg.selectAll("circle")
		.data(dataset)
		.enter()
		.append("circle")
		.attr("r", (d) => radius(d.population))
		.attr("cx", (d) => x(d.longitude) )
		.attr("cy", (d) => y(d.latitude)  )
		.attr("fill", (d) => d3.interpolateRdBu(color(d.density)))
		.on("mouseover", function(d){
			d3.select(this).transition()
				.duration(500)
				.attr("r", 20)
				.attr("opacity", 0.7);

			place.textContent = d.place;
			population.textContent = d.population + " habitants";

		})
		.on("mouseout", function(d){
			d3.select(this).transition()
				.delay(1000)
				.duration(1500)
				.attr("r", (d) => radius(d.population))
				.attr("opacity", 1)
				.attr("fill", (d) => d3.interpolateSpectral(color(d.density)));
		});



    console.log('kikoo');
}





































