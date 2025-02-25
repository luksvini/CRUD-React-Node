import React from "react";

const Navbar = ({ onOpen, onSearch, onDeleteAll }) => {

  const handleSearchChange = (e) => {
    onSearch(e.target.value);
  };

  return (
    <>
      <div className="navbar dark:bg-blue-800 p-4  flex justify-between items-center">
        <div className="navbar-start">
          <a className="text-white text-2xl font-semibold hover:text-yellow-300 transition duration-200">Clients</a>
        </div>
        <div className="navbar-center hidden md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="input rounded-lg p-2 w-60 md:w-72 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
            onChange={handleSearchChange}
            
          />
        </div>
        <div className="navbar-end space-x-4">
          <button
            onClick={onOpen}
           
            className="bg-yellow-500 dark:bg-yellow-600 cursor-pointer hover:bg-yellow-600 dark:hover:bg-yellow-500 text-white font-medium px-6 py-2 rounded-md transition shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-300"
          >
            Add Client
          </button>

          {/* Botão de excluir todos os clientes */}
          <button
            onClick={onDeleteAll}
            className="bg-red-500 dark:bg-red-600 cursor-pointer hover:bg-red-600 dark:hover:bg-red-500 text-white font-medium px-6 py-2 rounded-md transition shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300"
          >
            Delete All
          </button>
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
