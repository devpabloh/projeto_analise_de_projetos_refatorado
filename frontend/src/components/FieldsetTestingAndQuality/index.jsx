import PropTypes from 'prop-types';

const FieldsetTestingAndQuality = ({formData, onChange})=>{
    const typesOfTests = [
        {
            id: 1,
            value: "unitario",
            label: "Unitário"
        },
        {
            id: 2,
            value: "integracao",
            label: "Integração"
        },
        {
            id: 3,
            value: "aceitacao",
            label: "Aceitação"
        },
        {
            id: 4,
            value: "performance",
            label: "Performance"
        },
        {
            id: 5,
            value: "seguranca",
            label: "Segurança"
        },
        {
            id: 7,
            value: "outrosTestes",
            label: "Outros testes"
        },

    ]



    const handleTestChange = (evento) => {
        const { name, value, checked } = evento.target;
        const updatedTests = checked 
            ? [...(formData.selectedTests || []), value]
            : (formData.selectedTests || []).filter(test => test !== value);
            
        onChange({
            target: {
                name: 'selectedTests',
                value: updatedTests
            }
        });
    };

    return(
        <fieldset>
            <legend>Testes e qualidade</legend>
            <div>
                <label htmlFor="carriedOutTests">Foram realizados testes</label>
                <select 
                    name="carriedOutTests"
                    id="carriedOutTests"
                    value={formData.carriedOutTests}
                    onChange={onChange}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                </select>
                {formData.carriedOutTests === "sim" && (
                    <fieldset>
                        <legend>Quais testes</legend>
                        {typesOfTests.map((test)=>(
                            <div key={test.id}>
                                <label htmlFor={test.value}>
                                    <input
                                        type="checkbox"
                                        name={test.value}
                                        id={test.value}
                                        value={test.value}
                                        checked={(formData.selectedTests || []).includes(test.value)}
                                        onChange={handleTestChange}
                                    />
                                    {test.label}
                                </label>
                            </div>
                        ))}
                    
                        {formData.selectedTests?.includes('outrosTestes') && (
                            <div>
                                <label htmlFor="otherTestsDescription">Quais são os outros testes</label>
                                <input
                                    type="text"
                                    id="otherTestsDescription"
                                    name="otherTestsDescription"
                                    value={formData.otherTestsDescription || ''}
                                    onChange={onChange}
                                />
                            </div>
                        )}
                        {formData.carriedOutTests === "sim" && (
                            <div>
                                <label htmlFor="frequencyAndAutomation">Testes executados de forma</label>
                                <select 
                                    name="frequencyAndAutomation" 
                                    id="frequencyAndAutomation"
                                    value={formData.frequencyAndAutomation}
                                    onChange={onChange}
                                >
                                    <option value="">Selecione uma opção</option>
                                    <option value="continua">Contínua</option>
                                    <option value="automatizada">Automatizada</option>
                                    <option value="manual">Manual</option>
                                </select>
                            </div>
                        )}
                        {formData.carriedOutTests === "sim" && (
                        <div>
                            <label htmlFor="testingToolsUsed">Ferramentas utilizadas</label>
                            <input
                                type="text"
                                id="testingToolsUsed"
                                name="testingToolsUsed"
                                placeholder="Ex: Jest, Mocha, JUnit, Selenium, Cypress, Postman, SonarQube, JMeter, K6"
                                value={formData.testingToolsUsed}
                                onChange={onChange}
                            />
                        </div>
                        )}
                    </fieldset>
                    
                )}

            </div>
        </fieldset>
    )
}

// Add PropTypes at the end of the file
FieldsetTestingAndQuality.propTypes = {
    formData: PropTypes.shape({
        carriedOutTests: PropTypes.string,
        selectedTests: PropTypes.arrayOf(PropTypes.string),
        otherTestsDescription: PropTypes.string,
        frequencyAndAutomation: PropTypes.string,
        testingToolsUsed: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired
};
export default FieldsetTestingAndQuality;