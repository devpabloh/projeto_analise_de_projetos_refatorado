import { useState, useEffect, useCallback } from "react"; 
import axios from "axios";
import ProjectModal from "../ProjectModal/ProjectModal";
import Header from "../Header";
import Footer from "../Footer";
import styles from "./Dashboard.module.css";
import PropTypes from 'prop-types';

function Dashboard({ user, onLogout }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            onLogout();
            return;
        }

        try {
            const response = await axios.get("http://localhost:3000/analiseDeProjetos/projects", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Por favor, faça login novamente.");
                onLogout();
            }
        } finally {
            setLoading(false);
        }
    }, [onLogout]);

    const handleSaveProject = useCallback(async (projectData) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Sessão expirada. Por favor, faça login novamente.");
            onLogout();
            return;
        }

        try {
            await axios.post(
                "http://localhost:3000/analiseDeProjetos/projects",
                projectData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            await fetchProjects();
            setModalOpen(false);
        } catch (error) {
            console.error("Full error:", error);
            if (error.response?.status === 401) {
                alert("Sessão expirada. Por favor, faça login novamente.");
                onLogout();
            } else {
                alert(`Erro ao salvar projeto: ${error.response?.data?.error || 'Erro desconhecido'}`);
            }
        }
    }, [fetchProjects, onLogout]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    // Move these inside the component function
    const openModal = useCallback(() => setModalOpen(true), []);
    const closeModal = useCallback(() => setModalOpen(false), []);

    return (
        <div className={styles.dashboardContainer}>
            <Header user={user} onLogout={onLogout} />
            <main className={styles.mainContent}>
                {user.role === 'admin' ? (
                    <p>Você é um administrador</p>
                ) : (
                    <div className={styles.projectsSection}>
                        <h1>Dashboard</h1>
                        <p>Bem vindo, {user.name}</p>
                        <h1>Meus Projetos</h1>
                        <button 
                            onClick={openModal} 
                            className={styles.addButton}
                        >
                            Adicionar Projeto
                        </button>
                        {loading ? (
                            <p>Carregando projetos...</p>
                        ) : (
                            <ul className={styles.projectsList}> 
                                {projects.length === 0 ? (
                                    <p>Nenhum projeto encontrado.</p>
                                ) : (
                                    projects.map((project) => (
                                        <li key={project.id} className={styles.projectItem}>
                                            <h3>{project.projectName}</h3>
                                            <p><strong>Fase:</strong> {project.developmentPhase}</p>
                                            <p><strong>Descrição:</strong> {project.projectDescription}</p>
                                            <p><strong>Responsável:</strong> {project.responsibleFillingOut}</p>
                                        </li>
                                    ))
                                )}
                            </ul>
                        )}
                        <ProjectModal
                            isOpen={modalOpen}
                            isClose={closeModal}
                            onSave={handleSaveProject}
                        />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

Dashboard.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired
    }).isRequired,
    onLogout: PropTypes.func.isRequired
};

export default Dashboard;