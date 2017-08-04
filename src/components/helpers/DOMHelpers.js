const DOMHelpers = {

    // Get nearest parent element matching selector
    getClosestParent(el, parentToBeMatched) {

        let matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {

            if (matchesSelector.call(el, parentToBeMatched)) {
                break;
            }

            el = el.parentElement;

        }

        return el;

    }

};

export default DOMHelpers;
