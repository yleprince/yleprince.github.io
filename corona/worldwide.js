const worldPop = 7794798739;
let worldwideData;

const updateWorld = (res) => Object.keys(res)
    .filter(k => k != 'source')
    .forEach(id => {
        const value = popButton.classList.contains('clicked')
            ? 1000 * Math.round(1000000 * res[id] / worldPop) / 1000000
            : res[id];
        document.getElementById(id).textContent = `${value}${popButton.classList.contains('clicked') ? '‰' : ''}`;
    });

const displayError = () => {
    document.body.innerHTML = '';

    const mess = document.createElement('p');
    const messText = {
        en: "The data source is not reachable, please try again later.",
        fr: "La source des données n'est pas disponible, veuillez réessayer plus tard, merci.",
        es: "No se puede acceder a la fuente de datos, intente nuevamente más tarde."
    }
    mess.innerHTML = messText[lang];
    document.body.appendChild(mess);

    const home = document.createElement('a');
    home.href = "https://yleprince.github.io"
    const homeText = {
        en: 'Home',
        fr: 'Accueil',
        es: 'Inicio'
    };
    home.text = homeText[lang];
    document.body.appendChild(home);
}

fetch('https://thevirustracker.com/free-api?global=stats')
    .then(res => res.json())
    .then(data => {
        worldwideData = data.results[0];
        updateWorld(worldwideData);
    })
    .catch(err => {
        displayError();
        console.error(err);
    });