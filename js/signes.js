const grid = document.querySelector('.grid');
const timer = document.querySelector('.timer');

const characters = [
  { signe: "Bélier", caractéristique: "susceptible" },
  { signe: "Taureau", caractéristique: "déterminé" },
  { signe: "Gémeaux", caractéristique: "curieux" },
  { signe: "Cancer", caractéristique: "émotif" },
  { signe: "Lion", caractéristique: "charismatique" },
  { signe: "Vierge", caractéristique: "perfectionniste" },
  { signe: "Balance", caractéristique: "équilibré" },
  { signe: "Scorpion", caractéristique: "passionné" },
  { signe: "Sagittaire", caractéristique: "aventurier" },
  { signe: "Capricorne", caractéristique: "ambitieux" },
  { signe: "Verseau", caractéristique: "indépendant" },
  { signe: "Poissons", caractéristique: "imaginatif" }
];

function criarArraysAleatorios() {
    // Clonar o array original para não modificar diretamente
    let copia = [...characters];

    // Embaralhar o array clonado
    copia.sort(() => Math.random() - 0.5);

    let signesRandom = [];
    let caracteristiquesRandom = [];

    for (let i = 0; i < 6; i++) {
        signesRandom.push(copia[i].signe);
        caracteristiquesRandom.push(copia[i].caractéristique);
    }

    return [signesRandom, caracteristiquesRandom];
}

const [signesRandom, caracteristiquesRandom] = criarArraysAleatorios();

function createElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');
    if (disabledCards.length === 12) {
        clearInterval(this.loop);
        alert(`Félicitations! Durée totale de: ${timer.innerHTML}`);
    }
};

const disableCards = () => {
    if (firstCard && secondCard) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
    }
};

const removeCards = () => {
    if (firstCard && secondCard) {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
    }
};

const resetCards = () => {
    firstCard = '';
    secondCard = '';
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');


    if (firstCharacter === secondCharacter) {
        disableCards();
        resetCards();
        checkEndGame();
    } else {
        setTimeout(() => {
            removeCards();
            resetCards();
        }, 2000); // Pequena pausa de 1 segundo
    }
};

const revealCard = ({ target }) => {
    if (target.parentNode.classList.contains('reveal-card') || 
        target.parentNode.classList.contains('disabled-card') ||
        firstCard && secondCard) {
        return;
    }

    target.parentNode.classList.add('reveal-card');

    if (firstCard === '') {
        firstCard = target.parentNode;
    } else {
        secondCard = target.parentNode;
        checkCards();
    }
};

function sortearArray() {
    const randomNumber = Math.floor(Math.random() * 10);
    return randomNumber % 2 === 0 ? signesRandom : caracteristiquesRandom;
}

function id(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function findValue(numero, arraySelecionado) {
    return arraySelecionado[numero];
}

function modifyArray(numero, arraySelecionado) {
    arraySelecionado[numero] = null; // Substitui o valor pelo valor null para manter o índice
    return arraySelecionado;
}

function createCard(newId, value) {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('images/${value}.png')`;


    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', newId);

    grid.appendChild(card);
}

function processArrays() {
    while (signesRandom.some(value => value !== null) || caracteristiquesRandom.some(value => value !== null)) {
        const sortedArray = sortearArray();
        if (sortedArray.every(value => value === null)) continue; // Verifica se todos os valores no array são null

        const newId = id(0, 6);
        const value = findValue(newId, sortedArray);
        if (value !== null) {
            createCard(newId, value);
        }
        modifyArray(newId, sortedArray);

        console.log(`Novo ID: ${newId}, Valor: ${value}`);
        console.log('Array Atualizado:', sortedArray);
    }
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    startTimer();
    processArrays();
};
