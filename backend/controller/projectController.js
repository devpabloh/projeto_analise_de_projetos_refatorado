import  Project  from "../models/Project.js";
import  User  from "../models/user.js"; // Importe o modelo User

/* 
    Função que cria um novo projeto.
    Para um usuário comum, o userId é forçado a vir do token (req.user.id) para evitar que um usuário 
    manipule ou crie projetos para outro usuário.
*/
export async function createProject(requisicao, resposta) {
    try {
        const userId = requisicao.user.id;
        console.log('Received data:', requisicao.body);
        console.log('User ID:', userId);
        
        // Recebe todos os campos do formulário
        const projectData = {
            ...requisicao.body,  // Inclui todos os campos do formulário
            userId               // Adiciona o userId
        };
        
        const project = await Project.create(projectData);
        resposta.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        resposta.status(500).json({ error: error.message });
    }
}

/**
 * Lista os projetos.
 * - Se o usuário for administrador, lista todos os projetos com informações do usuário.
 * - Se for um usuário comum, lista somente os projetos que pertencem a ele, com informações do usuário.
 */
export async function listProjects(requisicao, resposta) {
    try {
        let projects;
        if (requisicao.user.role === 'admin') {
            projects = await Project.findAll({
                include: [{ model: User, as: 'user' }] // Corrige o include com modelo e alias
            });
        } else {
            projects = await Project.findAll({
                where: { userId: requisicao.user.id },
                include: [{ model: User, as: 'user' }] // Corrige o include com modelo e alias
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
export async function updateProject(requisicao, resposta) {
    try {
        const projectId = requisicao.params.id;
        const userId = requisicao.user.id;

        const project = await Project.findOne({ where: { id: projectId } });
        if (!project) {
            return resposta.status(404).json({ message: "O projeto não foi encontrado." });
        }

        if (requisicao.user.role !== "admin" && project.userId !== userId) {
            return resposta.status(403).json({ message: "Acesso negado, não é o proprietário do projeto." });
        }

        await project.update(requisicao.body);
        resposta.status(200).json(project);
    } catch (error) {
        resposta.status(500).json({ error: error.message });
    }
}

/**
 * Deleta um projeto.
 * A mesma lógica de autorização é aplicada: usuários comuns só podem deletar seus próprios projetos.
 */
export async function deleteProject(requisicao, resposta) {
    try {
        const projectId = requisicao.params.id;
        const userId = requisicao.user.id;

        const project = await Project.findOne({ where: { id: projectId } });
        if (!project) {
            return resposta.status(404).json({ message: "O projeto não foi encontrado." });
        }

        // Correção: Comparar project.userId, não projectId
        if (requisicao.user.role !== 'admin' && project.userId !== userId) {
            return resposta.status(403).json({ message: "Você não tem permissão para deletar este projeto." });
        }

        await project.destroy();
        resposta.status(200).json({ message: "Projeto deletado com sucesso." });
    } catch (error) {
        resposta.status(500).json({ error: error.message });
    }
}

/**
 * Recupera um projeto específico pelo id.
 * Verifica se o projeto pertence ao usuário comum ou, se o usuário for admin, retorna independentemente da propriedade.
 */
export async function getProjectId(requisicao, resposta) {
    try {
        const projectId = requisicao.params.id;
        const userId = requisicao.user.id;

        const project = await Project.findOne({ where: { id: projectId } });
        if (!project) {
            return resposta.status(404).json({ message: "O projeto não foi encontrado." });
        }

        if (requisicao.user.role !== 'admin' && project.userId !== userId) {
            return resposta.status(403).json({ message: "Você não tem permissão para visualizar este projeto." });
        }

        resposta.status(200).json(project);
    } catch (error) {
        resposta.status(500).json({ error: error.message });
    }
}