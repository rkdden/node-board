const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/write', (req, res) => {
    res.render('write');
});

router.post('/login', (req, res) => {
    res.render('login');
});

module.exports = router;