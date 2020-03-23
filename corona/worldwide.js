const d = new Date;

let hours = d.getHours().toString();
let minutes = d.getMinutes().toString();

hours = hours.length < 2 ? '0' + hours : hours;
minutes = minutes.length < 2 ? '0' + minutes : minutes;
const date_str = hours + ':' + minutes + ' ' + d.toDateString();

document.getElementById('source').textContent = date_str;
fetch('https://thevirustracker.com/free-api?global=stats')
    .then(res => res.json())
    .then(data => {
        console.log('data', data)
        Object.keys(data.results[0])
            .filter(k => k != 'source')
            .map(id =>
                document.getElementById(id).textContent = data.results[0][id]);
    })
    .catch(err => {

        document.body.innerHTML = '';

        const mess = document.createElement('p');
        const mess_en = "The data source is not reachable, please try again later.";
        const mess_fr = "La source des données n'est pas disponible, veuillez réessayer plus tard, merci.";
        mess.innerHTML = lang === 'en' ? mess_en : mess_fr

        document.body.appendChild(mess);

        const home = document.createElement('a');
        home.href = "https://yleprince.github.io"
        home.text = lang === 'en' ? "Home" : "Accueil";

        document.body.appendChild(home);
        console.error(err);
    });