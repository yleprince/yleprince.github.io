let content = [
  {'id': 'algorithms',
    'href': '/algorithms',
    'class': 'fas fa-code-branch'},
  {'id': 'resources',
    'href': '/resources',
    'class': 'fas fa-database'},
  {'id': 'games',
    'href': '/games',
    'class': 'fas fa-gamepad'}
];



// Title of the button hovered:
let hover_selected = document.getElementById('selected_button');

// Array of all the B/W content to change
let page_text = document.getElementsByClassName("page_text");




for(var i = 0; i<content.length; i++){
  let button = content[i];
  let element = document.getElementById(button.id);

  element.addEventListener("mouseover", function(){
    hover_selected.style.transition ='1.5s';
    hover_selected.style.opacity = '0.8';
    hover_selected.textContent = button.id;
    element.style.color = '#588c7e';
  }, false);

  element.addEventListener("mouseout", function(){
    hover_selected.style.transition ='1.5s';
    hover_selected.style.opacity = '0';
    element.style.color = '#262626';

  }, false);

};








