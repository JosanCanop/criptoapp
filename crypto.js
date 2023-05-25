const btRequest = document.getElementById('btRequest')
const loader = document.getElementById('loader')
loader.style.display = 'none';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function onRequestAsync() {
    loader.style.display = 'block';
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/' + id)

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
    const priceChangePercentage = data.market_data.price_change_percentage_24h.toFixed(2);
    const priceChange = data.market_data.price_change_24h.toFixed(2);
    const arrowDirection = priceChange >= 0 ? "up" : "down";
    const arrowImage = `<img src="https://img.icons8.com/ios-glyphs/30/000000/long-arrow-${arrowDirection}.png"/>`;
    let html = "";
    html += `<div class="bg-white rounded-lg shadow-lg p-8 items-center">
        <div class="ml-4">
        <p class="font-bold mb-5">Detalles de: ${data.name}</p>
        <img class="mb-5" src="${data.image.small}" alt="moneda">
        </div>
        <div class="ml-4">
        <p class="font-semibold text-green-500 mb-4">${data.market_data.current_price.eur}€<p/>
        <p class="font-medium underline decoration-double mb-4">Porcentaje cambio de precio últimas 24h: </p>
        <p class="text-center"> ${arrowImage} ${priceChangePercentage}% (${priceChange})</p>
        </div>
 </div>`;

    document.getElementById("cryptosCoin").innerHTML = html;
}

onRequestAsync();