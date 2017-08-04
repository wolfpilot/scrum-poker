/**
 * @module Modal
 */
class Modal {

    /**
     * Class constructor
     */
    constructor() {
        this.modal = document.getElementById('modal');
        this.body = document.getElementsByTagName('body')[0];

        this.isOpen = false;
    }

    /**
     * Reveal modal
     */
    show() {
        this.body.classList.add('has-scroll-locked');
        this.modal.classList.add('is-active');

        this.isOpen = true;
    }

    /**
     * Hide modal
     */
    hide() {
        this.body.classList.remove('has-scroll-locked');
        this.modal.classList.remove('is-active');

        this.isOpen = false;
    }

    /**
     * Handle next action relative to the status of the modal
     */
    handler() {
        this.isOpen ? this.hide() : this.show();
    }

}

// Export as Singleton
export default new Modal();
