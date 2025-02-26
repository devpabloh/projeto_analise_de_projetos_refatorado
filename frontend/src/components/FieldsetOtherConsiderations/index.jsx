const FieldsetOtherConsiderations = ({formData, onChange})=>{
    return (
        <fieldset>
            <legend>Outras Considerações</legend>
            <div>
                    <label htmlFor="challengesFaced">Principais desafios enfrentados até agora</label>
                    <textarea
                        name="challengesFaced"
                        id="challengesFaced"
                        value={formData.challenges}
                        onChange={onChange}
                        placeholder="Principais desafios enfrentados até agora."
                    />
                </div>
                <div>
                    <label htmlFor="identifiedRisks">Riscos identificados para a continuidade do projeto</label>
                    <textarea
                        name="identifiedRisks"
                        id="identifiedRisks"
                        value={formData.identifiedRisks}
                        onChange={onChange}
                        placeholder="Riscos identificados para a continuidade do projeto."
                    />
                </div>
                <div>
                    <label htmlFor="commentsAdditionals">Comentários adicionais</label>
                    <textarea
                        name="commentsAdditionals"
                        id="commentsAdditionals"
                        value={formData.commentsAdditionals}
                        onChange={onChange}
                        placeholder="Comentários adicionais."
                    />
                </div>
        </fieldset>
    )
}

export default FieldsetOtherConsiderations;