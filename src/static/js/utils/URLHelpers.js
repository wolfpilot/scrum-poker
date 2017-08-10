import { html as config } from '../../../../config';

/**
 * @returns {string} - The real base URL of the site
 */
const getPath = () => {
    const basePath = (window.location.pathname.split('/')[1] || '');
    const configBaseUri = config.baseUri.split('/')[1];

    return (basePath === configBaseUri ? '/' + basePath : '');
};

export default { getPath };
