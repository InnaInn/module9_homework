const inputNode = document.querySelector('.mainInput');
const btnNode = document.querySelector('.mainButton');
const resultNode = document.querySelector('.mainResult');

function getImages(limit, callback) {
    if (inputNode.value >= 1 && inputNode.value <= 10) {
        let request = new XMLHttpRequest();
        request.open('GET', `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`, true);
        request.onload = function () {
            const result = JSON.parse(request.response);
            if (callback) {
                callback(result);
            }
        };
        request.send();
    } else {
        resultNode.innerHTML = 'Число вне диапазона от 1 до 10';
    }
}

function showResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img alt="photo" src="${item.url}" class="card-image"/>
        <p class="card-title">${item.title}</p>
      </div>
    `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}

btnNode.addEventListener('click', () => {
    getImages(inputNode.value, showResult);
})

inputNode.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        getImages(inputNode.value, showResult);
    }
})
