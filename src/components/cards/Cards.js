// Utils
import DOMHelpers from '../helpers/DOMHelpers';

// Modules
import Modal from '../modal/Modal';
import CardModal from '../cardModal/CardModal';

/**
 * @module Cards
 */
class Cards {

    /**
     * Class constructor
     */
    constructor() {
        this.cards = document.getElementById('cards');

        this.load();
    }

    /**
     * @param {Object} e - Mouse click events
     * @private
     */
    _handleEvents(e) {
        let card = DOMHelpers.getClosestParent(e.target, '.card');
        let data = card.getAttribute('data-card');

        CardModal._updateContent(data);
        Modal.handler();
    }

    /**
     * Bind event listeners
     * @private
     */
    _addEventListeners() {
        this.cards.addEventListener('click', e => this._handleEvents(e));
    }

    /**
     * Initialise
     */
    load() {
        this._addEventListeners();
    }

}

export default Cards;
