const title = document.getElementById('title');
const description = document.getElementById('description');
const savedButton = document.getElementById('saved-button');

title.addEventListener('keyup', () => {
    document.getElementById('saved-button').style.display = 'inline-block';
});

savedButton.addEventListener('click', () => {
    const titleValue = title.value.trim();
    const descriptionValue = description.value.trim();

    if(titleValue == '') {
        alert('Both Fields Cannot Be Blank! Please Write a title before saving')
    }
})
