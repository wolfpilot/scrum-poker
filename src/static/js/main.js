// Helpers
import URLHelpers from './utils/URLHelpers';

// Reference our components so they get included
import components from '../../components';

const ready = () => {

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        return Promise.resolve();
    }

    return new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));

};

// Set up service worker
const serviceWorker = () => {

    const basePath = URLHelpers.getPath();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(`${basePath}/serviceWorker.js`, {
            scope: `${basePath}/`
        }).then(reg => {
            return reg;
            // console.log('Yey!', reg);
        }).catch(err => {
            throw Error(err);
            // console.log('Boo!', err);
        });
    }
};

// Manual init
const main = () => {

    const elements = Array.from(document.querySelectorAll('[data-module]'));

    elements.forEach(element => {

        // Convert dataset to object in a crossbrowser fashion
        const options = JSON.parse(JSON.stringify(element.dataset));

        // Using the dataset as option means you pass your options as data-setting="value" instead of
        // data-options='{"setting":"value"}'

        element.dataset.module
            .split(',')
            .forEach(path => {
                const module = path in components ? components[path] : require(path);
                const Component = module.default ? module.default : module;
                new Component(element, options); /* eslint no-new: 0 */
            });

        element.setAttribute('data-initialized', 'true');

    });

};

// Initialising func
const load = () => {

    serviceWorker();
    main();

};

ready().then(load);

// // If you want to use conditioner instead:
//
// // 1.  Remove the 'manual init' block
// // 2.  Uncomment the lines below
// // 3.  Run $ npm install conditioner-js --save
//
// import conditioner from 'conditioner-js';
//
// // When you want to use monitors, import them here
// import 'conditioner-js/dist/min/monitors/media';
//
// // Setup conditioner loader to load modules from bundle
// conditioner.setOptions({
//     loader: {
//         require: (path, callback) => {
//             const module = path in components ? components[path] : require(path);
//             return callback(module.default ? module.default : module);
//         },
//         toUrl: path => path
//     },
//     paths: {
//         monitors: 'conditioner-js/dist/min/monitors/'
//     }
// });
//
// // Initialize Conditioner
// ready().then(conditioner.init);
