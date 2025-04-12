const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Permitir todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Adiciona headers CORS manualmente para todas as respostas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.json());

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sistema_financeiro')
  .then(() => {
    console.log('Conectado ao MongoDB com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  });

// Modelo de Produto
const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: String,
  preco: { type: Number, required: true },
  estoque: { type: Number, default: 0 },
  categoria: String
}, { timestamps: true });

const Produto = mongoose.model('Produto', produtoSchema);

// Rotas de Produtos
app.get('/api/produtos', async (req, res) => {
  try {
    console.log('Buscando produtos...');
    const produtos = await Produto.find();
    console.log('Produtos encontrados:', produtos.length);
    res.send(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).send({ message: 'Erro ao buscar produtos', error: error.message });
  }
});

app.post('/api/produtos', async (req, res) => {
  try {
    console.log('Criando novo produto:', req.body);
    const produto = await Produto.create(req.body);
    console.log('Produto criado com sucesso:', produto);
    res.status(201).send(produto);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(400).send({ message: 'Erro ao criar produto', error: error.message });
  }
});

app.put('/api/produtos/:id', async (req, res) => {
  try {
    console.log('Atualizando produto:', req.params.id, req.body);
    const produto = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }
    console.log('Produto atualizado com sucesso:', produto);
    res.send(produto);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(400).send({ message: 'Erro ao atualizar produto', error: error.message });
  }
});

app.delete('/api/produtos/:id', async (req, res) => {
  try {
    console.log('Deletando produto:', req.params.id);
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).send({ message: 'Produto não encontrado' });
    }
    console.log('Produto deletado com sucesso');
    res.send({ message: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(400).send({ message: 'Erro ao deletar produto', error: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 