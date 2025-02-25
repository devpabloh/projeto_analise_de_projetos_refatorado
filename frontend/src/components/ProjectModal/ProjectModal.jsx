import { useState, useRef } from "react";
import styles from "./ProjectModal.module.css"
import FieldsetGeneralInformation from "../FieldsetGeneralInformation";

function ProjectModal({isOpen, isClose, onSave}){
    const [formData, setFormData] = useState({
        projectName: "",
        projectDescription: "",
        responsibleFillingOut: "",
        responsibleContact: "",
        fillingDate: new Date().toISOString().split('T')[0],
    })

    const modalRef = useRef()

    const handleOverlayClick = (evento)=>{
        if(modalRef.current && !modalRef.current.contains(evento.target)){
            isClose()
        }
    }

    const handleChange = (evento) => {
        const { name, value } = evento.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
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
                    <button type="submit">
                        Salvar Projeto
                    </button>
                </form>
            </div>
        </div>  
    )
}

export default ProjectModal;