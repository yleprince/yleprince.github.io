const url = 'https://thevirustracker.com/free-api?global=stats';

const d = new Date;

let hours = d.getHours().toString();
let minutes = d.getMinutes().toString();

hours = hours.length < 2 ? '0' + hours : hours;
minutes = minutes.length < 2 ? '0' + minutes : minutes;
const date_str = hours + ':' + minutes + ' ' + d.toDateString();

document.getElementById('source').textContent = date_str;

const update = () => fetch('https://thevirustracker.com/free-api?global=stats')
    .then(res => res.json())
    .then(data => {
        console.log('data', data)
        Object.keys(data.results[0])
            .filter(k => k != 'source')
            .map(id =>
                document.getElementById(id).textContent = data.results[0][id]);
    })
    .catch(console.error);

update();