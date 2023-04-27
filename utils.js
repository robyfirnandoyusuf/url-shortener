const { customAlphabet } = require('nanoid');
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 8); // Generate 8-character IDs

function isValidUrl(url) {
    const urlRegex = /^(http|https):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+([/?#].*)?$/i;
    return urlRegex.test(url);
}

function makeShortUrl() {
    const id = nanoid();
    return id;
}

module.exports = {
    isValidUrl,
    makeShortUrl
};