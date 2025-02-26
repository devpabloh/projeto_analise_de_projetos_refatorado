const FieldsetDeploymentEnvironment = ({formData, onChange})=>{

    return (
        <fieldset>
            <legend>Ambiente de implementação</legend>
            <div>
                <label htmlFor="developmentEnvironment">Ambiente de desenvolvimento</label>
                <select 
                    name="developmentEnvironment" 
                    id="developmentEnvironment"
                    value={formData.developmentEnvironment}
                    onChange={onChange}
                    >
                    <option value="">Selecione uma opção</option>
                    <option value="implementado">Implementado</option>
                    <option value="planejado">Em andamento/Planejado</option>
                </select>
            </div>
            <div>
                <label htmlFor="approvalEnvironment">Ambiente de homologação</label>
                <select 
                    name="approvalEnvironment" 
                    id="approvalEnvironment"
                    value={formData.approvalEnvironment}
                    onChange={onChange}
                    >
                    <option value="">Selecione uma opção</option>
                    <option value="implementado">Implementado</option>
                    <option value="planejado">Em andamento/Planejado</option>
                </select>
            </div>
            <div>
                <label htmlFor="productionEnvironment">Ambiente de produção</label>
                <select 
                    name="productionEnvironment" 
                    id="productionEnvironment"
                    value={formData.productionEnvironment}
                    onChange={onChange}
                    >
                    <option value="">Selecione uma opção</option>
                    <option value="implementado">Implementado</option>
                    <option value="planejado">Em andamento/Planejado</option>
                </select>
            </div>
            <div>
                <label htmlFor="deploymentEnvironmentNotes">Observações</label>
                <textarea 
                    name="deploymentEnvironmentNotes" id="deploymentEnvironmentNotes"
                    value={formData.deploymentEnvironmentNotes}
                    onChange={onChange}
                    placeholder="Detalhes sobre a configuração, restrições ou peculiaridades de cada ambiente."
                >
                </textarea>
            </div>
        </fieldset>
    )
}

export default FieldsetDeploymentEnvironment