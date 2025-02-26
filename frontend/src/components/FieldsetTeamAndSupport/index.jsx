const FieldsetTeamAndSupport = ({formData, onChange})=>{

    return(
        
        <fieldset>
            <legend>Equipe de Suporte</legend>
            <div>
                <label htmlFor="technicalLeaderName">Nome do líder técnico</label>
                <input 
                    type="text" 
                    name="technicalLeaderName" 
                    id="technicalLeaderName" 
                    value={formData.technicalLeaderName}
                    onChange={onChange}
                    placeholder="Nome do Líder Técnico."
                />
            </div>
            <div>
                <label htmlFor="">Nome do gerente de projeto</label>
                <input
                    type="text"
                    name="projectManagerName"
                    id="projectManagerName"
                    value={formData.projectManagerName}
                    onChange={onChange}
                    placeholder="Nome do Gerente de Projeto."
                />
            </div>
            <div>
                <label htmlFor="">Há suporte técnico disponível para o projeto</label>
                <select
                    name="technicalSupport"
                    id="technicalSupport"
                    value={formData.technicalSupport}
                    onChange={onChange}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
            {formData.technicalSupport === "sim" && (
            <div>
                <div>
                    <label htmlFor=""> Nome do responsável pelo suporte</label>
                    <input
                        type="text"
                        name="supportName"
                        id="supportName"
                        value={formData.supportName}
                        onChange={onChange}
                        placeholder="Nome do Responsável pelo Suporte."
                    />
                </div>
                <div>
                    <label htmlFor="supportPeriod">O suporte cobre quais períodos</label>
                    <select 
                        name="supportPeriod" 
                        id="supportPeriod"
                        value={formData.supportPeriod}
                        onChange={onChange}
                        >
                        <option value="horarioComercial">Horário comercial</option>
                        <option value="24por7">24/7</option>
                        <option value="apenasHorárioCritico">Apenas em horário crítico</option>
                    </select>
                </div>
            </div>  
            )}
        </fieldset>
    )
}

export default FieldsetTeamAndSupport