const FieldsetDevelopmentStatus = ({formData, onChange}) =>{
    const developmentPhases = [
        { id: 1, value: "planegamento", label: "Planejamento"},
        { id: 2, value: "desenvolvimento", label: "Desenvolvimento"},
        { id: 3, value: "testes", label: "Testes"},
        { id: 4, value: "homologação", label: "Homologação"},
    ]

    return (
        <fieldset>
            <legend>Status de  desenvolvimento</legend>
            <div>
                <label htmlFor="developmentPhase">Fase de desenvolvimento</label>
                <select 
                    name="developmentPhase" 
                    id="developmentPhase"
                    value={formData.developmentPhase}
                    onChange={onChange}
                >
                    <option value="" >Selecione uma opção</option>
                    {developmentPhases.map((phase)=>(
                        <option key={phase.id} value={phase.value}>{phase.label}</option>
                    ))}
                </select>
            </div>
        </fieldset>
    )
}

export default FieldsetDevelopmentStatus