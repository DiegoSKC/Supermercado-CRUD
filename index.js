const express = require('express');
const dotenv = require('dotenv');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes'); 
const sequelize = require('./db');

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/produtos', produtoRoutes); 
app.use('/api/categoria', categoriaRoutes);  

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
