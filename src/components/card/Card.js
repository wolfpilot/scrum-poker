// Utils
import DOMHelpers from '../helpers/DOMHelpers';

/**
 * @module Card
 */
class Card {

    /**
     * Class constructor
     */
    constructor() {
        // Ideally, this should allow more than 1 selector
        this.cardFlipper = document.getElementsByClassName('card__flipper');
        this.card = document.getElementById('modal-card');
        this.isFlipped = false;
    }

    /**
     * Reveal card
     *
     * @param {Obj} el - element to be flipped
     */
    show(el) {
        el.classList.add('is-flipped');
        this.isFlipped = true;
    }

    /**
     * Hide card
     *
     * @param {Obj} el - element to be flipped
     */
    hide(el) {
        el.classList.remove('is-flipped');
        this.isFlipped = false;
    }

    /**
     * Handle card flip
     *
     * @param {HTMLElement} el - Card elem
     */
    handleCardFlip(el) {
        this.isFlipped ? this.hide(el) : this.show(el);
    }

    /**
     * @param {Object} e - Mouse click events
     * @private
     */
    _handleEvents(e) {
        let card = DOMHelpers.getClosestParent(e.target, '.card');

        if (e.target.hasAttribute('data-card-flip')) {
            this.handleCardFlip(card);
        }
    }

    /**
     * Bind event listeners
     * @private
     */
    _addEventListeners() {
        for (let i = 0; i < this.cardFlipper.length; i++) {
            this.cardFlipper[i].addEventListener('click', e => this._handleEvents(e));
        }
    }

}

// Export as Singleton
export default new Card();
