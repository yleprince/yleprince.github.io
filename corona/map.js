const m_width = document.getElementById("container").offsetWidth;
const m_height = m_width * 0.6;

const map = d3.select('#map').append("svg")
    .attr("id", "svg")
    .attr("class", "svg")
    .attr("width", m_width)
    .attr("height", m_height);

const projection = d3.geoNaturalEarth1()
    .scale(1)
    .translate([0, 0]);

const path = d3.geoPath()
    .pointRadius(2)
    .projection(projection);

const cGroup = map.append("g");

const promises = [
    d3.json(`${(lang === 'en' ? '' : '../')}worldGeojson.json`),
    fetch("https://raw.githubusercontent.com/yleprince/data/master/country.json").then(raw => raw.json())
];

Promise.all(promises)
    .then(([geojson, countries]) => {
        const getFlag = (code) => countries.find(({ iso }) => iso === code)["flag"]
        const b = path.bounds(geojson),
            s = 1 / Math.max((b[1][0] - b[0][0]) / m_width, (b[1][1] - b[0][1]) / m_height),
            t = [(m_width - s * (b[1][0] + b[0][0])) / 2, (m_height - s * (b[1][1] + b[0][1])) / 2];

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
            .attr("class", "country clickable")
            .on("click", function (d) {
                d3.selectAll('.country').classed("selected", false)
                d3.select(this).classed("selected", true);
                document.getElementById("country").innerHTML = `${(lang === 'en' ? d.properties.name : countries.find(({ iso }) => iso === d.id)['fr'])} ${getFlag(d.id)}`;
                updateCountryData(d.id);
            });
        updateCountryData('FR');
        document.getElementById("country").innerHTML = `France ${getFlag('FR')}`;
        map.select('path#FR').classed("selected", true);
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

