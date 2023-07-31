// Aquí almacenaremos los productos del JSON
let productsData = [];
let productsInWatchList = []


// Función para obtener los productos guardados en la watchlist
const getProductsFromStorage = () => {
    const storageProducts = localStorage.getItem('listaPeliculas', JSON.stringify(productsData))
    return JSON.parse(storageProducts)
 }

 const productsFromStorage = getProductsFromStorage()

 // Logica para mostrar los productos guardados previamente en el localStorage
 if(productsFromStorage){
    productsInWatchList = productsFromStorage

    productsFromStorage.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.id = `watchlist-item-${product.id}`;
        listItem.innerText = product.name;
        watchlist.appendChild(listItem);
    })
 }

// Esta función renderiza los productos en el HTML
const renderProducts = () => {
    const productsContainer = document.getElementById("products");

    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    productsData.forEach(product => {
        const productHTML = `
            <div id='p-${product.id}' class='col-sm'>
                <p>${product.name}</p>
                <img src='${product.img}'>
                <button class='add btn btn-success' data-id='${product.id}'>Agregar</button>
                <button class='remove btn btn-danger' data-id='${product.id}'>Remover</button>
            </div>
        `;
        productsContainer.innerHTML += productHTML;
    });

    productsFromStorage = getProductsFromStorage
}

// Función para agregar un producto a la watchlist
const addToWatchlist = (productId) => {
    const product = productsData.find(item => item.id === productId);
    if (!product) return;

    const watchlist = document.getElementById("watchlist");
    if (!watchlist) return;

    const existingItem = watchlist.querySelector(`#watchlist-item-${product.id}`);
    if (existingItem) {
        Toastify({
            text: `${product.name} ya está en tu watchlist.`,
            duration: 2000,
            gravity: "top",
            backgroundColor: "orange",
        }).showToast();
        return;
    }

    const listItem = document.createElement("li");
    listItem.id = `watchlist-item-${product.id}`;
    listItem.innerText = product.name;
    watchlist.appendChild(listItem);
    productsInWatchList.push(product)

    Toastify({
        text: `${product.name} se ha agregado a tu watchlist.`,
        duration: 2000,
        gravity: "top",
        backgroundColor: "green",
    }).showToast();
}

// Función para remover un producto de la watchlist
const removeFromWatchlist = (productId) => {
    const product = productsData.find(item => item.id === productId);
    if (!product) return;

    const listItem = document.getElementById(`watchlist-item-${product.id}`);
    if (listItem) {
        listItem.remove();
        productsInWatchList = productsInWatchList.filter((item) => item.id !== productId)
    }
}

// Asignamos los eventos a los botones 'add' y 'remove'
document.addEventListener("click", event => {
    if (event.target.classList.contains("add")) {
        const productId = event.target.dataset.id;
        addToWatchlist(parseInt(productId));
    } else if (event.target.classList.contains("remove")) {
        const productId = event.target.dataset.id;
        removeFromWatchlist(parseInt(productId));
    }
});


// Función para almacenar los productos agregados en la watchlist
const saveWatchList = () => {
    localStorage.setItem('listaPeliculas', JSON.stringify(productsInWatchList))
}

// Función para guardar los productos en el localStorage y recargar la pagina

let enviar = document.getElementById('enviar')
enviar.onmousedown = () => {
    saveWatchList()
    alert('Muchas gracias')
    location.reload()
}

// Consumir el JSON y renderizar los productos si el localStorage está vacío

    document.addEventListener("DOMContentLoaded", () => {
        fetch("products.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar el JSON.");
                }
                return response.json();
            })
            .then(data => {
                productsData = data;
                renderProducts(productsData);
            })
            .catch(error => {
                console.error("Error al cargar el JSON:", error);
            });
    });

