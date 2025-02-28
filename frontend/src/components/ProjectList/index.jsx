import  { useState, useEffect } from 'react';
import styles from './ProjectList.module.css';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/analiseDeProjetos/projects', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Falha ao carregar projetos');
                }

                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Erro ao carregar projetos:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={styles.projectList}>
            <h2>Lista de Projetos</h2>
            {projects.length === 0 ? (
                <p>Nenhum projeto encontrado.</p>
            ) : (
                <ul>
                    {projects.map(project => (
                        <li key={project.id}>
                            <h3>{project.projectName}</h3>
                            <p>{project.projectDescription}</p>
                            <p>Fase: {project.developmentPhase}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProjectList;