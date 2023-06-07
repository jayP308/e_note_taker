const router = require('express').Router();
const fs = require('fs');
const path = require('path');

router.get('/', (req, res) => {
    const { title, description } = req.body;

    if(title && description){
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'notes.json'), 'utf8', (err, notes) =>{
            if(err) {
                return res.status(400).json({ err });
            }

            res.json(JSON.parse(notes));
        });
    } else {
        res.status(400).json({ error: 'Note Title is Required'});
    }
});

router.post('/', (req, res) => {
    const { title, description } = req.body;

    if (title && description) {
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'notes.json'), 'utf8', (err, notes) => {
            if(err) {
                return res.status(400).json({ err });
            }

            const data = JSON.parse(notes);
            
            data.push({
                title,
                description,
            });

            fs.writeFile(path.join(__dirname, '..', '..', '..', 'db', 'notes.json'), JSON.stringify(data, null, 2), (err) => {

                if (err) {
                    return res.status(400).json({ err });
                }

                res.json({ title, description });
            });
        });

    } else {
        res.status(400).json({ error: 'Note Title is Required'});
    }
});


module.exports = router;