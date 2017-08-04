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
     *
     * @param {HTMLElement} element - The HTMLElement this module is constructed upon
     * @param {Object} options - ConditionerJS's merged options
     */
    constructor(element, options) {
        this._element = element;
        this._options = options;

        this.load();
    }

    /**
     * @param {Object} e - Mouse click events
     * @private
     */
    _handleEvents(e) {
        const card = DOMHelpers.getClosestParent(e.target, '.card');
        const data = card.getAttribute('data-card');

        CardModal._updateContent(data);
        Modal.handler();
    }

    /**
     * Bind event listeners
     * @private
     */
    _addEventListeners() {
        // Delegate event listener
        this._element.addEventListener('click', e => this._handleEvents(e));
    }

    /**
     * Initialise
     */
    load() {
        this._addEventListeners();
    }

}

export default Cards;
