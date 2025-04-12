const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const { format } = require('date-fns');
const ptBR = require('date-fns/locale/pt-BR');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://120420251103-xa5x.vercel.app', 'https://*.vercel.app'],
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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sistema-financeiro', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelos
const Venda = require('./models/Venda');
const Despesa = require('./models/Despesa');
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');
const Config = require('./models/Config');
const Meta = require('./models/Meta');

// Rotas de Vendas
app.get('/api/vendas', async (req, res) => {
  try {
    const vendas = await Venda.find().populate('cliente').populate('produtos.produto');
    res.send(vendas);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/vendas', async (req, res) => {
  try {
    const venda = new Venda(req.body);
    await venda.save();
    res.status(201).send(venda);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rotas de Despesas
app.get('/api/despesas', async (req, res) => {
  try {
    const despesas = await Despesa.find();
    res.send(despesas);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/despesas', async (req, res) => {
  try {
    const despesa = new Despesa(req.body);
    await despesa.save();
    res.status(201).send(despesa);
  } catch (error) {
    res.status(400).send(error);
  }
});

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
    const produto = new Produto(req.body);
    await produto.save();
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
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
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

// Rotas de Clientes
app.get('/api/clientes', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.send(clientes);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).send(cliente);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rotas de Configurações
app.get('/api/config', async (req, res) => {
  try {
    const config = await Config.findOne();
    res.send(config);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/config', async (req, res) => {
  try {
    let config = await Config.findOne();
    if (!config) {
      config = new Config(req.body);
    } else {
      Object.assign(config, req.body);
    }
    await config.save();
    res.status(201).send(config);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Rotas de Metas
app.get('/api/metas', async (req, res) => {
  try {
    const metas = await Meta.find();
    res.send(metas);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/metas', async (req, res) => {
  try {
    const meta = new Meta(req.body);
    await meta.save();
    res.status(201).send(meta);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 