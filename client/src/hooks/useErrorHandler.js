import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleError = (error) => {
    console.error('Erro:', error);
    setError({
      message: error.response?.data?.message || 'Ocorreu um erro inesperado. Por favor, tente novamente.'
    });
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
}; 