const products = [
    {id: 1, name: 'El Padrino'},
    {id: 2, name: 'Scarface'},
    {id: 3, name: 'Taxi Driver'},
    {id: 4, name: 'Avangers: Infinity War'},
    {id: 5, name: 'Batman: The Dark Knight'},
    {id: 6, name: 'Drive'},
    {id: 7, name: 'Big Hero 6'},
    {id: 8, name: 'Hercules'},
]


//Interactuando con el DOM
const catalogo = document.querySelector('#catalogo')

fetch('/products.json')
    .then(Response => Response.json())
    .then(products => {
        html = ''
products.forEach(product => {
    html += `
    <div class="grid">
    <div id="boxes" class="grid-container">
    <div id='p-${product.id}' class='col-sm'>
        <p>${product.name}</p>
        <img src='${product.img}'>
        <button class='add btn btn-success'>Agregar</button>
        <button class='remove btn btn-danger'>Remover</button>
    </div>
    </div>
    `
    
})  
    catalogo.innerHTML = html

    })    

console.log('Watchlist')

const btns = document.getElementsByTagName('button')
for (const btn of btns) {
    btn.onclick = addtoplaylist
}

function addtoplaylist(e) {
    const btn = e.target
    const id = btn.id.split('-')[1]

    const product = products.find(p => p.name == products)
    console.log('peliculas')
}


//area de almacenado
const guardado = (clave, valor) => {localStorage.setItem(clave, valor)}

guardado('listaPeliculas', JSON.stringify(products))

//eventos
let enviar = document.getElementById('enviar')
enviar.onmousedown = () => {alert('Muchas gracias')
                            location.reload()
}

//añadiendo libreria
const btnAdds = document.getElementsByClassName('add')
const btnRemove = document.getElementsByClassName('remove')

for (let i = 0; i < btnAdds.length; i++) {
    btnAdds[i].onclick = e => {
        const id = e.target.parentElement.id.split('-')[1]//para poder obtener el id de los productos
        const pelicula = products.find(p => p.id == id)
        
        Toastify({
            text: `Haz elegido ${pelicula.name}`,
            duration: 3000
        }).showToast();
    }
}

for (let i = 0; i < btnRemove.length; i++) {
    btnRemove[i].onclick = e => {
        const id = e.target.parentElement.id.split('-')[1]
        const pelicula = products.find(p => p.id == id)
        
        Toastify({
            text: `Ya no quieres ${pelicula.name}`,
            className: "danger",
            style: {
                background: "red",
            },
            duration: 3000
        }).showToast();
    }
}