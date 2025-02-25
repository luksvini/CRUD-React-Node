import React, { useEffect, useState } from "react";

const ModalForm = ({ isOpen, onClose, mode, OnSubmit, clientData }) => {
  const [rate, setRate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [job, setJob] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatusChange = (e) => {
    setStatus(e.target.value === "Active");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const clientData = {
        name,
        email,
        job,
        rate: Number(rate),
        isactive: status,
      };
      await OnSubmit(clientData);
    } catch (err) {
      console.error(err);
    }
    onClose();
  };

  useEffect(() => {
    if (mode === "edit" && clientData) {
      setName(clientData.name);
      setEmail(clientData.email);
      setJob(clientData.job);
      setRate(clientData.rate);
      setStatus(clientData.isactive);
    } else {
      setName("");
      setEmail("");
      setJob("");
      setRate("");
      setStatus(false);
    }
  }, [mode, clientData]);

  return (
    <>
      {/* 
        A classe `modal` e `modal-open` controlam a exibição do diálogo.
        Se `isOpen` for true, adicionamos `modal-open` para mostrar o modal.
      */}
      <dialog
        id="my_modal_3"
        className={`modal ${isOpen ? "modal-open" : ""}`}
      >
        {/* 
          Container do modal:
          - Fundo escuro (bg-gray-800)
          - Texto claro (text-white)
          - Largura responsiva (w-full sm:w-96)
          - Espaçamento interno (p-6)
          - Bordas arredondadas (rounded-lg)
          - Sombra (shadow-xl)
        */}
        <div className="modal-box bg-gray-800 text-white w-full sm:w-96 p-6 rounded-lg shadow-xl relative">
          <h3 className="font-bold text-xl text-center mb-6">
            {mode === "edit" ? "Edit Client" : "Add Client"}
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Campo Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Campo Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo Job */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Job
              </label>
              <input
                type="text"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter job"
                value={job}
                onChange={(e) => setJob(e.target.value)}
                required
              />
            </div>

            {/* Campo Rate */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Rate
              </label>
              <input
                type="number"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            {/* Campo Status */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={status ? "Active" : "Inactive"}
                onChange={handleStatusChange}
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Inactive">Inactive</option>
                <option value="Active">Active</option>
              </select>
            </div>

            {/* Botões (Fechar e Salvar) */}
            <div className="flex justify-between items-center">
              {/* Botão de fechar */}
              <button
                type="button"
                className="text-gray-400 hover:text-white transition duration-200"
                onClick={onClose}
              >
                {/* Ícone de fechar (X) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Botão de salvar */}
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {mode === "edit" ? "Save Changes" : "Add Client"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ModalForm;
