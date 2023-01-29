// Carrito inicial
const productos = [];
let compraCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

class Producto {
  constructor(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
  // <!-- Tajetas-->
  desplegarProducto() {
    const card = `
  <div class= " col-lg-4 card bg-info mb-3 mx-auto" style="max-width:24rem; height: 13rem;">
  <div class="card-header">
  <img src="./img/photography.svg" alt="icono camara">
</div>
  <h5 class="card-title text-primary text-center">Fotografía & Retoques</h5>
<div>
<p class="card-cobertura text-center text-primary">${this.nombre}</p>

      <p class="card-cobertura text-center text-primary">$${this.precio}</p>
</div>
<div> 
<button id= ${this.id} class="col-12 btnAgregar btn-primary text-info text-center">Agregar al carrito</button>
</div>
  `;
    const container = document.getElementById("tarjeta_foto");
    container.innerHTML += card;
  }
  agregarEvento() {
    const btnAgregar = document.getElementById(`${this.id}`);
    const finderProduct = productos.find((p) => p.id == this.id);
    btnAgregar.addEventListener(`click`, () => agregarAlCarrito(finderProduct));
  }
}
fetch("./local.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((prod) => {
      let newProd = new Producto(prod.id, prod.nombre, prod.precio);
      productos.push(newProd);
    });
    productos.forEach((e) => {
      e.desplegarProducto();
    });
    productos.forEach((e) => {
      e.agregarEvento();
    });
  });

// Agregar productos al carrito
function agregarAlCarrito(producto) {
  const enCarrito = compraCarrito.find((prod) => prod.id === producto.id);
  if (!enCarrito) {
    compraCarrito.push({
      ...producto,
      cantidad: 1,
    });
    localStorage.setItem("carrito", JSON.stringify(compraCarrito));
  } else {
    let carritoFiltrado = compraCarrito.filter(
      (prod) => prod.id != enCarrito.id
    );
    compraCarrito = [
      ...carritoFiltrado,
      {
        ...enCarrito,
        cantidad: enCarrito.cantidad + 1,
      },
    ];
    localStorage.setItem("carrito", JSON.stringify(compraCarrito));
  }
  contador.innerHTML = compraCarrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );
}

const contador = document.getElementById("cartCounter");
contador.innerHTML = compraCarrito.reduce(
  (acc, prod) => acc + prod.cantidad,
  0
);

const btnCarrito = document.getElementById("carrito-btn");
btnCarrito.addEventListener("click", () => mostrarCarrito());

function mostrarCarrito() {
  const carrito = document.getElementById("carrito");
  let contenidoCarrito = "";

  compraCarrito.forEach((producto) => {
    contenidoCarrito += `
    <div class="container-carrito bg-info text-primary">
      <p class="ms-3">${producto.nombre}</p>
      <p class="ms-3">$${producto.precio}</p>
      <p class="ms-3">Cantidad: ${producto.cantidad}</p>
      <p class="total-carrito ms-3"></p>
      <button class="eliminar-producto ms-3" id="${producto.id}">Eliminar</button>
    </div>
    `;
  });
  carrito.innerHTML = contenidoCarrito;

  // Eliminar productos del carrito
  const eliminarProductos = document.querySelectorAll(".eliminar-producto");
  eliminarProductos.forEach((eliminar) => {
    console.log("delim");
    eliminar.addEventListener("click", () => {
      let id = eliminar.getAttribute("id");
      eliminarProducto(id);
      mostrarCarrito();
    });
  });
}

function eliminarProducto(id) {
  let carritoFiltrado = compraCarrito.filter((producto) => producto.id != id);
  compraCarrito = carritoFiltrado;
  localStorage.setItem("carrito", JSON.stringify(compraCarrito));
  mostrarCarrito();
  contador.innerHTML = compraCarrito.reduce(
    (acc, prod) => acc + prod.cantidad,
    0
  );
}
mostrarCarrito();

// Función para sumar total de productos
function sumarProducto() {
  let sumaTotal = 0;
  for (let i = 0; i < compraCarrito.length; i++) {
    sumaTotal += compraCarrito[i].precio * compraCarrito[i].cantidad;
  }
  const totalCarrito = document.querySelectorAll(".total-carrito");
  totalCarrito.forEach((total) => {
    total.innerHTML = `TOTAL: $${sumaTotal}`;
  });
}
sumarProducto();

// Variables formulario
let nombreForm = document.querySelector("#nombre");
let correoForm = document.querySelector("#correo");

//Eventos
nombreForm.addEventListener("input", function () {
  // console.log(nombreForm.value);
  if (nombreForm.value === "") {
    console.log("Ingrese un nombre válido");
  }
});

correoForm.addEventListener("input", function () {
  // console.log(correoForm.value);
  if (correoForm.value === "") {
    console.log("Ingrese un correo electrónico válido");
  }
});

let formulario = document.querySelector("#formulario");

let info = document.querySelector(".info");

//agregar informacion al DOM
const pintarInfo = formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  info.innerHTML = Swal.fire("¡Muchas gracias por contactarte!");
});

// Guardar datos usuario
function guardarDatos(storage) {
  let name = document.getElementById("nombre").value;
  let email = document.getElementById("correo").value;

  const usuario = {
    name: user,
    email: pass,
  };

  storage.setItem("user", JSON.stringify(usuario));
}

function borrarDatos(storage) {
  storage.clear();
}
