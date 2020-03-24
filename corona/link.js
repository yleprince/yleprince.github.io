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
})