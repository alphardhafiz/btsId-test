import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { baseUrl } from "../utils/baseUrl";
import { Link } from "react-router-dom";
import { getAuthConfig } from "../utils/auth";

const Checklist = () => {
  const [checklists, setChecklists] = useState([]); 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm(); 

 
  const openModal = () => {
    setModalIsOpen(true);
  };

 
  const closeModal = () => {
    setModalIsOpen(false);
    reset(); 
  };

 
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${baseUrl()}/checklist`, data, getAuthConfig());
      console.log({ res });
      getChecklist();
      closeModal();
    } catch (error) {
      console.log({ error });
    }
  };


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl()}/checklist/${id}`,  getAuthConfig());
      getChecklist();
    } catch (error) {
      console.log({ error });
    }
  };

  const getChecklist = async () => {
    try {
      const res = await axios.get(`${baseUrl()}/checklist`,  getAuthConfig());
      console.log(res.data);
      setChecklists(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getChecklist();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checklist</h1>
      <button
        onClick={openModal}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Checklist
      </button>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {checklists.map((item, index) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">
                <Link to={`${item.id}`} className="text-blue-500 mr-2">Detail</Link>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for creating new checklist */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Checklist"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">Create New Checklist</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
              placeholder="Enter checklist name"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

Modal.setAppElement("#root"); 

export default Checklist;
