import Project from "../models/Project.js"

/* 
    Função que cria um novo projeto.
    Para um usuário comum, o userId é forçado a vir do token (req.user.id) para evitar que um usuário 
    manipule ou crie projetos para outro usuário.
*/

export async function createProject(requisicao, resposta){
    try{
         // Obtém o id do usuário autenticado (definido pelo middleware de autenticação)
        const userId = requisicao.user.id

        console.log('Received data:', requisicao.body);
        console.log('User ID:', userId);
        
        // Desestrutura os dados do corpo da requisição
        const {name, description, phase, startDate, deadLine} = requisicao.body

        // Cria o projeto associando o userId do token
        const project = await Project.create({name, description, phase, startDate, deadLine, userId}) // userId garante que o projeto pertence ao usuário autenticado

        // Retorna o projeto criado com status 201 (Created)
        resposta.status(201).json(project)
    }catch(error){
        console.error('Error creating project:', error);
        // Em caso de erro, retorna status 500 com a mensagem de erro
        resposta.status(500).json({error: error.message})
    }
}

/**
 * Lista os projetos.
 * - Se o usuário for administrador, lista todos os projetos.
 * - Se for um usuário comum, lista somente os projetos que pertencem a ele.
 */

export async function listProjects(requisicao, resposta) {
    try {
        let projects;
        if (requisicao.user.role === 'admin') {
            projects = await Project.findAll({
                include: ['user'] // Include user information
            });
        } else {
            projects = await Project.findAll({
                where: { userId: requisicao.user.id },
                include: ['user']
            });
        }
        return resposta.json(projects);
    } catch (error) {
        console.error('Error in listProjects:', error);
        return resposta.status(500).json({ 
            error: 'Erro ao listar projetos',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

/**
 * Atualiza um projeto.
 * Antes de atualizar, verifica se o projeto existe e se o usuário autenticado tem permissão para atualizá-lo.
 * Usuários comuns só podem atualizar seus próprios projetos.
 */

export async function updateProject(requisicao, resposta){
    try {
        const projectId = requisicao.params.id // id do projeto que vai ser atualizado
        const userId = requisicao.user.id // id do usuário autenticado

        const project = await Project.findOne({where: {id: projectId}}) // busca o projeto no banco de dados, o where é o filtro que vai ser aplicado ao projeto, o id: projectId é o filtro que vai ser aplicado ao id do projeto

        if(!project){
            return resposta.status(404).json({message: "O projeto não foi encontrado."})
        }

        // Se o usuário for comum e não for o dono do projeto, retorna 403 (Forbidden)
        if(requisicao.user.role !== "admin" && project.userId !== userId){
            return resposta.status(403).json({message: "Acesso negado, não é o proprietário do projeto."})
        }

        // Atualiza o projeto com os dados recebidos no corpo da requisição
        await project.update(requisicao.body)

        resposta.status(200).json(project)
    } catch (error) {
        resposta.status(500).json({error: error.message})
    }
}

/**
 * Deleta um projeto.
 * A mesma lógica de autorização é aplicada: usuários comuns só podem deletar seus próprios projetos.
 */

export async function deleteProject(requisicao, resposta){
    try {
        const projectId = requisicao.params.id
        const userId = requisicao.user.id

        // Procurar um projeto pelo id
        const project = await Project.findOne({ where: {id: projectId}})

        if(!project){
            return resposta.status(404).json({message: "O projeto não foi encontrado."})
        }

        // Verifica se o usuário tem permissão para deletar o projeto
        if(requisicao.user.role !== 'admin' && projectId !== userId){
            resposta.status(403).json({message: "Você não tem permissão para deletar este projeto."})
        }

        // Deleta o projeto
        await project.destroy()

        resposta.status(200).json({message: "Projeto deletado com sucesso."})
    } catch (error) {
        resposta.status(500).json({error: error.message})
    }
}

/**
 * Recupera um projeto específico pelo id.
 * Verifica se o projeto pertence ao usuário comum ou, se o usuário for admin, retorna independentemente da propriedade.
 */

export async function getProjectId(requisicao, resposta){
    try {
        const projectId = requisicao.params.id
        const userId = requisicao.user.id

        // Buscar o projeto pelo id
        const project = await Project.findOne({where: {id: projectId}})

        if(!project){
            resposta.status(404).json({message: "O projeto não foi encontrado."})
        }

        // Se o usuário não for admin e o projeto não pertencer a ele, retorna acesso negado
        if(requisicao.user.role !== 'admin' && project.userId !== userId){
            return resposta.status(403).json({message: "Você não tem permissão para visualizar este projeto."})
        }

        resposta.status(200).json(project)
    } catch (error) {
        resposta.status(500).json({error: error.message})
    }
}