//DOM
let productosEnCarrito = localStorage.getItem("productosEnCarrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoProductos = document.querySelector("#carritoProductos");
const contenedorCarritoAcciones = document.querySelector("#carritoAcciones");
const contenedorCarritoComprado = document.querySelector(".carritoComprado");
let botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");
const botonVaciar = document.querySelector(".accionesVaciarCarrito");
const contenedorTotal = document.querySelector(".total");
const botonComprar = document.querySelector("#accionesComprar");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

    //AGREGAR O QUITAR CLASE 'DISABLED'
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        contenedorCarritoProductos.innerHTML = "";

    //AGREGAR PRODUCTOS AL CARRITO
        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carritoProducto");
            div.innerHTML = `
            <img class="carritoProductoImagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carritoProductoTitulo">
                <small>Artículo:</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carritoProductoCantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carritoProductoPrecio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carritoProductoSubtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carritoProductoEliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            </div>
            `;

            contenedorCarritoProductos.append(div);
        })

    //AGREGAR O QUITAR CLASE 'DISABLED'
    }else{
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    };
    actualizarBotonEliminar();
    actualizarTotal();
}
cargarProductosCarrito();

function actualizarBotonEliminar(){
    botonesEliminar = document.querySelectorAll(".carritoProductoEliminar");

    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito);
    });
};


//ELIMINAR DEL CARRITO
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;

    const index = productosEnCarrito.findIndex(producto => producto.id == idBoton);
    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();

    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
};

//VACIAR CARRITO
botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

//CALCULAR TOTAL
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerText =  `$${totalCalculado}`;
}

//IR A PAGAR
botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){
    productosEnCarrito.length = 0;
    localStorage.setItem("productosEnCarrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoComprado.classList.remove("disabled");
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
}

