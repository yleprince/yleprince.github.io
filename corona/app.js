const popButton = document.getElementById('popButton');
getParams().pop ? popButton.classList.add('clicked') : popButton.classList.remove('clicked');
popButton.addEventListener('click', () => {
    setParams('pop');
    getParams().pop ? popButton.classList.add('clicked') : popButton.classList.remove('clicked');
    updateWorld(worldwideData);
    updateCountryHtml();
});

// Set update hour
const d = new Date;
let hours = d.getHours().toString();
let min = d.getMinutes().toString();
hours = hours.length < 2 ? '0' + hours : hours;
min = min.length < 2 ? '0' + min : min;
const date_str = `${hours}:${min} ${d.toDateString()}`;
document.getElementById('source').textContent = date_str;


fetch("https://raw.githubusercontent.com/yleprince/data/master/coronavirus/countries_light.json")
    .then(raw => raw.json())
    .then(countries => {
        getCountry = (iso_) => countries.find(({ iso }) => iso === iso_);
        getFlag = (iso) => getCountry(iso).flag;
        getName = (iso) => getCountry(iso).name[lang];
        getPop = (iso) => getCountry(iso).population;
        create_map(countries);
        createLinechart(countries);
    });