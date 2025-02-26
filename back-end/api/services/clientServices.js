// Importando a query (consulta) do db.js para realizar consultas no banco de dados
import { query } from "../db.js";
import supabase from "../supabase.js";
import dotenv from 'dotenv';

dotenv.config();


// Função assíncrona para buscar todos os clientes no banco de dados
export const getClients = async() => {

    try{ 

    if (process.env.USE_SUPABASE === 'true'){
    const {data, error} = await supabase
    .from("clients_table")
    .select("*")
    if(error) throw error;
    return data;

    } else {
    // Executa a consulta SQL para selecionar todos os registros da tabela 'clients_table'
    const {rows} = await query('SELECT * FROM clients_table')

    // Retorna todos os clientes encontrados
    return rows
    } 
    
    } catch (err) {
    console.error("Error: ", err)
    
    }

    }



export const createClient = async(clientData) => {
    const { name, email, job, rate, isactive = false } = clientData;
    const activeStatus = isactive === "true" || isactive === true ? true : false;

    try {

        if(process.env.USE_SUPABASE === 'true'){
        const { data : existingClient, error: checkError } = await supabase
        .from("clients_table")
        .select("*")
        .eq("email", email)

        if (checkError) throw checkError;
        if (existingClient.length > 0) {
            throw new Error ("Email already exists.")
        }

        const { data, error} = await supabase
        .from("clients_table")
        .insert([{name, email, job, rate, isactive: activeStatus}])
        .select()

        if (error) throw error
        return data[0]
        } else{

         // Verifica se o email já existe antes de tentar criar o cliente
        const { rows: existingClient } = await query(
            `SELECT * FROM clients_table WHERE email = $1`,
            [email]
        );

        if (existingClient.length > 0) {
            // Se já existir um cliente com esse email, retorne uma mensagem de erro
            throw new Error("Email already exists.");
        }

        // Executa a query para inserir o novo cliente
        const { rows } = await query(
            `INSERT INTO clients_table (name, email, job, rate, isactive)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *`,
            [name, email, job, rate, activeStatus]
        );

        return rows[0]; // Retorna o cliente recém-criado
    }  {
        
    }

        }catch (error) {
        throw error; // Retorna o erro para ser tratado na UI
        }

};


export const updateClient = async(clientId, clientData) => {
    const { name, email, job, rate, isactive } = clientData;

    try {

        if (process.env.USE_SUPABASE === 'true') {

       
       const { data: existingClients, error: checkError } = await supabase
            .from("clients_table")
            .select("*")
            .eq("email", email)
            .neq("id", clientId);

        if (checkError) throw checkError;
        if (existingClients.length > 0) {
            throw new Error("Email already exists.");
        }

        const { data, error } = await supabase
            .from("clients_table")
            .update({ name, email, job, rate, isactive })
            .eq("id", clientId)
            .select();

             if (error) throw error;
            return data[0];
        } else{

        // Verifica se o email já existe para outro cliente (mas não para o cliente atual)
        const { rows: existingClients } = await query(
            `SELECT * FROM clients_table WHERE email = $1 AND id <> $2`,
            [email, clientId]
        );

        // Se o email já estiver em uso por outro cliente, retorna erro
        if (existingClients.length > 0) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Se não houver clientes com o email, ou o email for do próprio cliente, continua a atualização
        const { rows } = await query(
            `UPDATE clients_table SET name = $1, email = $2, job = $3, rate = $4, isactive = $5
            WHERE id = $6
            RETURNING *`,
            [name, email, job, rate, isactive, clientId]
        );

        return rows[0]; // Retorna o cliente atualizado
        } 
    } catch (error) {
        
        throw error; // Retorna o erro para ser tratado na UI
    }
};




export const deleteClient = async (clientId) => {
    try {

        if (process.env.USE_SUPABASE === 'true') {
        const {error} = await supabase

        .from("clients_table")
        .delete()
        .eq("id", clientId)

        if (error) throw error
        return true;
        } else{
        
        // Deleta o cliente pelo ID
        const { rowCount } = await query(
            `DELETE FROM clients_table WHERE id = $1`, 
            [clientId]
        );

        // Se a tabela estiver vazia, resetamos a sequência de IDs
        const { rows } = await query(`SELECT COUNT(*) FROM clients_table`);
        const totalClients = parseInt(rows[0].count, 10);

        if (totalClients === 0) {
            await query(`ALTER SEQUENCE clients_table_id_seq RESTART WITH 1`);
        }

        return rowCount > 0;

        }

    } catch (error) {
        console.error("Database error:", error);
        throw error;
    }
};


// Função assíncrona para buscar clientes no banco com base em um termo de pesquisa
export const searchClients = async (searchTerm) => {
    try{

    if(process.env.USE_SUPABASE === 'true'){
        const { data, error } = await supabase
        .from("clients_table")
        .select("*")
        .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,job.ilike.%${searchTerm}%`)

        if (error) throw error;
        return data;
    
    } else{

     /* Executa a query SQL para procurar clientes pelo nome, email ou cargo usando
    ILIKE (insensível a maiúsculas/minúsculas) */
    const {rows} = await  query(
    `SELECT * FROM clients_table WHERE name ILIKE $1 OR email ILIKE $1 OR job ILIKE $1`,
    [`%${searchTerm}%`] // Usa "%" para buscar qualquer correspondência parcial
    )

    // Retorna os clientes encontrados
    return rows;
    
    }  
        
    } catch (err){
        console.error(err)
    }
    
   
}