require('dotenv').config(); // Carrega variáveis de ambiente
const express = require('express');
const connectMongoDB = require('./database'); // Conexão MongoDB
const cors = require('cors');

// Inicialização do app
const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
connectMongoDB();

// Rotas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/checkout', require('./routes/checkoutRoutes'));
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/report', require('./routes/reportRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Rota padrão para teste
app.get('/', (req, res) => {
  res.send("API C24 TECH está funcionando!");
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
