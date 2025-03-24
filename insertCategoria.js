const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Diego0610',
  database: 'supermercado',
});

const categoria = {
  nome: 'Grãos',
  descricao: 'Produtos como arroz, feijão, trigo, etc.',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const query = `
  INSERT INTO categoria (nome, descricao, createdAt, updatedAt)
  VALUES (?, ?, ?, ?);
`;

connection.query(
  query,
  [categoria.nome, categoria.descricao, categoria.createdAt, categoria.updatedAt],
  (err, results) => {
    if (err) {
      console.error('Erro ao inserir a categoria:', err);
      return;
    }
    console.log('Categoria inserida com sucesso!', results);
  }
);

connection.end();
