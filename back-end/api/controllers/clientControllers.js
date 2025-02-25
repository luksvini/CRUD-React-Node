// Importando os serviços do clientService.js, que contém funções para interagir com o banco de dados
import * as clientService from "../services/clientServices.js";

// Função para buscar todos os clientes
export const getClients = async (request, response) => {
    try {
        // Chama a função getClients do serviço, que busca os clientes no banco
        const clients = await clientService.getClients();
        
        // Retorna a lista de clientes com status HTTP 200 (OK)
        response.status(200).json(clients);
    } catch (err) {
        // Em caso de erro, exibe a mensagem no console
        console.error("Error fetching clients", err);
        
        // Retorna um erro 500 (Erro interno do servidor)
        response.status(500).json({ message: "Internal Server Error" });
    }
};

// Função para criar um novo cliente
export const createClient = async (request, response) => {
    try {
        // Obtém os dados do corpo da requisição
        const clientData = request.body;
        
        // Chama a função createClient do serviço para inserir o novo cliente no banco
        const newClient = await clientService.createClient(clientData);
        
        // Retorna o novo cliente criado com status HTTP 200 (OK)
        response.status(200).json(newClient);
    } catch (err) {
        // Em caso de erro, exibe a mensagem no console
        console.error("Error adding client", err);
        
        // Retorna um erro 500 (Erro interno do servidor)
        response.status(500).json({ message: "Internal Server Error" });
    }
};

// Função para atualizar um cliente existente
export const updateClient = async (request, response) => {
    try {
        // Obtém o ID do cliente dos parâmetros da URL
        const clientId = request.params.id;
        
        // Obtém os dados do corpo da requisição
        const clientData = request.body;
        
        // Chama a função updateClient do serviço para atualizar os dados do cliente
        const updatedClient = await clientService.updateClient(clientId, clientData);
        
        // Se o cliente não for encontrado, retorna um erro 404 (Não encontrado)
        if (!updatedClient) {
            return response.status(404).json({ message: "Client not found" });
        }

        // Retorna o cliente atualizado com status HTTP 200 (OK)
        response.status(200).json(updatedClient);
    } catch (err) {
        // Em caso de erro, exibe a mensagem no console
        
        
        // Retorna um erro 500 (Erro interno do servidor)
        response.status(500).json({ message: "Internal Server Error" });
    }
};

// Função para deletar um cliente do banco de dados
export const deleteClient = async (request, response) => {
    try {
        // Obtém o ID do cliente dos parâmetros da URL
        const clientId = request.params.id;
        
        // Chama a função deleteClient do serviço para deletar o cliente do banco
        const deleted = await clientService.deleteClient(clientId);
        
        // Se o cliente não for encontrado, retorna um erro 404 (Não encontrado)
        if (!deleted) {
            return response.status(404).json({ message: "Client not found" });
        }

        // Retorna um status HTTP 200 (OK) sem corpo de resposta
        response.status(200).send();
    } catch (err) {
        // Em caso de erro, exibe a mensagem no console
        console.error("Error deleting client", err);
        
        // Retorna um erro 500 (Erro interno do servidor)
        response.status(500).json({ message: "Internal Server Error" });
    }
};

// Função para buscar clientes com base em um termo de pesquisa
export const searchClients = async (request, response) => {
    try {
        // Obtém o termo de pesquisa da query string (exemplo: ?q=nome)
        const searchTerm = request.query.q;
        
        // Chama a função searchClients do serviço para buscar os clientes
        const clients = await clientService.searchClients(searchTerm);
        
        // Retorna os clientes encontrados com status HTTP 200 (OK)
        response.status(200).json(clients);
    } catch (err) {
        // Em caso de erro, exibe a mensagem no console
        console.error("Error searching clients", err);
        
        // Retorna um erro 500 (Erro interno do servidor)
        response.status(500).json({ message: "Internal Server Error" });
    }
};
