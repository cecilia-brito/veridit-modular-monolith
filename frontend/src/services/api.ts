import axios from 'axios';

// 1. Cria o carteiro apontando direto para o seu servidor na nuvem
export const api = axios.create({
  // COLE AQUI A URL DO RENDER (Não esqueça de tirar a barra '/' no final do link se houver)
  baseURL: import.meta.env.VITE_API_URL, 
});

// 2. Interceptador: O segurança que revista todas as requisições antes de saírem
api.interceptors.request.use((config) => {
  // Tenta achar o JWT (Pulseira VIP) no bolso do navegador
  const token = localStorage.getItem('@Veridit:token');
  
  if (token) {
    // Se achou, gruda no cabeçalho
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});