import { Quote } from './Quote.js';

class Game {
    currentStep = 0;
    lastStep = 7;

    quotes = [
        {
            text: "pan tadeusz",
            category: "utwór literacki"
        },
        {
            text: "janko muzykant",
            category: "utwór literacki"
        },
        {
            text: "mr robot",
            category: "film"
        },
        {
            text: "breaking bad",
            category: "serial"
        },
        {
            text: "ogniem i mieczem",
            category: "film"
        }
    ]

    constructor({
        lettersWrapper, 
        categoryWrapper, 
        wordWrapper, 
        outputWrapper,
        reloadButton

    }) {
        this.lettersWrapper = lettersWrapper;
        this.categoryWrapper = categoryWrapper;
        this.wordWrapper = wordWrapper;
        this.outputWrapper = outputWrapper;
        this.reloadButton = reloadButton;

        const {text, category} = this.quotes[Math.floor(Math.random() * this.quotes.length )];
        this.categoryWrapper.innerHTML = category;
        this.quote = new Quote(text);
    }

    guess(letter, event) {
        event.target.disabled = true;
        if (this.quote.guess(letter)) {
            this.drawQuote();
        } else {
            this.currentStep++;
            document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        }
        this.drawQuote();
    }

    drawLetters() {
        for (let i = 0 ; i < 26 ; i++) {
            const label = (i+10).toString(36);
            const button = document.createElement('button');
            button.innerHTML = label.toUpperCase();
            button.addEventListener('click', (event) => this.guess(label, event))
            this.lettersWrapper.appendChild(button);
        }
    }

    drawQuote() {
        const content =  this.quote.getContent();
        this.wordWrapper.innerHTML = content;
        if (!content.includes('_')) {
            this.winning();
        } 
        if (this.currentStep === this.lastStep) {
            this.loosing();
        }

    }

    start() {
        document.getElementsByClassName('step')[this.currentStep].style.opacity = 1;
        this.drawLetters();
        this.drawQuote();
        this.reloadGame();
    }

    winning() {
        this.wordWrapper.innerHTML = "GRATULACJE! WYGRYWASZ! KONIEC GRY :)";
        this.lettersWrapper.innerHTML = '';
    }
    loosing() {
        this.wordWrapper.innerHTML = "NIESTETY! PRZEGRYWASZ! KONIEC GRY :(";
        this.lettersWrapper.innerHTML = '';
    }

    reloadGame() {
        this.reloadButton.addEventListener('click', function() {
            window.location.reload() = true;
        })
    }
}

const game = new Game({
    lettersWrapper: document.getElementById('letters'),
    categoryWrapper: document.getElementById('category'),
    wordWrapper: document.getElementById('word'),
    outputWrapper: document.getElementById('output'),
    reloadButton: document.getElementById('reload')
    
});

game.start();


