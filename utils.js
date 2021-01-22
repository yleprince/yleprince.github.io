function render(content, page_title) {
    document.title = 'YL - ' + page_title;

    let h1 = document.createElement('h1');
    h1.textContent = page_title;
    document.body.appendChild(h1);

    let container = document.getElementById('container');
    let ul = document.createElement('ul');
    container.appendChild(ul);

    for (var i = 0; i < content.length; i++) {
        let button = content[i];
        ul.appendChild(createLIfromButton(button));
    }


    function createLIfromButton(button) {
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.href = button.href_;

        let i = document.createElement('i');
        i.id = button.id_;
        i.className = button.class_;

        a.appendChild(i);
        li.appendChild(a);
        return li;
    }

    // ACTION:

    // Title of the button hovered:
    let hover_selected = document.getElementById('selected_button');


    for (var i = 0; i < content.length; i++) {
        let button = content[i];
        let element = document.getElementById(button.id_);

        element.addEventListener("mouseover", function () {
            hover_selected.style.transition = '.5s';
            hover_selected.style.opacity = '0.8';
            hover_selected.textContent = button.id_;
            element.style.color = '#17b78c';
        }, false);

        element.addEventListener("mouseout", function () {
            hover_selected.style.transition = '.5s';
            hover_selected.style.opacity = '0';
            element.style.color = '#262626';

        }, false);

    };
}
