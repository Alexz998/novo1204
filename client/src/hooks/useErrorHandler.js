import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

export const useErrorHandler = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleError = (error) => {
    console.error('Erro detectado:', error);
    
    // Log detalhado do erro
    if (error.response) {
      // Erro da API
      console.error('Status:', error.response.status);
      console.error('Dados:', error.response.data);
      console.error('Headers:', error.response.headers);
      setError({
        message: error.response.data.message || 'Erro na comunicação com o servidor',
        status: error.response.status
      });

      const status = error.response.status;
      const message = error.response.data?.message || 'Erro desconhecido';

      switch (status) {
        case 401:
          toast.error('Sessão expirada. Por favor, faça login novamente.');
          logout();
          navigate('/login');
          break;
        case 403:
          toast.error('Você não tem permissão para realizar esta ação.');
          break;
        case 404:
          toast.error('Recurso não encontrado.');
          break;
        case 422:
          toast.error('Dados inválidos. Por favor, verifique os campos.');
          break;
        case 429:
          toast.error('Muitas requisições. Por favor, aguarde um momento.');
          break;
        case 500:
          toast.error('Erro interno do servidor. Tente novamente mais tarde.');
          break;
        default:
          toast.error(`Erro: ${message}`);
      }
    } else if (error.request) {
      // Erro de rede
      console.error('Erro de rede:', error.request);
      setError({
        message: 'Erro de conexão com o servidor',
        status: 'NETWORK_ERROR'
      });
      toast.error('Erro de conexão. Verifique sua internet.');
    } else {
      // Erro na aplicação
      console.error('Erro na aplicação:', error.message);
      setError({
        message: error.message || 'Erro interno do sistema',
        status: 'APP_ERROR'
      });
      toast.error('Erro inesperado. Tente novamente.');
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { error, handleError, clearError };
}; 