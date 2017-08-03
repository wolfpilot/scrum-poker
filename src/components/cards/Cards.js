/**
 * @module Cards
 */
class Cards {

    /**
     * @param {String} noOfCards - Number of cards in the Fibonnaci sequence
     */
    constructor(noOfCards) {
        // this.options = {};
        this.noOfCards = noOfCards;
        this.container = document.getElementById('cards');
        this.fragment = document.createDocumentFragment();

        // hard-coded for now
        this.seq = [0, 0.5, 1, 2, 3, 5, 8, 'infinity'];

        // this.generateFibSequence(11);
        this.body = document.getElementsByTagName('body')[0];
        this.cardIsActive = false;
        this.cardIsFlipped = false;

        this.bindEvents();

    }

    /**
     * Handle card active/disabled state
     *
     * @param {Object} e - Mouse click event
     */
    handleCardActive(e) {
        if (this.cardIsActive === false && this.cardIsFlipped === false) {
            document.body.style.overflow = 'hidden';
            e.target.parentNode.classList.add('is-active');
            this.cardIsActive = true;
        } else {
            document.body.style.overflow = 'auto';
            e.target.parentNode.classList.remove('is-active');
            this.cardIsActive = false;
        }
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        this.container.addEventListener('click', e => {

            if (e.target && e.target.nodeName === 'INPUT') {
                this.handleCardActive(e);
            }

            if (e.target && e.target.classList.contains('js-card-flip') && this.cardIsFlipped === false) {
                e.target.parentNode.classList.add('is-flipped');
                this.cardIsFlipped = true;
            } else {
                e.target.parentNode.classList.remove('is-flipped');
                this.cardIsFlipped = false;
            }
        });
    }

    /**
     * Generate markup for each element
     *
     * @param {Integer} index - Value of the card
     */
    generateElem(index) {

        let card = document.createElement('li');
        let cardInner = document.createElement('div');
        let content = document.createElement('div');

        card.className = 'card';
        card.appendChild(cardInner);

        cardInner.className = 'card__content';
        content.className = 'card__value';
        content.textContent = index;
        cardInner.appendChild(content);

        this.fragment.appendChild(card);
    }

    /**
     * Build HTML elements
     *
     * @param {Array} sequence - Array of cards to be created
     */
    buildElems(sequence) {

        sequence.forEach(index => this.generateElem(index));

        this.container.appendChild(this.fragment);

    }

    /**
     * Generate new element array
     *
     * @param {String} noOfCards - Number of cards in the Fibonnaci sequence
     */
    // generateFibSequence(noOfCards) {
    //
    //     let sequence = this.seq;
    //
    //     this.buildElems(sequence);
    //
    //     return noOfCards;
    //
    // }
}

export default Cards;
