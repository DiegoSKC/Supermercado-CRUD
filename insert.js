const mysql = require('mysql2');

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Diego0610',
  database: 'supermercado',
});

const produto = {
  nome: 'Trigo',
  preco: 2.99,
  quantidade: 50,
  categoria_id: 1, 
  createdAt: new Date(),
  updatedAt: new Date(),
};

const query = `
  INSERT INTO produtos (nome, preco, quantidade, categoria_id, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?);
`;

connection.query(
  query,
  [
    produto.nome, 
    produto.preco, 
    produto.quantidade, 
    produto.categoria_id, 
    produto.createdAt, 
    produto.updatedAt
  ],
  (err, results) => {
    if (err) {
      console.error('Erro ao inserir o produto:', err);
      return;
    }
    console.log('Produto inserido com sucesso!', results);
  }
);

connection.end();
