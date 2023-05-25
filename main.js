const btRequest = document.getElementById('btRequest')
const loader = document.getElementById('loader')
loader.style.display = 'none';

async function onRequestAsync() {
    loader.style.display = 'block';

    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur')

        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }

        const data = await response.json()
        setTimeout(() => {
            showData(data)
            loader.style.display = 'none';

        }, 1000);
    } catch (error) {
        console.log(error)
    }
}

function showData(data) {
    let html = "";
    for (let coin of data) {
        html += `<a class="hover:scale-125" href="crypto.html?id=${coin.id}">
        <div class="bg-white rounded-lg shadow-lg">
        <div>
        <img class="object-fill" src="${coin.image}" alt="moneda">
        </div>
        <div clas="align-items-center">
        <p class="underline underline-offset-1 uppercase text-center font-bold">${coin.symbol}</p>
        </div>
 </div></a>`;
    }
    document.getElementById("cryptosCoins").innerHTML = html;
}

onRequestAsync();

const queryInput = document.getElementById("searchCoin")

async function onSearchCripto() {
    const queryValue = queryInput.value;
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${queryValue}`)

        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }

        const dataSearch = await response.json()
        showDataSearch(dataSearch.coins)
    } catch (error) {
        console.log(error)
    }
}

function showDataSearch(dataSearch) {
    document.getElementById("cryptosCoins").innerHTML = "";
    let htmlSearch = "";
    for (let coin of dataSearch) {
        htmlSearch += `<a class="hover:scale-125" href="crypto.html?id=${coin.id}">
        <div class="bg-white rounded-lg shadow-lg">
        <div>
        <img class="object-fill" src="${coin.large}" alt="moneda">
        </div>
        <div clas="align-items-center">
        <p class="underline underline-offset-1 uppercase text-center font-bold">${coin.symbol}</p>
        </div>
 </div></a>`;
    }
    document.getElementById("cryptosCoins").innerHTML = htmlSearch;
}

queryInput.addEventListener('input', async () => {
    if (queryInput.value === '') {
        onRequestAsync()
    }
});

queryInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // previene el comportamiento predeterminado del Enter
        cryptosCoins.innerHTML = ""
        onSearchCripto()
    }
});