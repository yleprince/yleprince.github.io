const parseParams = (str) => str.split('&')
    .reduce((o, k) => {
        if (k.includes('=')) {
            return Object.assign({}, o, { [k.split('=')[0]]: k.split('=')[1] })
        }
        else {
            return Object.assign({}, o, { [k]: true });
        }
    },
        {}
    );

const getParams = () => {
    const url = window.location.href;
    return url.includes('?') ? parseParams(url.split('?')[1]) : {};
}

const setParams = (newParams) => {
    const url = window.location.href;
    let str = url.includes('?') ? url.split('?')[1] : '';

    if (typeof (newParams) === 'string') {
        if (str.includes(`&${newParams}`)) {
            str = str.replace(`&${newParams}`, '');
        }
        else {
            if (str.includes(newParams)) {
                str = str.replace(newParams, '');
            }
            else {
                str = `${str}${str.length > 0 ? '&' : ''}${newParams}`;
            }
        }
    }
    else {
        const params = Object.assign({}, str.length > 0 ? parseParams(str) : {}, newParams);
        str = Object.entries(params)
            .map(e => typeof (e[1]) === 'boolean' ? `${e[0]}` : `${e[0]}=${e[1]}`)
            .join('&');
    }
    window.history.replaceState(null, null, str === '' ? './' : `?${str}`);
}

const copyUrl = () => {
    const tmp = document.createElement('input');
    document.body.appendChild(tmp);
    tmp.value = window.location.href;
    tmp.select();
    document.execCommand('copy');
    document.body.removeChild(tmp);
}

const linkButton = document.getElementById('linkButton');
linkButton.addEventListener('click', () => {
    copyUrl();
    linkButton.innerHTML = lang == 'en' ? 'copied!' : 'lien copié !';
    linkButton.classList.add('clicked');
});