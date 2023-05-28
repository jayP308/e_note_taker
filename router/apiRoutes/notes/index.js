const router = require('express').Router();
const path = require('path');
const fs = require('fs');


router.get('/', (req, res) =>{
    const {notes, title} = req.body;
    try {
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db', "notes.js"), 'utf8', (notes, err) => {
            res.json(notes);
        });
    } catch (err) {
        res.status(400).json(notes, title)
    }
});

router.post('/', (req, res) => {
    const {notes, title} = req.body;
    try {
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db'), 'utf8', (notes, err) => {
            res.json(notes);
        });
    } catch (err) {
        res.status(400).json(notes, title)
    }

});

module.exports = router;