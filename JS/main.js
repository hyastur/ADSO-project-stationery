let carrito = [];

function verCarrito() {
  document.getElementById('carritoPanel').classList.add('abierto');
  document.getElementById('carritoOverlay').classList.add('abierto');
  renderizarCarrito();
}

function cerrarCarrito() {
  document.getElementById('carritoPanel').classList.remove('abierto');
  document.getElementById('carritoOverlay').classList.remove('abierto');
}

function agregarAlCarrito(nombre, precio) {
  const existe = carrito.find((item) => item.nombre === nombre);

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
  }

  actualizarCarrito();
  renderizarCarrito();
}

function quitarDelCarrito(nombre) {
  const index = carrito.findIndex((item) => item.nombre === nombre);

  if (index !== -1) {
    if (carrito[index].cantidad > 1) {
      carrito[index].cantidad -= 1;
    } else {
      carrito.splice(index, 1);
    }
  }

  actualizarCarrito();
}

function actualizarCarrito() {
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  document.getElementById('carritoContador').innerText = total;
}

function openLogin() {
  document.getElementById('loginModal').style.display = 'flex';
}

function login() {
  const user = document.getElementById('user').value;
  const pass = document.getElementById('pass').value;

  if (user === 'admin' && pass === '1234') {
    alert('Bienvenido ' + user);
    document.getElementById('loginModal').style.display = 'none';
  } else {
    document.getElementById('msg').innerText = 'Credenciales incorrectas';
  }
}

window.onclick = function (e) {
  const modal = document.getElementById('loginModal');
  if (e.target === modal) modal.style.display = 'none';
};

function renderizarCarrito() {
  const lista = document.getElementById('carritoLista');
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML =
      '<p style="color:#888; text-align:center; margin-top:40px;">Tu carrito está vacío</p>';
    document.getElementById('carritoTotal').innerText = '$0';
    return;
  }

  lista.innerHTML = '';

  carrito.forEach((item) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    lista.innerHTML += `
      <div class="carrito-item">
        <div>
          <strong>${item.nombre}</strong>
          <span style="display:block; font-size:0.8rem; color:#888;">$${item.precio.toLocaleString()} c/u</span>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <button onclick="quitarDelCarrito('${item.nombre}'); renderizarCarrito()">−</button>
          <span>${item.cantidad}</span>
          <button onclick="agregarAlCarrito('${item.nombre}', ${item.precio}); renderizarCarrito()">+</button>
        </div>
      </div>
    `;
  });

  document.getElementById('carritoTotal').innerText = '$' + total.toLocaleString();
}