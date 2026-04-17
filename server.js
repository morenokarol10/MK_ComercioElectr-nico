// server.js - MK-ecommerce (ajustado a tu estructura de carpetas)
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs-extra');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_DIR = path.join(__dirname, 'data');
fs.ensureDirSync(DATA_DIR);

// archivos de datos
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

// inicializar archivos si no existen
fs.ensureFileSync(USERS_FILE);
fs.ensureFileSync(ORDERS_FILE);
if (!fs.existsSync(USERS_FILE) || fs.readFileSync(USERS_FILE,'utf8').trim()==='') {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(ORDERS_FILE) || fs.readFileSync(ORDERS_FILE,'utf8').trim()==='') {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// API: obtener todos los productos
app.get('/api/products', async (req, res) => {
  try {
    const content = await fs.readFile(PRODUCTS_FILE, 'utf8');
    res.json(JSON.parse(content));
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'No se pudieron cargar productos' });
  }
});

// API: obtener 1 producto por id
app.get('/api/products/:id', async (req, res) => {
  try {
    const content = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const list = JSON.parse(content);
    const p = list.find(x => x.id === Number(req.params.id));
    if (!p) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(p);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error interno' });
  }
});

// Registro simulado
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ success:false, message:'Campos incompletos' });
  const users = JSON.parse(await fs.readFile(USERS_FILE,'utf8'));
  if (users.find(u => u.email === email)) return res.status(409).json({ success:false, message:'Email ya registrado' });
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  res.json({ success:true, user: { id:newUser.id, name:newUser.name, email:newUser.email } });
});

// Login simulado
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};
  const users = JSON.parse(await fs.readFile(USERS_FILE,'utf8'));
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ success:false, message:'Credenciales inválidas' });
  res.json({ success:true, user: { id:user.id, name:user.name, email:user.email } });
});

// Checkout simulado: guarda orden en orders.json
app.post('/api/checkout', async (req, res) => {
  const { cart = [], customer = {} } = req.body || {};
  if (!Array.isArray(cart) || cart.length === 0) return res.status(400).json({ success:false, message:'Carrito vacío' });
  const total = cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0);
  const orders = JSON.parse(await fs.readFile(ORDERS_FILE,'utf8'));
  const order = {
    id: 'ORD-' + Date.now(),
    createdAt: new Date().toISOString(),
    customer,
    cart,
    total: Number(total.toFixed(2))
  };
  orders.push(order);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2));
  res.json({ success:true, orderId: order.id, total: order.total });
});

/* ============================
   Servir archivos estáticos
   ============================ */

// servir carpeta de imágenes: /imagenes/...
app.use('/imagenes', express.static(path.join(__dirname, 'imagenes')));

// servir demás archivos estáticos (index.html, css/, js/, product.html, etc.)
app.use(express.static(path.join(__dirname)));

// SPA / fallback: devolver index.html para rutas desconocidas (útil si usas rutas client-side)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor MK-ecommerce escuchando en http://localhost:${PORT}`));
