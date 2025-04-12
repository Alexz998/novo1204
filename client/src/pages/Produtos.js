import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import axios from 'axios';
import config from '../config';
import { useErrorHandler } from '../hooks/useErrorHandler';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [open, setOpen] = useState(false);
  const [produtoAtual, setProdutoAtual] = useState({ nome: '', preco: '' });
  const [loading, setLoading] = useState(false);
  const { error, handleError, clearError } = useErrorHandler();

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      clearError();
      const response = await axios.get(`${config.apiUrl}/produtos`);
      setProdutos(response.data);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (produto = null) => {
    setProdutoAtual(produto || { nome: '', preco: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setProdutoAtual({ nome: '', preco: '' });
    clearError();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProdutoAtual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      clearError();
      
      if (produtoAtual._id) {
        await axios.put(`${config.apiUrl}/produtos/${produtoAtual._id}`, produtoAtual);
      } else {
        await axios.post(`${config.apiUrl}/produtos`, produtoAtual);
      }
      
      handleClose();
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      clearError();
      await axios.delete(`${config.apiUrl}/produtos/${id}`);
      carregarProdutos();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Produtos</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Novo Produto
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error.message}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto._id}>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>R$ {Number(produto.preco).toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(produto)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(produto._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {produtoAtual._id ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="nome"
              label="Nome"
              type="text"
              fullWidth
              value={produtoAtual.nome}
              onChange={handleChange}
              required
            />
            <TextField
              margin="dense"
              name="preco"
              label="Preço"
              type="number"
              fullWidth
              value={produtoAtual.preco}
              onChange={handleChange}
              required
              inputProps={{ step: "0.01" }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Produtos; 