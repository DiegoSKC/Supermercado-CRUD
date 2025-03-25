// Criar um novo produto
router.post('/', async (req, res) => {
  try {
    // Exemplo de estrutura do corpo da requisição (req.body)
    // {
    //   "nome": "Produto Exemplo",      // Nome do produto
    //   "descricao": "Descrição do produto",  // Descrição do produto
    //   "preco": 100.00,               // Preço do produto
    //   "categoriaId": 1              // ID da categoria à qual o produto pertence
    // }
    const produto = await Produto.create(req.body);
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar todos os produtos
router.get('/', async (req, res) => {
  try {
    const produtos = await Produto.findAll({
      include: Categoria,  // Inclui os dados da categoria relacionada
    });
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Atualizar um produto
router.put('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    // Exemplo de estrutura do corpo da requisição (req.body) para atualizar um produto
    // {
    //   "nome": "Produto Atualizado",   // Nome atualizado
    //   "descricao": "Nova descrição",  // Descrição atualizada
    //   "preco": 120.00,               // Preço atualizado
    //   "categoriaId": 2              // ID da nova categoria
    // }
    await produto.update(req.body);
    res.status(200).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    await produto.destroy();
    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
