const router = require('express').Router();

const authService = require('../services/authService');
const { parseMongooseError } = require('../utils/errorUtils');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login(username, password);

        res.cookie('auth', token, { httpOnly: true });
    } catch (err) {
        console.log(err.message);
        return res.render('auth/login', { error: err.message });
    }

    res.redirect('/');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res, next) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return next(new Error(`Password missmatch`));
    }

    const existingUser = await authService.getUserByUsername(username);

    if (existingUser) {
        return res.render('auth/register', { error: 'User already exists!' });
    }

    try {
        const user = await authService.register(username, password);
        console.log(user);

    } catch (err) {
        const errors = parseMongooseError(err);

        return res.render('auth/register', { error: errors[0] });
    }

    res.redirect('/login');
});

router.get('/logout', (req, res) => {
    res.clearCookie('auth');

    res.redirect('/');
});

module.exports = router;