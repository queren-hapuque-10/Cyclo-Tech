
var button = document.getElementById('read_button');


button.addEventListener('click', function() {
    var card = document.querySelector('.card');

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }
    
    button.textContent = 'Ler Mais';
});




var button2 = document.getElementById('read2_button');

button.addEventListener('click', function() {
    var card2 = document.querySelector('.card dois');

    card2.classList.toggle('active');

    if (card2.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }
    
    button.textContent2 = 'Ler Mais';
});



var button = document.getElementById('read3_button');

button.addEventListener('click', function() {
    var card3 = document.querySelector('.card3');

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }
    
    button.textContent = 'Ler Mais';
});




var button = document.getElementById('read4_button');

button.addEventListener('click', function() {
    var card4 = document.querySelector('.card4');

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }

    button.textContent = 'Ler Mais';
});




var button = document.getElementById('read5_button');

button.addEventListener('click', function() {
    var card5 = document.querySelector('.card5');

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }
    button.textContent = 'Ler Mais';
});




var button = document.getElementById('read6_button');

button.addEventListener('click', function() {
    var card6 = document.querySelector('.card6');

    card.classList.toggle('active');

    if (card.classList.contains('active')) {
        return button.textContent = 'Ler Menos';
    }
    
    button.textContent = 'Ler Mais';
});