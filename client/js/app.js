const title1 = document.getElementById('title');
const description1 = document.getElementById('description');
const title2 = document.getElementById('title1');
const description2 = document.getElementById('description1');
const titleCard1 = document.getElementById('title-card');
const plusButton = document.querySelector('.fa-plus');
const savedButton = document.getElementById('saved-button');
const addButton = document.getElementById('plus-button');
const date2 = document.getElementById('date1');

title1.addEventListener('keyup', () => {
    const titleValue = title1.value.trim();
    const descriptionValue = description1.value.trim();
  
    if (titleValue !== '' || descriptionValue !== '') {
      savedButton.style.display = 'inline-block';
    } else {
      savedButton.style.display = 'none';
    }
  });

const notesSave = async (event) => {
    event.preventDefault();

    const title = title1.value.trim();
    const description = description1.value.trim();

    const response = await fetch('/api/notes/store', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });


        if(!title) {
            alert('Please Write a title before saving');
        } 

        if(response.ok){
            window.location.reload();
        } else {
            return;
        }
}

const notesContainer = document.getElementById('title-card');

const fetchNotes = async () => {
  try {
    const response = await fetch('/api/notes/fetch', {
      method: 'GET',
    });

    if (response.ok) {
      const notes = await response.json();
      title2.textContent = notes.title;
      description2.textContent = notes.description;
      date2.textContent = notes.date;

      // Clear previous notes
      notesContainer.innerHTML = '';

      if (notes.length > 0) {
        // Select a random note from the notes array
        const randomIndex = Math.floor(Math.random() * notes.length);
        const randomNote = notes[randomIndex];

        // Set the content of title2 and description2
        title2.textContent = randomNote.title;
        description2.textContent = randomNote.description;
        date2.textContent = 'Created on:' + " " + randomNote.date;
      }

      notes.forEach((note) => {

        const listItem = document.createElement('div');
        listItem.className = 'card-note';

      
        const titleElement = document.createElement('div');
        titleElement.textContent = note.title;
        titleElement.className = 'note-title';
        listItem.appendChild(titleElement);
      
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '🗑️';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', () => {
            deleteNote(note.id);
          });
        listItem.appendChild(deleteButton);


        // Add click event listener to each note
        listItem.addEventListener('click', () => {
          // Handle the click event for each note
          title2.textContent = note.title;
          description2.textContent = note.description;
          date2.textContent = 'Created on:' + " " + note.date;
            
          title1.style.display = 'none';
          description1.style.display = 'none';

          title2.style.display = 'block';
          description2.style.display = 'block';
          date2.style.display = 'block';

          console.log('Note clicked:', note);
        });

        notesContainer.appendChild(listItem);
      });
    } else {
      console.error('Failed to fetch notes');
    }
  } catch (error) {
    console.error('Error fetching notes:', error);
  }
};

const deleteNote = async (noteId) => {
    try {
      const confirmDelete = confirm('Are you sure you want to delete this note?');
      if (!confirmDelete) {
        return; // Exit the function if the user cancels the delete operation
      }
      
      const response = await fetch(`/api/notes/delete/${noteId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        window.location.reload();
      } else {
        console.error(`Failed to delete note with ID ${noteId}.`);
      }
    } catch (err) {
      console.error('Error deleting note:', err);
    }
  };
addButton.addEventListener('click', () => {
    title2.style.display = 'none';
    description2.style.display = 'none';
    date2.style.display = 'none';

    title1.style.display = 'block';
    description1.style.display = 'block';
})

savedButton.addEventListener('click', notesSave);
plusButton.addEventListener('click', fetchNotes);



// Call the fetchNotes function to initially display the notes
fetchNotes();

