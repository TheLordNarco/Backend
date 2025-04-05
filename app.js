const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./database');

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());
connectMongoDB();

// Configuração de rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Rota de teste
app.get('/', (req, res) => {
  res.send("API C24 TECH está funcionando!");
});

module.exports = app;
