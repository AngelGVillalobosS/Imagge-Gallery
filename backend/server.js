const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // Conexión a MongoDB
// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log('Conectado a MongoDB'))
//   .catch(err => console.error('Error de conexión:', err));

// Rutas de ejemplo
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend funcionando' });
});

// // Modelo de ejemplo (backend/models/Item.js)
// const itemSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   createdAt: { type: Date, default: Date.now }
// });

// const Item = mongoose.model('Item', itemSchema);

// // CRUD de ejemplo
// app.get('/api/items', async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.post('/api/items', async (req, res) => {
//   try {
//     const newItem = new Item(req.body);
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});