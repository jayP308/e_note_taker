const title1 = document.getElementById('title');
const description1 = document.getElementById('description');
const savedButton = document.getElementById('saved-button');

title.addEventListener('keyup', () => {
    document.getElementById('saved-button').style.display = 'inline-block';
});

const notesSave = async (event) => {
    event.preventDefault();

    const title = title1.value.trim();
    const description = description1.value.trim();

    const response = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify({ title, description }),
            headers: { 'Content-Type': 'application/json' },
        });


        if(!title) {
            alert('Please Write a title before saving');
        } 

        if(response.ok){
            document.location.replace('/');
        } else {
            return;
        }
}

savedButton.addEventListener('click', notesSave);
