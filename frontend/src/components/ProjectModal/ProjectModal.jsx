import { useState, useRef } from "react";
import styles from "./ProjectModal.module.css"

function ProjectModal({isOpen, isClose, onSave}){
    const [formData, setFormData] = useState({
        name: "", // nome do projeto
        description: "", // descrição do projeto
        phase:"", // fase atual do projeto
        startDate: "", // data de inicio do projeto
        deadline: "", // data de entrega do projeto
        tests: [], // testes realizados
        tools:"", // ferramentas utilizadas
        frequency:"", // frequência dos testes
        otherTests:"", // outros testes realizados
        environment: "", // ambiente de implementação
        devEnvironment: "", // ambiente de desenvolvimento
        stagingEnvironment: "", // ambiente de homologação
        prodEnvironment: "", // ambiente de produção
        observations: "" // observações

    })
    const [selectOpen, setSelectOpen] = useState(false);
    const [selectedEnvironment, setSelectedEnvironment] = useState("");

    const TIPOS_TESTES = [
        { id: 'unitarios', label: 'Testes Unitários' },
        { id: 'integracao', label: 'Testes de Integração' },
        { id: 'aceitacao', label: 'Testes de Aceitação' },
        { id: 'performance', label: 'Testes de Performance' },
        { id: 'seguranca', label: 'Testes de Segurança' },
        { id: 'outrosTestes', label: 'Outros Testes'}
    ];

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

    const handleCheckboxChange = (evento) => {
        const { value, checked } = evento.target;
        setFormData(prevData => ({
            ...prevData,
        tests: checked 
            ? [...prevData.tests, value]
            : prevData.tests.filter(test => test !== value)
        }));
    };

    const handleEnvironmentChange = (evento) => {
        setSelectedEnvironment(evento.target.value);
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
                    <fieldset>
                        <legend>Informações do projeto</legend>
                        <fieldset className={styles.containerTitles}>
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
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label 
                                htmlFor="">
                                    Fase atual do projeto
                                </label>
                                <select
                                    className={selectOpen ? styles.selectOpen : undefined}
                                    name="phase"
                                    id="phase"
                                    value={formData.phase}
                                    onChange={handleChange}
                                    onClick={() => setSelectOpen(!selectOpen)}
                                    onBlur={() => setSelectOpen(false)}
                                    >
                                        <option value="planejamento">Planejamento</option>
                                        <option value="desenvolvimento">Desenvolvimento</option>
                                        <option value="testes">Testes</option>
                                        <option value="implementacao">Implementação</option>
                                        <option value="posProducaoManutencao">Pós produção / Manutenção</option>
                                    </select>
                            </div>
                            <div className={styles.divTextArea}>
                                <label htmlFor="projectDescription">Descrição resumida</label>
                                <textarea 
                                    name="description" id="projectDescription"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>
                                Testes
                            </legend>
                            <fieldset className={styles.containerInputCheck}>
                                <legend>Testes Realizados</legend>
                                {TIPOS_TESTES.map(teste => (
                                    <div key={teste.id}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="tests"
                                                value={teste.id}
                                                checked={formData.tests.includes(teste.id)}
                                                onChange={handleCheckboxChange}
                                            />
                                            {teste.label}
                                        </label>
                                    </div>
                                ))}
                                {formData.tests.includes('outrosTestes') && (
                                    <div className={styles.outrosTestesArea}>
                                        <label htmlFor="outrosTestesDesc">Descreva os outros testes:</label>
                                        <textarea
                                            id="outrosTestesDesc"
                                            name="otherTests"
                                            value={formData.otherTests}
                                            onChange={handleChange}
                                            placeholder="Descreva aqui os outros testes realizados..."
                                        />
                                    </div>
                                )}
                            </fieldset>
                            <fieldset>
                                <legend>Frequência, automatização e ferramentas utilizadas</legend>
                                <div>
                                    <label htmlFor="frequency">Frequência dos testes</label>
                                    <select 
                                        className={selectOpen ? styles.selectOpen : undefined}
                                        name="frequency"
                                        id="frequency"
                                        value={formData.frequency}
                                        onChange={handleChange}
                                        onClick={() => setSelectOpen(!selectOpen)}
                                        onBlur={() => setSelectOpen(false)}>
                                        <option value="" disabled>Selecione uma opção</option>
                                        <option value="continuaAutomatizada">Contínua / Automatizada</option>
                                        <option value="manual">Manual</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="tools">Ferramentas utilizadas</label>
                                    <textarea 
                                        name="tools" 
                                        id="tools"
                                        value={formData.tools}
                                        onChange={handleChange}
                                    />
                                </div>
                            </fieldset>
                            <fieldset>
                                <legend>Ambiente de Implementação</legend>
                                <div>
                                    <select 
                                        name="environment" 
                                        id="environment"
                                        value={selectedEnvironment}
                                        onChange={handleEnvironmentChange}
                                    >
                                        <option value="" >Selecione uma opção</option>
                                        <option value="desenvolvimento">Desenvolvimento</option>
                                        <option value="staging">Staging</option>
                                        <option value="producao">Produção</option>
                                    </select>
                                </div>
                                {selectedEnvironment === "desenvolvimento" && (
                                    <div>
                                        <label htmlFor="devEnvironment">Ambiente de desenvolvimento</label>
                                        <select 
                                            name="devEnvironment" 
                                            id="devEnvironment"
                                            value={formData.devEnvironment}
                                            onChange={handleChange}
                                        >
                                            <option value="local">Local</option>
                                            <option value="dev">Dev</option>
                                        </select>
                                    </div>
                                )}
                            
                            {selectedEnvironment === "staging" && (
                                <div>
                                    <label htmlFor="stagingEnvironment">Ambiente de Homologação</label>
                                    <select name="stagingEnvironment" id="stagingEnvironment">
                                        <option value="qa">QA</option>
                                        <option value="staging">Staging</option>
                                    </select>
                                </div>
                            )}
                            
                            {selectedEnvironment === "producao" && (
                                <div>
                                    <label htmlFor="prodEnvironment">Ambiente de produção</label>
                                    <select name="prodEnvironment" id="prodEnvironment">
                                        <option value="prod">Produção</option>
                                    </select>
                                </div>
                            )}
                            
                                <div>
                                    <label htmlFor="observations">Observações</label>
                                    <textarea name="observations" id="observations"></textarea>
                                </div>
                            </fieldset>
                            
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