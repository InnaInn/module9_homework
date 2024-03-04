const widthInput = document.querySelector('.mainInputOne');
const heightInput = document.querySelector('.mainInputTwo');
const btnNode = document.querySelector('.mainButton');
const resultNode = document.querySelector('.mainResult');


btnNode.addEventListener('click', () => {
    let width = widthInput.value;
    let height = heightInput.value;
    if (width >= 100 && width <= 300 && height >= 100 && height <= 300 && !isNaN(width) && !isNaN(height)) {
        fetch(`https://dummyimage.com/${width}x${height}/`)
            .then((response) => {
                resultNode.innerHTML = `<img src="${response.url}" class="card">`;
            })
            .catch(() => {
                console.log('error')
            });

    } else {
        resultNode.innerHTML = 'Одно из чисел вне диапазона от 100 до 300';
    }
});



