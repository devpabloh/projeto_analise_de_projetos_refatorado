import PropTypes from 'prop-types';

const FieldsetDocumentation = ({formData, onChange})=>{

    return(
        <fieldset>
            <legend>Documentação</legend>
            <div>
                <label htmlFor="hasDocumentation">Tem documentação</label>
                <select 
                    name="hasDocumentation" 
                    id="hasDocumentation"
                    value={formData.hasDocumentation}
                    onChange={onChange}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
            </div>
            {formData.hasDocumentation === "sim" && (
                <div>
                    <label htmlFor="technicalDocumentation">Documentação técnica</label>
                    <select 
                        name="technicalDocumentation" 
                        id="technicalDocumentation"
                        value={formData.technicalDocumentation}
                        onChange={onChange}
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="disponivel">Disponível</option>
                        <option value="emDesenvolvimento">Em Desenvolvimento</option>
                    </select>
                </div>
            )}
            {formData.technicalDocumentation === "disponivel" && (
                <div>
                    <label htmlFor="linkTechnicalDocumentation">Local/Link da documentação técnica</label>
                    <input 
                        type="text" 
                        id="linkTechnicalDocumentation"
                        name="linkTechnicalDocumentation"
                        value={formData.linkTechnicalDocumentation}
                        onChange={onChange}
                        placeholder="Campo para informar onde a documentação pode ser acessada."
                    />
                </div>
            )}
            {formData.technicalDocumentation === "disponivel" && (
                <div>
                    <div>
                        <label htmlFor="updatingTechnicalDocumentation">Data da última atualização</label>
                        <input 
                            id="updatingTechnicalDocumentation"
                            name="updatingTechnicalDocumentation"
                            type="Date"
                            value={formData.updatingTechnicalDocumentation}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="updateTechnicalVersion "></label>
                        <input 
                            type="text"
                            name="updateTechnicalVersion"
                            id="updateTechnicalVersion"
                            value={formData.updateTechnicalVersion}
                            onChange={onChange}
                            placeholder="Versão atual da documentação."

                        />
                    </div>
                </div>
            )}
            {formData.hasDocumentation === "sim" && (
                <div>
                    <label htmlFor="functionalDocumentation">Documentação funcional</label>
                    <select 
                        name="functionalDocumentation" 
                        id="functionalDocumentation"
                        value={formData.functionalDocumentation
                        }
                        onChange={onChange}
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="disponivel">Disponível</option>
                        <option value="emDesenvolvimento">Em Desenvolvimento</option>
                    </select>
                </div>
            )}
            {formData.functionalDocumentation === "disponivel" && (
                <div>
                    <label htmlFor="linkFunctionalDocumentation">Local/Link da documentação funcional</label>
                    <input 
                        type="text" 
                        id="linkFunctionalDocumentation"
                        name="linkFunctionalDocumentation"
                        value={formData.linkFunctionalDocumentation}
                        onChange={onChange}
                        placeholder="Campo para referência."
                    />
                </div>
            )}
            {formData.functionalDocumentation === "disponivel" && (
                <div>
                    <div>
                        <label htmlFor="updatingFunctionalDocumentation">Data da última atualização</label>
                        <input 
                            id="updatingFunctionalDocumentation"
                            name="updatingFunctionalDocumentation"
                            type="Date"
                            value={formData.updatingFunctionalDocumentation}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="updateFunctionalVersion"></label>
                        <input 
                            type="text"
                            name="updateFunctionalVersion"
                            id="updateFunctionalVersion"
                            value={formData.updateFunctionalVersion}
                            onChange={onChange}
                            placeholder="Versão atual da documentação."
                        />
                    </div>
                </div>
            )}
        </fieldset>
    )
}

FieldsetDocumentation.propTypes = {
    formData: PropTypes.shape({
        hasDocumentation: PropTypes.string,
        technicalDocumentation: PropTypes.string,
        linkTechnicalDocumentation: PropTypes.string,
        updatingTechnicalDocumentation: PropTypes.string,
        updateTechnicalVersion: PropTypes.string,
        functionalDocumentation: PropTypes.string,
        linkFunctionalDocumentation: PropTypes.string,
        updatingFunctionalDocumentation: PropTypes.string,
        updateFunctionalVersion: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
};

export default FieldsetDocumentation