console.log('Hello map');

const width = document.getElementById("container").offsetWidth * 0.95;
const height = 500;
const legendCellSize = 20;
const colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f',
    '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45',
    '#65a83e', '#599537', '#4e8230', '#437029', '#385d22',
    '#2d4a1c', '#223815'];

const svg = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height);

const projection = d3.geoNaturalEarth1()
    .scale(1)
    .translate([0, 0]);

const path = d3.geoPath()
    .pointRadius(2)
    .projection(projection);

const cGroup = svg.append("g");

var promises = [];
promises.push(d3.json("worldGeojson.json"));
promises.push(fetch("https://thevirustracker.com/timeline/map-data.json").then(res => res.json()))

Promise.all(promises).then((values) => {
    const geojson = values[0];
    const data = values[1];
    console.log(data);

    var b = path.bounds(geojson),
        s = .90 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
        t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

    projection
        .scale(s)
        .translate(t);

    cGroup.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("id", (d) => "code" + d.id)
        .attr("class", "country");

    function shortCountryName(country) {
        return country.replace("Démocratique", "Dem.").replace("République", "Rep.");
    }
});
