const express = require('express');
const Categoria = require('../models/categoria'); // Importa o modelo Categoria
const router = express.Router();

// Criar uma ou mais novas categorias
router.post('/', async (req, res) => {
  try {
    // Verifica se o corpo da requisição é um array
    const categorias = Array.isArray(req.body) ? req.body : [req.body];
    
    // Utiliza o método bulkCreate para criar várias categorias ao mesmo tempo
    const categoriasCriadas = await Categoria.bulkCreate(categorias);
    
    // Retorna as categorias criadas com sucesso
    res.status(201).json(categoriasCriadas);
  } catch (err) {
    // Em caso de erro, retorna um erro de validação
    res.status(400).json({ message: err.message });
  }
});

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias); // Retorna todas as categorias no banco
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

// Obter uma categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(categoria); // Retorna a categoria encontrada
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

// Atualizar uma categoria
router.put('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    // Atualiza a categoria com os dados passados no corpo da requisição
    await categoria.update(req.body);
    res.status(200).json(categoria); // Retorna a categoria atualizada
  } catch (err) {
    res.status(400).json({ message: err.message }); // Caso ocorra erro de validação
  }
});

// Excluir uma categoria
router.delete('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    await categoria.destroy(); // Deleta a categoria
    res.status(200).json({ message: 'Categoria excluída com sucesso' }); // Confirma a exclusão
  } catch (err) {
    res.status(500).json({ message: err.message }); // Caso ocorra erro no banco
  }
});

module.exports = router;
