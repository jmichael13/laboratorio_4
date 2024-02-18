
// const productoCatalogo = (producto) => {
//  return `
//     <div class="col col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
//         <article class="card">
//             <img src="./src/img/${producto.img}" class="card-img-top" alt="cocina bosh">
//             <div class="card-body">
//                 <h5 class="card-subtitle mb-2 text-muted text-center">${producto.nombre}</h5>
//                 <p class="card-text text-center">S/ ${producto.precio}</p>
//                 <button class="btn btn-primary" onclick="addcarrito(${producto.id})">Agregar</button>
//             </div>
//         </article>
//     </div>
//  `
// };




// function mostrarCatalogo() {
//     const listadoProducto = document.getElementById("listado");
//     let catalogoIndex = "";
//     for (const producto of electro) {
//         catalogoIndex += productoCatalogo(producto);
//     }

//     listadoProducto.innerHTML = catalogoIndex;

// }

// mostrarCatalogo();


const openShopping = document.querySelector(".shopping");
const closeShopping = document.querySelector(".cerrartienda");
const list = document.querySelector(".list");//catalogo
const listacarrito = document.querySelector(".listacarrito");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () =>{
    body.classList.add("active")
})

closeShopping.addEventListener("click", () => {
    body.classList.remove("active")
})

let listarcarrito=[];

const cargarproducto = () => {
    electro.forEach((value, key) => {
      let newDiv = document.createElement("div");
      newDiv.classList.add("col", "col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-3");
      newDiv.innerHTML = `
      <article class="card">
            <img src="./src/img/${value.img}" class="card-img-top" alt="cocina bosh">
            <div class="card-body">
                <h5 class="card-subtitle mb-2 text-muted text-center">${value.nombre}</h5>
                <p class="card-text text-center">S/ ${value.precio}</p>
                <button class="btn btn-primary" onclick="addcarrito(${key})">Agregar</button>
            </div>
        </article>
      `
      listado.appendChild(newDiv)
    })

}
cargarproducto()

const addcarrito = (key) => {
    if(listarcarrito[key]==null){
        listarcarrito[key] = JSON.parse(JSON.stringify(electro[key]));
        listarcarrito[key].quantity = 1
    }
    reloadcarrito();
}

const reloadcarrito = () => {
    listacarrito.innerHTML="";
    let contador = 0;
    let preciototal = 0;


     listarcarrito.forEach((value, key) => {
        preciototal = preciototal + value.precio;
         contador = contador + value.quantity;

         if(value != null){
             let newDiv = document.createElement("li");
             newDiv.innerHTML = `
                 <div><img src ="./src/img/${value.img}"></div>
                 <div class="cardtitulo">${value.nombre}</div>
                 <div class="cardprecio">${value.precio.toLocaleString()}</div>

                 <div>
                        <button style="background-color:blue;" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button style="background-color:blue;" class="cardButton" onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                 </div>
                `
             listacarrito.appendChild(newDiv);
            }

         total.innerText = preciototal.toLocaleString();
         quantity.innerText = contador;
    })

}

const changeQuantity = (key, quantity) => {
    if(quantity == 0){
         delete listarcarrito[key]
    }else{
         listarcarrito[key].quantity = quantity;
         listarcarrito[key].precio = quantity * electro[key].precio
    }

    reloadcarrito()
}