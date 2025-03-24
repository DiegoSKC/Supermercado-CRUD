const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Categoria = require('./categoria'); 

const Produto = sequelize.define('Produto', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria_id: {  // Adiciona a chave estrangeira para a categoria(escrevi isso para me lembrar o que eu fiz e deixar marcado)
    type: DataTypes.INTEGER,
    references: {
      model: Categoria,
      key: 'id',
    },
    allowNull: false,
  },
  createdAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, 
    allowNull: false,
  },
  updatedAt: { 
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
});

Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });

Produto.sync({ force: false }).then(() => console.log('Tabela de produtos criada ou já existente!'));

module.exports = Produto;
