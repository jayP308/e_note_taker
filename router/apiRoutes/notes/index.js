const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '..', '..', '..', 'db'), 'utf8', (err, notes) =>{
        if(err) {
            res.status(400).json(err);
        }
        console.log(notes);
        res.json(JSON.parse(notes));
    });
});

router.post('/', (req, res) => {
    const {notes} = req.body;

    if(notes){
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db'), 'utf8', (err, notes) =>{
            if(err) {
                res.status(400).json(err);
            }
            console.log(notes);
            res.json(JSON.parse(notes))
        });

        fs.writeFile(path.join(__dirname, '..', '..', '..', 'db'), JSON.stringify(notes, null, 1), (err) => {
            if (err) {
                return res.status(500).json({ err });
            }
            console.log(notes);
            res.json(JSON.parse(notes));
        });
    };
});


module.exports = router;