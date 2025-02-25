import { useState, useRef } from "react";
import styles from "./ProjectModal.module.css"

function ProjectModal({isOpen, isClose, onSave}){
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        phase:"",
        startDate: "",
        deadline: "",
    })

    const modalRef = useRef()

    const handleOverlayClick = (evento)=>{
        if(modalRef.current && !modalRef.current.contains(evento.target)){
            isClose()
        }
    }

    const handleChange = (evento)=>{
        setFormData({
            ...formData,
            [evento.target.name]: evento.target.value,
            [evento.target.description]: evento.target.value,
            [evento.target.startDate]: evento.target.value,
            [evento.target.deadline]: evento.target.value,

        })
    }

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
                    <fieldset>
                        <legend>Informações do projeto</legend>
                        <fieldset>
                            <legend>Dados do projeto</legend>
                            <div>
                                <label htmlFor="formName">Nome do projeto</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    id="formName"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label              htmlFor="projectDescription">
                                    Descrição resumida
                                </label>
                                <textarea 
                                    name="projectDescription" id="projectDescription"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div>
                                <label htmlFor="startDate">Data de inicio</label>
                                <input 
                                    type="date"
                                    name="startDate"
                                    id="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label 
                                    htmlFor="deadline">
                                        Data de entrega
                                </label>
                                <input 
                                    type="Date" 
                                    name="deadline" 
                                    id="deadline" 
                                    value={formData.deadline}
                                />
                            </div>
                            <div>
                                <label 
                                htmlFor="">
                                    Selecionar fase
                                </label>
                                <select
                                    name="phase"
                                    id="phase"
                                    value={formData.phase}
                                    onChange={handleChange}>
                                        <option 
                                        value="planejamento"
                                        >
                                            Planejamento
                                        </option>
                                        <option value="desenvolvimento">Desenvolvimento</option>
                                        <option value="testes">Testes</option>
                                        <option value="implementacao">Implementação</option>
                                        <option value="posProducaoManutencao">Pós produção / Manutenção</option>
                                    </select>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>
                                Testes
                            </legend>
                            
                        </fieldset>
                        
                    </fieldset>
                    <button 
                    type="submit">
                        Salvar Projeto
                    </button>
                </form>
            </div>
            
        </div>  
    )

    

}

export default ProjectModal;