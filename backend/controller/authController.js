import User from "../models/User";
import bcrypt from "bcrypt";

export async function register(requisicao, resposta){
    try{
        const {name, email,password, role } = requisicao.body

        // verifica se o usuario existe, se já existe retorna um status 400 com a mensagem "O usuário já existe."
        const existingUser = await User.findOne({where: {email}})

        if(existingUser){
            return resposta.status(400).json({message: "O usuário já existe."})
        }

        // criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(password, "10") // o 10 é o nivel de complexidade da senha.

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
        const {email, password} = await requisicao.body

        // Procura o usuário pelo email
        const user = await User.findOne({where: {email}})
        if(!user){
            return resposta.status(401).json({message: "Email inválido"})
        }

        // Comparar a senha informada com a senha criptografada armazenada no banco de dados
        const validPassword = await bcrypt.compare(password, User.password)

        if(!validPassword){
            return resposta.status(401).json({message: "Senha inválida"})
        }

        // Gerar o token, que serve para autenticar o usuário
        const token = jwt.sign(
            {id: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        resposta.json({token, user: {id: user.id, name: user.name, role: user.role}})

    } catch (error) {
        resposta.status(500).json({error: error.message})
    }
}