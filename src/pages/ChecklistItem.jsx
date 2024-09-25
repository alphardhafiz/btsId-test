import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { baseUrl } from "../utils/baseUrl";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthConfig } from "../utils/auth";

const ChecklistItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const openModal = (item = null) => {
    setCurrentItem(item);
    setModalIsOpen(true);
    reset(item ? { itemName: item.name } : {});
  };

  const closeModal = () => {
    setModalIsOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      let res;
      if (currentItem) {
        res = await axios.put(
          `${baseUrl()}/checklist/${id}/item/rename/${currentItem.id}`,
          data,
          getAuthConfig()
        );
      } else {
        res = await axios.post(
          `${baseUrl()}/checklist/${id}/item`,
          data,
          getAuthConfig()
        );
      }

      console.log({ res });
      getChecklist();
      closeModal();
    } catch (error) {
      console.log({ error });
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axios.delete(
        `${baseUrl()}/checklist/${id}/item/${itemId}`,
        getAuthConfig()
      );
      getChecklist();
    } catch (error) {
      console.log({ error });
    }
  };

  const getChecklist = async () => {
    try {
      const res = await axios.get(
        `${baseUrl()}/checklist/${id}/item`,
        getAuthConfig()
      );
      console.log(res.data);
      setChecklists(res.data.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (id) {
      getChecklist();
    } else {
      navigate("/checklist");
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checklist Items</h1>
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Create Item
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
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => openModal(item)}
                >
                  Edit
                </button>
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

      {/* Modal for creating or editing checklist item */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create/Edit Checklist Item"
        className="modal"
        overlayClassName="overlay"
      >
        <h2 className="text-xl font-bold mb-4">
          {currentItem ? "Edit Checklist Item" : "Create New Checklist Item"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              {...register("itemName", { required: "Item Name is required" })}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
              placeholder="Enter checklist item name"
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {currentItem ? "Update" : "Create"}
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

export default ChecklistItem;
