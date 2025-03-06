

// estamos criando uma variavel adminMiddleware que vai receber um novo objeto adminMiddleware
export const adminMiddleware = (requisicao, resposta, next) => {
    if (requisicao.user.role !== 'admin') {
        return resposta.status(403).json({ message: "Acesso negado. Apenas administradores podem acessar este recurso." });
    }
    next();
};