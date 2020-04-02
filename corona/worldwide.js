const worldPop = 7794798739;
let worldwideData;

const updateWorld = (res) => Object.keys(res)
    .filter(k => k != 'source')
    .forEach(id => {
        const value = popButton.classList.contains('clicked')
            ? 100 * Math.round(1000000 * res[id] / worldPop) / 1000000
            : res[id];
        document.getElementById(id).textContent = `${value}${popButton.classList.contains('clicked') ? '%' : ''}`;
    });

const displayError = (err) => {
    const userMessage = document.getElementById('userMessage');

    userMessage.innerHTML = '';

    userMessage.appendChild(document.createElement('hr'));
    const mess = document.createElement('p');
    const messText = {
        en: "The data source is not reachable 😕, please try again later.",
        fr: "La source des données n'est pas disponible 😕, veuillez réessayer plus tard, merci.",
        es: "No se puede acceder a la fuente de datos 😕, intente nuevamente más tarde."
    }
    mess.innerHTML = messText[lang];
    mess.classList.add('error');
    userMessage.appendChild(mess);

    const centerContainer = document.createElement('div');
    centerContainer.className = "centerContainer";

    const home = document.createElement('button');
    home.id = 'home';
    home.addEventListener('click', () => {
        window.location.href = window.origin;
    });

    const homeText = {
        en: 'Checkout my other projects',
        fr: 'Voir mes autres projets',
        es: 'Inicio'
    };
    home.className = 'button_corona clickable';
    home.innerHTML = homeText[lang];
    centerContainer.appendChild(home);
    userMessage.appendChild(centerContainer);
    userMessage.appendChild(document.createElement('br'));
    userMessage.appendChild(document.createElement('hr'));
    userMessage.appendChild(document.createElement('br'));
}

fetch('https://api.thevirustracker.com/free-api?global=stats')
    .then(res => res.json())
    .then(data => {
        worldwideData = data.results[0];
        updateWorld(worldwideData);
    })
    .catch(err => {
        displayError(err);
        console.error(err);
    });
