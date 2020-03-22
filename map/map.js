const width = document.getElementById("container").offsetWidth * 0.95;
const height = 500;

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

d3.json("worldGeojson.json")
    .then(geojson => {
        const b = path.bounds(geojson),
            s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        cGroup.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", (d) => d.id)
            .attr("name", (d) => d.name)
            .attr("class", "country")
            .on("click", function (d) {
                d3.selectAll('.country').classed("selected", false)
                d3.select(this).classed("selected", true);
                document.getElementById("country").innerHTML = d.properties.name;
                console.log(d);
                updateCountryData(d.id);
            });

        updateCountryData('FR');
        d3.select('#FR').classed("selected", true);
        document.getElementById("country").innerHTML = 'France';
    });

const countryStats = ['c_total_cases', 'c_total_recovered', 'c_total_unresolved',
    'c_total_deaths', 'c_total_new_cases_today', 'c_total_new_deaths_today',
    'c_total_active_cases', 'c_total_serious_cases'];

const urlCountry = (code) => `https://thevirustracker.com/free-api?countryTotal=${code}`;
const updateCountryData = (code) => fetch(urlCountry(code))
    .then(res => res.json())
    .then(data => countryStats.forEach(k => {
        const span = document.getElementById(k);
        span.innerHTML = data.countrydata[0][k.slice(2)];
    }));

