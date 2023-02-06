module.exports = class AppError {
    constructor(message, data = {}) {
        this.message = message;
        this.data = data;
    }
};