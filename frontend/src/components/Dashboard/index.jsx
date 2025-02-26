import { useState } from "react";
import axios from "axios";
import ProjectModal from "../ProjectModal/ProjectModal";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./Dashboard.module.css";

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
        <div className={styles.dashboardContainer}>
            <Header/>
            <main className={styles.mainContent}>
                <h1>Dashboard</h1>
                <p>Bem vindo, {user.name}</p>

                {user.role === 'admin' ? (
                    <p>Você é um administrador</p>
                ) : (
                    <div className={styles.projectsSection}>
                        <h1>Meus Projetos</h1>
                        <button 
                            onClick={openModal} 
                            className={styles.addButton}
                        >
                            Adicionar Projeto
                        </button>
                        <ul className={styles.projectsList}> 
                            {projects.map((project) => (
                                <li key={project.id} className={styles.projectItem}>
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
            </main>
            <Footer/>
        </div>
    )
}

export default Dashboard