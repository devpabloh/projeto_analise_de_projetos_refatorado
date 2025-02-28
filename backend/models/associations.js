export async function createProject(requisicao, resposta) {
    try {
        const userId = requisicao.user.id;
        console.log('Received data:', requisicao.body);
        console.log('User ID:', userId);
        
        // Extrair dados para cada tabela
        const {
            // Dados do projeto principal
            projectName, projectDescription, responsibleFillingOut, responsibleContact,
            fillingDate, developmentPhase, hasDocumentation, documentationType,
            
            // Dados de teste
            carriedOutTests, selectedTests, otherTestsDescription, 
            frequencyAndAutomation, testingToolsUsed,
            
            // Dados de ambiente
            developmentEnvironment, approvalEnvironment, productionEnvironment,
            deploymentEnvironmentNotes,
            
            // Dados de documentação
            technicalDocumentation, linkTechnicalDocumentation, updatingTechnicalDocumentation,
            updateTechnicalVersion, functionalDocumentation, linkFunctionalDocumentation,
            updatingFunctionalDocumentation, updateFunctionalVersion,
            
            // Dados de equipe
            technicalLeaderName, projectManagerName, technicalSupport,
            supportName, supportPeriod,
            
            // Dados de segurança
            securityMeasures, whatSecurityMeasures, otherSecurityMeasures,
            compliance, whatCompliance, otherCompliance,
            
            // Dados adicionais
            challengesFaced, identifiedRisks, additionalComments
        } = requisicao.body;
        
        // Criar o projeto principal
        const project = await Project.create({
            userId,
            projectName,
            projectDescription,
            responsibleFillingOut,
            responsibleContact,
            fillingDate,
            developmentPhase,
            hasDocumentation,
            documentationType
        });
        
        // Criar registro de testes
        await Test.create({
            projectId: project.id,
            carriedOutTests,
            selectedTests,
            otherTestsDescription,
            frequencyAndAutomation,
            testingToolsUsed
        });
        
        // Criar registro de ambiente
        await Environment.create({
            projectId: project.id,
            developmentEnvironment,
            approvalEnvironment,
            productionEnvironment,
            deploymentEnvironmentNotes
        });
        
        // Criar registro de documentação
        await Documentation.create({
            projectId: project.id,
            technicalDocumentation,
            linkTechnicalDocumentation,
            updatingTechnicalDocumentation,
            updateTechnicalVersion,
            functionalDocumentation,
            linkFunctionalDocumentation,
            updatingFunctionalDocumentation,
            updateFunctionalVersion
        });
        
        // Criar registro de equipe
        await Team.create({
            projectId: project.id,
            technicalLeaderName,
            projectManagerName,
            technicalSupport,
            supportName,
            supportPeriod
        });
        
        // Criar registro de segurança
        await Security.create({
            projectId: project.id,
            securityMeasures,
            whatSecurityMeasures,
            otherSecurityMeasures,
            compliance,
            whatCompliance,
            otherCompliance
        });
        
        // Criar registro de informações adicionais
        await AdditionalInfo.create({
            projectId: project.id,
            challengesFaced,
            identifiedRisks,
            additionalComments
        });
        
        resposta.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        resposta.status(500).json({ error: error.message });
    }
}