const express = require('express');
const Produto = require('../models/produto'); // Importa o modelo Produto
const Categoria = require('../models/categoria'); // Importa o modelo Categoria
const router = express.Router();

// Criar um ou mais novos produtos
router.post('/', async (req, res) => {
  try {
    // Verifica se o corpo da requisição é um array
    const produtos = Array.isArray(req.body) ? req.body : [req.body];

    // Utiliza o método bulkCreate para criar vários produtos ao mesmo tempo
    const produtosCriados = await Produto.bulkCreate(produtos);

    // Retorna os produtos criados com sucesso
    res.status(201).json(produtosCriados);
  } catch (err) {
    // Em caso de erro, retorna um erro de validação
    res.status(400).json({ message: err.message });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: Categoria,  // Inclui os dados da categoria relacionada
    });
    res.status(200).json(produtos); // Retorna todos os produtos com suas categorias
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

// Obter um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id, {
      include: Categoria,  // Inclui os dados da categoria relacionada
    });
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto); // Retorna o produto com seus dados
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    // Atualiza o produto com os dados passados no corpo da requisição
    await produto.update(req.body);
    res.status(200).json(produto); // Retorna o produto atualizado
  } catch (err) {
    res.status(400).json({ message: err.message }); // Caso ocorra erro de validação
  }
});

// Excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await produto.destroy(); // Deleta o produto
    res.status(200).json({ message: 'Produto excluído com sucesso' }); // Confirma a exclusão
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

module.exports = router;
