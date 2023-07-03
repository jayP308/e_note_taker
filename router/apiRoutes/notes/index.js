const router = require('express').Router();
const fs = require('fs');
const path = require('path');


// stores data to the db.json
router.post('/store', async (req, res) => {
    const { title, description } = req.body;

    if (title && description) {
        fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notes) => {
            if(err) {
                return res.status(400).json({ err });
            }

            const data = JSON.parse(notes);
            
            data.push({
                id: generateUniqueId(),
                title,
                description,
                date: new Date().toLocaleString()
            });

            fs.writeFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), JSON.stringify(data, null, 2), (err) => {

                if (err) {
                    return res.status(400).json({ err });
                }

                res.json({ message: 'Notes saved successfully'});
            });
        });

    } else {
        res.status(400).json({ error: 'Note Title is Required'});
    }
});

// Use to retrieve data to db.json
router.get('/fetch', async (req, res) => {
    fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notesData) => {
      if (err) {
        return res.status(400).json({ error: 'Failed to read notes' });
      }
  
      try {
        const notes = JSON.parse(notesData);
        res.json(notes);
      } catch (error) {
        res.status(500).json({ error: 'Failed to parse notes data' });
      }
    });
  });

// Router to delete each one of the notes individually
router.delete('/delete/:id', async (req, res) => {
    const noteId = req.params.id;
  
    // Read the data from the JSON file
    fs.readFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), 'utf8', (err, notesData) => {
      if (err) {
        return res.status(400).json({ error: 'Failed to read notes' });
      }
  
      try {
        // Parse the notes data into an array
        let notes = JSON.parse(notesData);
  
        // Find the index of the note with the given id
        const index = notes.findIndex(note => note.id === noteId);
  
        if (index !== -1) {
          // Remove the note from the array
          notes.splice(index, 1);
  
          // Write the updated notes back to the JSON file
          fs.writeFile(path.join(__dirname, '..', '..', '..', 'db', 'db.json'), JSON.stringify(notes), 'utf8', (err) => {
            if (err) {
              return res.status(500).json({ error: 'Failed to delete note' });
            }
  
            res.json({ message: 'Note deleted successfully' });
          });
        } else {
          res.status(404).json({ error: 'Note not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to parse notes data' });
      }
    });
  });

// Generates unique id for each notes being created
function generateUniqueId() {
    // Generate a random string using current timestamp and a random number
    const timestamp = Date.now().toString();
    const randomNumber = Math.floor(Math.random() * 10000).toString();
  
    return `${timestamp}-${randomNumber}`;
}

module.exports = router;