const config = {
    production: {
        PORT: 1234,
        DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
        SECRET: 'SOMEPRODSECRET',
    },
    development: {
        PORT: 5000,
        DB_URI: 'mongodb://127.0.0.1:27017/cubicle',
        SECRET: 'SOMEDEVSECRET',
    }
};

module.exports = config[process.env.node_env || 'development'];