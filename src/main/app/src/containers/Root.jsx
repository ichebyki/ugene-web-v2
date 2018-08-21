if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod');
} else {
    const devToolsExtension = window.devToolsExtension; // Redux dev-tools exists in browser

    if (typeof devToolsExtension === "function") {
        module.exports = require('./Root.prod');
    } else {
        module.exports = require('./Root.dev');
    }
}