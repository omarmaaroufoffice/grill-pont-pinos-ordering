const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// In-memory storage (in production, you'd use a database)
let menuItems = [
  {
    id: '1',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon herb butter',
    price: 28.99,
    category: 'Main Course',
    available: true
  },
  {
    id: '2',
    name: 'BBQ Ribs',
    description: 'Slow-cooked baby back ribs with house BBQ sauce',
    price: 24.99,
    category: 'Main Course',
    available: true
  },
  {
    id: '3',
    name: 'Grilled Vegetable Platter',
    description: 'Seasonal vegetables grilled to perfection',
    price: 18.99,
    category: 'Main Course',
    available: true
  },
  {
    id: '4',
    name: 'Craft Beer',
    description: 'Local craft beer selection',
    price: 6.99,
    category: 'Beverages',
    available: true
  }
];

let orders = [];
let orderCounter = 1000;

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// API Routes

// Get menu items
app.get('/api/menu', (req, res) => {
  res.json(menuItems.filter(item => item.available));
});

// Get all menu items (for admin)
app.get('/api/admin/menu', (req, res) => {
  res.json(menuItems);
});

// Add menu item
app.post('/api/admin/menu', (req, res) => {
  const { name, description, price, category } = req.body;
  const newItem = {
    id: uuidv4(),
    name,
    description,
    price: parseFloat(price),
    category,
    available: true
  };
  menuItems.push(newItem);
  res.json(newItem);
});

// Update menu item
app.put('/api/admin/menu/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, category, available } = req.body;
  
  const itemIndex = menuItems.findIndex(item => item.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  
  menuItems[itemIndex] = {
    ...menuItems[itemIndex],
    name,
    description,
    price: parseFloat(price),
    category,
    available
  };
  
  res.json(menuItems[itemIndex]);
});

// Delete menu item
app.delete('/api/admin/menu/:id', (req, res) => {
  const { id } = req.params;
  const itemIndex = menuItems.findIndex(item => item.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Menu item not found' });
  }
  
  menuItems.splice(itemIndex, 1);
  res.json({ message: 'Menu item deleted successfully' });
});

// Create order
app.post('/api/orders', (req, res) => {
  const { items, customerName, customerPhone } = req.body;
  
  const order = {
    id: uuidv4(),
    orderNumber: orderCounter++,
    items,
    customerName,
    customerPhone,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    status: 'pending',
    timestamp: new Date().toISOString()
  };
  
  orders.push(order);
  
  // Emit new order to all connected clients (restaurant staff)
  io.emit('newOrder', order);
  
  res.json({ orderNumber: order.orderNumber, orderId: order.id });
});

// Get orders (for admin/staff)
app.get('/api/admin/orders', (req, res) => {
  res.json(orders.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
});

// Update order status
app.put('/api/admin/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const orderIndex = orders.findIndex(order => order.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  orders[orderIndex].status = status;
  
  // Emit order update to all connected clients
  io.emit('orderUpdate', orders[orderIndex]);
  
  res.json(orders[orderIndex]);
});

// Get order by number
app.get('/api/orders/:orderNumber', (req, res) => {
  const { orderNumber } = req.params;
  const order = orders.find(order => order.orderNumber === parseInt(orderNumber));
  
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  
  res.json(order);
});

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
  const buildPath = path.join(__dirname, '../client/build');
  console.log('Looking for build files in:', buildPath);
  
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
