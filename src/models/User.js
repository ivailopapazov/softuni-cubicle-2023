const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [5, 'Username is too short! Minimum allowed length (5)'],
        unique: true,
        validate: {
            validator: function(value) {
                return /^[a-zA-Z0-9]+$/.test(value);
            },
            message: 'Username should consist only of latin letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password is too short!'],
        validate: /^[a-zA-Z0-9]+$/
    },
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function(password) {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
