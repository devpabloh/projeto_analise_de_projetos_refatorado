import jwt from 'jsonwebtoken'; // importando o jsonwebtoken que serve para trabalhar com autenticação

// estamos criando uma variavel authMiddleware que vai receber um novo objeto authMiddleware
export const authMiddleware = (requisicao, resposta, next)=>{
    // estamos criando uma variavel authHeader que vai receber o valor do cabecalho autorization
    const authHeader = requisicao.headers.authorization;

    // estamos criando uma variavel token que vai receber o valor do cabecalho autorization, mas somente o valor do token, o que vai ser diferente de undefined
    const token = authHeader && authHeader.split(" ")[1];

    // agora estamos verificando se o token é diferente de undefined, se for diferente de undefined estamos verificando se o token é valido
    if(!token){
        return resposta.status(401).json({message: "Acesso negado, token não encontrado"})
    }

    // agora estamos verificando se o token é valido, se for valido estamos verificando se o token é igual ao token que foi gerado no login, se for igual estamos verificando se o token expirou, se for diferente de undefined estamos verificando se o token é valido
    try {
        // estamos criando uma variavel decoded que vai receber o valor do token, mas somente o valor do token, o que vai ser diferente de undefined
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // estamos criando uma variavel user que vai receber o valor do decoded, mas somente o valor do decoded, o que vai ser diferente de undefined, definimos o decoded lá no arquivo database.js
        requisicao.user = decoded;
        next()
    } catch (error) {
        return resposta.status(401).json({message: "Token inválido ou expirado."})
    }
}