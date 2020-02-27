const BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';
const select = document.querySelector('.breeds');
const dogImg = document.querySelector('.dog-image');
const spinner = document.querySelector('.spinner');

function createOptions(breedsArray) {
    breedsArray.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed;
        option.innerText = breed;
        option.id = breed;
        
        select.appendChild(option);
    });
}

function createImage(breed) {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;

    spinner.classList.add('show');
    dogImg.classList.remove('show');
    
    fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        dogImg.src = data.message;
        // spinner.classList.remove('show');
    });
}

function createInitialImage(breedsArray) {
    const index = Math.floor(Math.random() * breedsArray.length);
    const breed = breedsArray[index];
    createImage(breed);
}

function handleChange(event) {
    const breed = event.target.value;
    createImage(breed);
}

fetch(BREEDS_URL)
    .then(response => response.json())
    .then(data => {
        const breedsArray = Object.keys(data.message);
        
        createOptions(breedsArray);
        createInitialImage(breedsArray);

        select.addEventListener('change', handleChange);
    });

dogImg.addEventListener('load', function () {
    spinner.classList.remove('show');
    dogImg.classList.add('show');
});