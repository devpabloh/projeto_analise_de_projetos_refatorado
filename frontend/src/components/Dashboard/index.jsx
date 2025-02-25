import { useState } from "react";
import axios from "axios";
import ProjectModal from "../ProjectModal/ProjectModal";

function Dashboard({user, onLogout}){
    const [modalOpen, setModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const token = localStorage.getItem('token');

    const handleLogout = ()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user')

        onLogout()
    }

    // Configurações modal

    // Abrir modal
    const openModal = ()=> setModalOpen(true);
    // fechar modal
    const closeModal = ()=> setModalOpen(false);

    // Função chamada ao salvar um novo projeto no modal
    const handleSaveProject = async (projectData)=>{
        try {
            const resposta = await axios.post("http://localhost:3000/analiseDeProjetos/projects",
                projectData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            // Atualiza a lista, adicionando o novo projeto
            setProjects([...projects, resposta.data])
            closeModal()
        } catch (error) {
            console.error("Erro ao buscar projetos:", error);
        }
    }


    return(
        <div>
            <h1>Dashboard</h1>
            <p>Bem vindo, {user.name}</p>

            {user.role === 'admin' ? (
                <p>Você é um administrador</p>
            ):(
                <div style={{ padding: "20px" }}>
                    <h1>Meus Projetos</h1>
                    <button onClick={openModal} style={{ marginBottom: "20px" }}>
                        Adicionar Projeto
                    </button>
                    <ul> 
                        {projects.map((project) => (
                        <li key={project.id}>
                            <strong>{project.name}</strong> - {project.phase}
                        </li>
                        ))}
                    </ul>
                    <ProjectModal
                        isOpen={modalOpen}
                        isClose={closeModal}
                        onSave={handleSaveProject}
                    />
                </div>
            )}
            <button onClick={handleLogout}>Sair</button>
        </div>
    )
}

export default Dashboard