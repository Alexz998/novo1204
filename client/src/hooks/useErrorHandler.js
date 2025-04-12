import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleError = (error) => {
    console.error('Erro:', error);
    setError({
      message: error.response?.data?.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'
    });
    toast.error(error.response?.data?.message || 'Ocorreu um erro inesperado');
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
}; 