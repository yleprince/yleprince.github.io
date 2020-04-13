const grid = document.getElementById('grid');

const values = [];

const random1_10x10i = (i) => {
    let rand;

    do {
        rand = Math.floor(Math.random() * 10 + 1 + 10 * i);
    }
    while (values.includes(rand));
    values.push(rand);
    return rand;
}

const lines = new Array(3);
for (let li = 0; li < 3; li++) {
    const line = document.createElement('div');
    line.id = `line_${li}`;
    line.classList.add('line');
    grid.appendChild(line);

    var disableds = [];
    while (disableds.length < 4) {
        var r = Math.floor(Math.random() * 9);
        if (disableds.indexOf(r) === -1) disableds.push(r);
    }
    for (let col = 0; col < 9; col++) {
        const box = document.createElement('div');
        box.id = `box_${li}_${col}`;
        box.classList.add('box');
        if (disableds.includes(col)) {
            box.classList.add('disabled');
        }
        else {
            box.innerHTML = random1_10x10i(col);
            box.addEventListener('click', function () {
                this.classList.contains('clicked') ?
                    this.classList.remove('clicked')
                    : this.classList.add('clicked');
            })
        }
        line.appendChild(box);
    };
};



const count = () => {
    let clickCounter = 1;
    Array.from(grid.childNodes)
        .forEach(line => {
            Array.from(line.childNodes)
                .forEach(b => {
                    clickCounter += b.classList.contains('clicked');
                });
        });

    console.log(clickCounter);
    return clickCounter;
}

const bingos = [
    'Y2slF40tSE9LtrG71K/giphy.webp',
    'BLjbqh9Yg2LqzBIbf6/source.gif',
    'J8NaR2tsCdNew/source.gif',
    '3oFzlUq9gpFanxX1f2/giphy.webp'
];
const celebrate = () => {
    document.getElementById('spancelebrate').innerHTML = '🎉';
    const gif = document.createElement('img');
    gif.id = 'celebrate';
    gif.style.padding = '1rem';
    gif.src = `https://i.giphy.com/media/${bingos[Math.floor(Math.random() * bingos.length)]}`;
    document.body.appendChild(gif);
}

const uncelebrate = () => {
    if (document.getElementById('celebrate')) {
        document.getElementById('celebrate').remove();
    }
    document.getElementById('spancelebrate').innerHTML = '';
}

document.body.addEventListener('click', () => {
    if (count() === 15) {
        celebrate();
    }
    else {
        uncelebrate();
    }
}, true);
