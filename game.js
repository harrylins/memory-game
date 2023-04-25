const grid = document.querySelector('.grid');

const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer')

const characters = [
 'CATKK','DOG1','DOG2','DOG3','DOG4','DOG5','DOG6','DOG7','DOG8','DOG9']

const  createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

const checkEndgame = () => {

    const disabledcard = document.querySelectorAll('.disabled-card');
    
    if(disabledcard.length == 20){
        
        clearInterval(this.loop);

        setTimeout(()=>{
         alert(`Parabéns ${spanPlayer.innerHTML}! seu tempo foi ${timer.innerHTML} segundos`);   
        }, 300)
        

    }
}
const checkcard=() => {
    const firstcharacter = firstcard.getAttribute('data-character');
    const secondcharacter = secondcard.getAttribute('data-character');

    if (firstcharacter == secondcharacter) {

        firstcard.firstChild.classList.add('disabled-card')
        secondcard.firstChild.classList.add('disabled-card')
        
        firstcard='';
        secondcard='';

        checkEndgame();
        
    }else {
        setTimeout(() =>{
            firstcard.classList.remove('reveal-card')
            secondcard.classList.remove('reveal-card')  

            firstcard='';
            secondcard='';
        }, 500)

        
    }
}

let firstcard = '';
let secondcard = '';

const revealCard =({target}) =>{
    if (target.parentNode.className.includes('reveal-card')) {
        return;     
    }

    if (firstcard == '') {

        target.parentNode.classList.add('reveal-card')
        firstcard = target.parentNode;    
    } else if(secondcard == '') {
        target.parentNode.classList.add('reveal-card')
        secondcard = target.parentNode;

        checkcard();

    }
    

}
const createcard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
    
    front.style.backgroundImage =`url('./IMAGENS/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
   
    card.setAttribute('data-character', character)
    return card;

} 
const loadGame = () =>{

    const duplicateCharacters = [ ...characters, ...characters];

    const suffledArray = duplicateCharacters.sort(()=> Math.random() - 0.5);

    suffledArray.forEach((character) =>{
        
        const card = createcard(character);

        grid.appendChild(card);

    });
}

const startTimer = () => {
    
    
    this.loop= setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000)
}

window.onload = () => {

    spanPlayer.innerHTML= localStorage.getItem('player');
    startTimer();
    loadGame();    
}

