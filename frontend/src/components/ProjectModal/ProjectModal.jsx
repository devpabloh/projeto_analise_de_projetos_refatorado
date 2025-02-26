import { useState, useRef } from "react";
import styles from "./ProjectModal.module.css"
import FieldsetGeneralInformation from "../FieldsetGeneralInformation";
import FieldsetDevelopmentStatus from "../FieldsetDevelopmentStatus";
import FieldsetTestingAndQuality from "../FieldsetTestingAndQuality";
import FieldsetDeploymentEnvironment from "../FieldsetDeploymentEnvironment";
import FieldsetDocumentation from "../FieldsetDocumentation";

function ProjectModal({isOpen, isClose, onSave}){
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        responsibleFillingOut: "",
        responsibleContact: "",
        fillingDate: new Date().toISOString().split('T')[0],
        developmentPhase: "",
        carriedOutTests: "",
        selectedTests: [],
    })

    const modalRef = useRef()

    const handleOverlayClick = (evento)=>{
        if(modalRef.current && !modalRef.current.contains(evento.target)){
            isClose()
        }
    }

    const handleChange = (evento) => {
        const { name, value, type, checked } = evento.target;
        setFormData(prevData => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value
    }));
    };

    const handleSubmit = (evento)=>{
        evento.preventDefault()
        onSave(formData)    
    }

    if (!isOpen) return null;

    return(
        <div className={styles.overlaySyle} onClick={handleOverlayClick}>
            <div className={styles.modalStyle} ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <h2>Adicionar Project</h2>
                <form onSubmit={handleSubmit}>
                    <FieldsetGeneralInformation
                        formData={formData}
                        onChange={handleChange}
                    />
                    <FieldsetDevelopmentStatus
                        formData={formData}
                        onChange={handleChange}
                    />
                    <FieldsetTestingAndQuality
                        formData={formData}
                        onChange={handleChange}
                    />
                    <FieldsetDeploymentEnvironment
                        formData={formData}
                        onChange={handleChange}
                    />
                    <FieldsetDocumentation
                        formData={formData}
                        onChange={handleChange}
                    />
                    <button type="submit">
                        Salvar Projeto
                    </button>
                </form>
            </div>
        </div>  
    )
}

export default ProjectModal;