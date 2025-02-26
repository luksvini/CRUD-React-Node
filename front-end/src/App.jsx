import "./App.css";
import NavBar from "./components/NavBar";
import TableList from "./components/TableList";
import ModalForm from "./components/ModalForm";
import { useEffect, useState } from "react";
import axios from "axios";
import supabase from "./supabase";
import ScrollButons from "./components/ScrollButons";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [searchTerm, setSearchTerm] = useState('')
  const [clientData, setClientData] = useState(null)
  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState([])

  const fetchClients = async () => {
    try {
      if (import.meta.env.VITE_USE_SUPABASE === 'true') {
        const { data, error } = await supabase
          .from('clients_table')
          .select('*')

        if (error) throw error;

        setTableData(data)

      } else {
        // Axios logic commented out
        // const response = await axios.get('https://crud-react-node.onrender.com/api/clients')
        // setTableData(response.data)
      }

    } catch (err) {
      setError(err.message)
    }

  }

  useEffect(() => {
    fetchClients();
  }, [])

  const handleOpen = (mode, client) => {
    setClientData(client)
    setModalMode(mode);
    setIsOpen(true);
    if (mode === "add") {
      setClientData({ name: "", email: "", job: "", rate: "", isactive: false });
    }
  };

  const handleSubmit = async (newClientData) => {
    if (modalMode === "add") {
      try {
        if (import.meta.env.VITE_USE_SUPABASE === 'true') {
          const { data, error } = await supabase
            .from('clients_table') // Tabela no Supabase
            .insert([newClientData]) // Adiciona o novo cliente
            .select();

          if (error) throw error; // Lança erro se houver algum

          // Verifica se há dados e só adiciona ao estado se for válido
          if (data && data.length > 0) {
            setTableData((prevData) => [...prevData, data[0]]);
          } else {
            console.error('No data returned from Supabase');
          }
        } else {
          // Axios logic commented out
          // const response = await axios.post('https://crud-react-node.onrender.com/api/clients', newClientData);
          // console.log("Client added: ", response.data);
          // setTableData((prevData) => [...prevData, response.data]);
        }
      } catch (error) {
        console.error("Error adding client: ", error);
        if (error.response && error.response.data && error.response.data.message === "Email already exists.") {
          alert("An error occurred while updating the client. Please try again.");
        } else {
          alert("This email is already in use. Please try another one.");
        }
      }
    } else {
      // Atualizando cliente já existente
      try {
        if (import.meta.env.VITE_USE_SUPABASE === 'true') {
          const { data, error } = await supabase
            .from('clients_table')
            .update(newClientData)
            .eq('id', clientData.id)
            .select(); // Atualiza o cliente pelo ID

          if (error) throw error;

          setTableData((prevData) =>
            prevData.map((client) => (client.id === clientData.id ? data[0] : client))
          );
        } else {
          // Axios logic commented out
          // const response = await axios.put(`https://crud-react-node.onrender.com/api/clients/${clientData.id}`, newClientData);
          // console.log("Client updated: ", response.data);
          // setTableData((prevData) =>
          //   prevData.map((client) => (client.id === clientData.id ? response.data : client))
          // );
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message === "Email already exists.") {
          alert("An error occurred while updating the client. Please try again.");
        } else {
          alert("This email is already in use. Please try another one.");
        }
      }
    }

    setIsOpen(false);
  };

  const handleDeleteAll = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete all clients?")

    if (confirmDelete) {
      try {
        if (import.meta.env.VITE_USE_SUPABASE === 'true') {
          const { error } = await supabase
            .from("clients_table")
            .delete()
            .neq("id", -1)

          if (error) throw error;

          setTableData([]);

          const { data: remainingClients, error: fetchError } = await supabase
            .from("clients_table")
            .select("*");

          if (fetchError) throw fetchError;

          // Chamar o procedimento armazenado para resetar o ID
          if (remainingClients.length == 0) {
            const { error: resetError } = await supabase.rpc('reset_clients_table_id');

            if (resetError) throw resetError;
          }

        } else {
          // Axios logic commented out
          // await axios.delete("https://crud-react-node.onrender.com/api/clients")
          // setTableData([])
        }
      } catch (err) {
        setError(err.message)
      }
    }
  }

  return (
    <>
      <NavBar onOpen={() => handleOpen("add")}
        onSearch={setSearchTerm}
        onDeleteAll={handleDeleteAll}
      />

      <TableList
        setTableData={setTableData} tableData={tableData}
        handleOpen={handleOpen}
        searchTerm={searchTerm} />

      <ModalForm
        isOpen={isOpen}
        OnSubmit={handleSubmit}
        onClose={() => setIsOpen(false)}
        mode={modalMode} clientData={clientData}
      />

      <ScrollButons
      ScrollButons= {ScrollButons}
      /> 

    </>
  );

}

export default App;
