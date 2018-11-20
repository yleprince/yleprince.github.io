let svg; 

let max_radius = 5;

let margin = {top: 30, right: 30, bottom: 30, left:40},
  width = 600 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;


d3.csv('data/data.csv', function(error, data){
	if (error) throw error;

	data.forEach(d => {
		d.x = +d.x;
		d.y = +d.y;
		d.count = +d.count;
		d.label = +d.label;
	})

    svg = d3.select('#scatter').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append("g")
      .attr("id", "container")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	let x = d3.scaleLinear()
	  .range([0, width])
	  .domain([d3.min(data, d => d.x), d3.max(data, d => d.x) ]).nice();

	let y = d3.scaleLinear()
	  .range([height, 0])
	  .domain([d3.min(data, d => d.y), d3.max(data, d => d.y) ]).nice();

	let size_scale = d3.scaleLinear()
	  .range([d3.min([2, max_radius]), max_radius])
	  .domain(d3.extent(data, d => d.count));

	let color = d3.scaleOrdinal(d3.schemeCategory10);

    let xAxis = d3.axisBottom()
      .scale(x);
    let yAxis = d3.axisLeft()
      .scale(y);

    let div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style('position', 'absolute');

    let dots = svg.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr('r', d => size_scale(d.count))
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .style('fill', d => color(d.label))
        .on("mouseover", function (d) {
            d3.select(this).style('fill', 'crimson');
            div.style("opacity", .9);
            let rect = document.getElementById('container').getBoundingClientRect();
            div.html(d.count)
                .style("left", (x(d.x) + margin.left - 0.3*margin.left + rect.left + size_scale(d.count))+ "px")
                .style("top", (y(d.y) + margin.top + rect.top/3) + "px")})
        .on("mouseout", function (d){
          d3.select(this).style('fill', d => color(d.label));
        })
        .on("click", function (d) {
          d3.select(this).classed('selected_data', !d3.select(this).classed('selected_data'));
        });

  // Plot axis (no legend)
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);



})













