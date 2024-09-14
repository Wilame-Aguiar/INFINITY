const botao = document.getElementById('botao');
const catImagesContainer = document.getElementById('catImages');

botao.addEventListener('click', fetchCatImages);

function fetchCatImages() {
    fetch('https://api.thecatapi.com/v1/images/search?limit=1')
    .then(response => {
        if (!response.ok) {
            throw new Error('A solicitação não foi bem-sucedida');
        }
        return response.json();
    })
    .then(data => {
        catImagesContainer.innerHTML = '';

        data.forEach(cat => {
            const img = document.createElement('img');
            img.src = cat.url;
            img.alt = 'Imagem de gato';
            catImagesContainer.appendChild(img);
        });
    })
    .catch(error => {
        console.error('Erro: ', error);
    });
}

