// Criar uma nova categoria
router.post('/', async (req, res) => {
  try {
    // Exemplo de estrutura do corpo da requisição (req.body)
    // {
    //   "nome": "Categoria Exemplo",  // Nome da categoria
    //   "descricao": "Descrição da categoria"  // Descrição da categoria
    // }
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obter uma categoria por ID
router.get('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    res.status(200).json(categoria);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar uma categoria
router.put('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    // Exemplo de estrutura do corpo da requisição (req.body) para atualizar uma categoria
    // {
    //   "nome": "Categoria Atualizada",  // Nome atualizado
    //   "descricao": "Nova descrição"   // Descrição atualizada
    // }
    await categoria.update(req.body);
    res.status(200).json(categoria);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir uma categoria
router.delete('/:id', async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' });
    }
    await categoria.destroy();
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
