import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/analiseDeProjetos'
});

// Interceptor de requisição - adiciona o token em todas as requisições
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Interceptor de resposta para tratar erros de autenticação
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            console.log('Token expirado ou inválido');
            // Não limpar localStorage aqui para evitar loops
            // O componente que receber o erro deve decidir o que fazer
        }
        return Promise.reject(error);
    }
);

export default api;