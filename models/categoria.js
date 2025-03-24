const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Categoria = sequelize.define('categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
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

Categoria.sync({ force: false }).then(() => console.log('Tabela de categoria criada ou já existente!'));

module.exports = Categoria;
