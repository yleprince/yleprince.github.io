const colors = ['#46AFB9', '#0b6e78', '#DF8C95', '#8a2f3e'];

const countryCheckboxes = document.querySelectorAll('#selectedCountries input');
const logCheckbox = document.getElementById('logCheckbox');

const metricSelector = document.getElementById('metricSelector');
let selected = metricSelector.value;

// set the dimensions and margins of the graph
let margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
// append the svg object to the body of the page
let svg = d3.select("#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

const url = (country) => `https://thevirustracker.com/free-api?countryTimeline=${country}`;

const getData = async (country) => fetch(url(country))
    .then(res => res.json())
    .then(raw => Object.entries(raw.timelineitems[0])
        .filter(entry => entry[0] != 'stat')
        .map(([date, rest]) => ({ date: d3.timeParse("%m/%d/%Y")(date), ...rest }))
    );

const update = () => {
    const countries = Array.from(countryCheckboxes)
        .filter(checkbox => checkbox.checked)
        .map(({ value }) => value);

    const tmp_colors = [...colors].reverse();
    Array.from(countryCheckboxes)
        .forEach((c, i) => {
            c.labels[0].style.color = c.checked ? tmp_colors.pop() : '#666666';
        });

    Promise.all(countries.map(getData))
        .then(full => {
            svg.selectAll("*").remove();

            const updateMetric = (isCreated) => {
                isCreated && svg.selectAll('*').remove();

                let x = d3.scaleTime()
                    .domain(d3.extent(full.flat(), (d) => d.date))
                    .range([0, width]);
                svg.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .attr("class", "axis x")
                    .call(d3.axisBottom(x));

                selected = metricSelector.value;
                const max_y = d3.max(full.map(series => d3.max(series.map(d => d[selected]))));
                let y = (logCheckbox.checked ? d3.scaleLog() : d3.scaleLinear())
                    .domain([1, max_y])
                    .range([height, 0]);

                let yAxis = d3.axisLeft()
                    .scale(y)
                    .tickFormat(d3.format(","))
                    .ticks(4);

                svg.append("g")
                    .attr("class", "axis y")
                    .call(yAxis);

                full.map((data, i) => svg.append("path")
                    .attr("class", "line")
                    .datum(data.filter(d => d[selected] > 0))
                    .attr("fill", "none")
                    .attr("stroke", colors[i])
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x((d) => x(d.date))
                        .y((d) => y(d[selected]))
                    ));

                d3.select("#logCheckbox").on("click", function () {
                    if (this.checked) {
                        y = d3.scaleLog()
                            .domain([1, max_y])
                            .range([height, 0]);
                    } else {
                        y = d3.scaleLinear()
                            .domain([1, max_y])
                            .range([height, 0]);
                    }
                    yAxis.scale(y);
                    d3.select("g.axis.y")
                        .transition()
                        .ease(d3.easeCubicOut)
                        .duration(500)
                        .call(yAxis);

                    d3.selectAll(".line")
                        .transition()
                        .ease(d3.easeCubicOut)
                        .duration(500)
                        .attr("d", d3.line()
                            .x((d) => x(d.date))
                            .y((d) => y(d[selected]))
                        )
                })
            }
            updateMetric(false);
            metricSelector.onchange = () => updateMetric(true);
        });
}

countryCheckboxes.forEach(d => d.addEventListener('input', update));
update();
