const config = {
    production: {
        PORT: 1234,
    },
    development: {
        PORT: 5000,
    }
};

module.exports = config[process.env || 'development'];