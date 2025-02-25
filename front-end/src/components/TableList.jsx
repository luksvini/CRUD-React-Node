import axios from 'axios';
import React, { useState } from "react";
import supabase from '../supabase';
const USE_SUPABASE = true;

const TableList = ({ handleOpen, tableData, setTableData, searchTerm }) => {
  const [error, setError] = useState(null);

  const filteredData = tableData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.job.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => a.id - b.id);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    
    if (confirmDelete) {
      try {
        if (USE_SUPABASE) {
          const { error } = await supabase
            .from('clients_table')
            .delete()
            .eq("id", id);

          if (error) throw error;

          setTableData((prevData) => prevData.filter(client => client.id !== id));

          const { data: remainingClients, error: fetchError } = await supabase
            .from("clients_table")
            .select("*");

          if (fetchError) throw fetchError;

          if (remainingClients.length == 0) {
            const { error: resetError } = await supabase.rpc('reset_clients_table_id');
            if (resetError) throw resetError;
    
         }

          
        } else {
          await axios.delete(`http://localhost:3001/api/clients/${id}`);
          setTableData((prevData) => prevData.filter(client => client.id !== id));
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-500 text-white text-center p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="overflow-x-auto mt-0">
        <table className="min-w-full rounded-lg shadow-lg dark:bg-gray-800 bg-white dark:text-white text-black">
          {/* Cabeçalho */}
          <thead className="bg-blue-600 text-white dark:bg-blue-800">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Job</th>
              <th className="px-4 py-2 text-left">Rate</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>

          {/* Corpo da tabela */}
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-300 dark:divide-gray-600">
            {filteredData.map((client) => (
              <tr key={client.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                <td className="px-4 py-3 text-black dark:text-white">{client.id}</td>
                <td className="px-4 py-3 text-black dark:text-white">{client.name}</td>
                <td className="px-4 py-3 text-black dark:text-white">{client.email}</td>
                <td className="px-4 py-3 text-black dark:text-white">{client.job}</td>
                <td className="px-4 py-3 text-black dark:text-white">{client.rate}</td>
                <td className="px-4 py-3">
                  <button
                    className={`px-4 py-1 rounded-full font-semibold text-sm transition 
                    ${client.isactive ? "bg-green-500 dark:bg-green-700 text-white" : "bg-gray-300 dark:bg-gray-600 text-gray-700"}`}
                  >
                    {client.isactive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 flex items-center justify-center gap-2">
                  <button
                    onClick={() => handleOpen("edit", client)}
                    className="bg-yellow-500 dark:bg-yellow-600 cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-500 text-white px-3 py-1 rounded-md transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(client.id)}
                    className="bg-red-500 dark:bg-red-600 cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 text-white px-3 py-1 rounded-md transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableList;
