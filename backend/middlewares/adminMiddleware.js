

// estamos criando uma variavel adminMiddleware que vai receber um novo objeto adminMiddleware
export const adminMiddleware = (requisicao, resposta, next)=>{
    if(requisicao.user && requisicao.user.role === "admin"){
        next();
    }else {
        return resposta.status(403).json({message: "Acesso restrito para administradores."})
    }
}