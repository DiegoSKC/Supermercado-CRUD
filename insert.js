const mysql = require('mysql2');

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Diego0610',
  database: 'supermercado',
});

// Produtos a serem inseridos
const produtos = [
  { nome: 'Trigo', preco: 2.99, quantidade: 50, categoria_id: 1, createdAt: new Date(), updatedAt: new Date() },
  { nome: 'Arroz', preco: 5.49, quantidade: 30, categoria_id: 1, createdAt: new Date(), updatedAt: new Date() },
  { nome: 'Feijão', preco: 4.99, quantidade: 40, categoria_id: 1, createdAt: new Date(), updatedAt: new Date() },
];

// Gerar a consulta SQL para inserir múltiplos produtos
const query = `
  INSERT INTO produtos (nome, preco, quantidade, categoria_id, createdAt, updatedAt)
  VALUES ?
`;

const valores = produtos.map(produto => [
  produto.nome,
  produto.preco,
  produto.quantidade,
  produto.categoria_id,
  produto.createdAt,
  produto.updatedAt
]);

connection.query(query, [valores], (err, results) => {
  if (err) {
    console.error('Erro ao inserir os produtos:', err);
    return;
  }
  console.log('Produtos inseridos com sucesso!', results);
});

connection.end();
