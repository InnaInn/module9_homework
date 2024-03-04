const numberPageInput = document.querySelector('.mainInputOne');
const limitInput = document.querySelector('.mainInputTwo');
const btnNode = document.querySelector('.mainButton');
const resultNode = document.querySelector('.mainResult');

function validNumber(number) {
    return !isNaN(number) && number >= 1 && number <= 10
}

function getImages(numberPage, limit, callback) {
    if (!validNumber(numberPage) && !validNumber(limit)) {
        resultNode.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10"
    } else if (!validNumber(limit)) {
        resultNode.innerHTML = "Лимит вне диапазона от 1 до 10"
    } else if (!validNumber(numberPage)) {
        resultNode.innerHTML = "Номер страницы вне диапазона от 1 до 10"
    } else {
        let request = new XMLHttpRequest();
        request.open('GET', `https://jsonplaceholder.typicode.com/photos?_page=${numberPage}&_limit=${limit}`, true);
        request.onload = function () {
            const result = JSON.parse(request.response);
            if (callback) {
                callback(result);
            }
            localStorage.setItem("page", numberPage);
            localStorage.setItem("limit", limit);
        };
        request.send();
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
    getImages(numberPageInput.value, limitInput.value,  showResult);
});

function onKeyPress(event) {
    if (event.key === 'Enter') {
        getImages(numberPageInput.value, limitInput.value, showResult);
    }
}

numberPageInput.addEventListener('keyup', onKeyPress);

limitInput.addEventListener('keyup', onKeyPress);

document.addEventListener("DOMContentLoaded", () => {
    let page = localStorage.getItem('page');
    let limit = localStorage.getItem('limit');
    if (page !== null && limit !== null) {
        getImages(page, limit, showResult);
    }
});


