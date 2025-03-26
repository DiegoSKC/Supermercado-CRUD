const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Diego0610',
  database: 'supermercado',
});

const categorias = [
  { nome: 'Grãos', descricao: 'Produtos como arroz, feijão, trigo, etc.', createdAt: new Date(), updatedAt: new Date() },
  { nome: 'Bebidas', descricao: 'Sucos, refrigerantes, etc.', createdAt: new Date(), updatedAt: new Date() },
  { nome: 'Frios', descricao: 'Queijos, presunto, etc.', createdAt: new Date(), updatedAt: new Date() },
];

const query = `
  INSERT INTO categoria (nome, descricao, createdAt, updatedAt)
  VALUES ?
`;

const valores = categorias.map(categoria => [
  categoria.nome,
  categoria.descricao,
  categoria.createdAt,
  categoria.updatedAt
]);

connection.query(query, [valores], (err, results) => {
  if (err) {
    console.error('Erro ao inserir as categorias:', err);
    return;
  }
  console.log('Categorias inseridas com sucesso!', results);
});

connection.end();
