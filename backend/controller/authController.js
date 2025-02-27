import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(requisicao, resposta){
    try{
        const {name, email,password, role } = requisicao.body

        // verifica se o usuario existe, se já existe retorna um status 400 com a mensagem "O usuário já existe."
        const existingUser = await User.findOne({where: {email}})

        console.log('Tentando login com:', { email });

        if(existingUser){
            return resposta.status(400).json({message: "O usuário já existe."})
        }

        // criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, 10) // o 10 é o nivel de complexidade da senha.

        // Cria o usuário
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "common"
        })

        resposta.status(200).json({message: `Usuário ${name} registrado com sucesso!`})

    }catch(error){
        resposta.status(500).json({error: error.message})
    }
}

export async function login(requisicao, resposta){
    try {
        console.log('1. Dados recebidos:', requisicao.body);
        const email = requisicao.body.email
        const password = requisicao.body.password

        // Procura o usuário pelo email
        console.log('2. Email extraído:', email);
        console.log('2.1 Password extraído', password)
        const user = await User.findOne({where: {email}})
        console.log('3. Usuário encontrado:', user);
        if(!user){
            return resposta.status(401).json({message: "Email inválido"})
        }

        // Comparar a senha informada com a senha criptografada armazenada no banco de dados
        console.log('4. Senha fornecida:', password);
        console.log('5. Senha armazenada:', user.password);
        const validPassword = await bcrypt.compare(password, user.password)
        console.log('6. Senha válida:', validPassword);

        if(!validPassword){
            return resposta.status(401).json({message: "Senha inválida"})
        }
        console.log('7. Gerando token com:', { id: user.id, role: user.role });
        console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);

        // Gerar o token, que serve para autenticar o usuário
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        )

        console.log('Token gerado com sucesso');
        console.log('8. Token gerado com sucesso');
        resposta.json({token, user: {id: user.id, name: user.name, role: user.role}})

    } catch (error) {
        console.error('Erro detalhado:', error);
        resposta.status(500).json({error: error.message})
    }
}