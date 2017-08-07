// Utils
import DOMHelpers from '../helpers/DOMHelpers';

// Modules
import Modal from '../modal/Modal';
import Card from '../card/Card';

/**
 * @module CardModal
 */
class CardModal {

    /**
     * Class constructor
     */
    constructor() {
        this.cardModal = document.getElementById('cardModal');
        this.contentBlocks = document.querySelectorAll('[data-card-modal]');

        this.isFlipped = false;

        this.load();
    }

    /**
     *
     * @param {String} data - Card value
     * @private
     */
    _updateContent(data) {
        for (let i = 0; i < this.contentBlocks.length; i++) {
            this.contentBlocks[i].innerHTML = data;
        }
    }

    /**
     * Bind listeners
     * @private
     */
    _addEventListeners() {
        // Try setting close as default within a return statement
        this.cardModal.addEventListener('click', e => {

            const card = DOMHelpers.getClosestParent(e.target, '.card');

            if (!e.target.hasAttribute('data-card-flip')) {
                if (Card.isFlipped) {
                    Card.handleCardFlip(card);
                    setTimeout(() => {
                        Modal.handler();
                    }, 150);
                } else {
                    Modal.handler();
                }
            } else {
                Card.handleCardFlip(card);
            }
        });
    }

    /**
     * Initialise
     */
    load() {
        this._addEventListeners();
    }

}

// Export as Singleton
export default new CardModal();
