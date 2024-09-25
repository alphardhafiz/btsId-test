/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { getAuthConfig } from "../utils/auth";

const ChecklistCard = ({ checklist, onToggleItem }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <h2 className="text-lg font-bold mb-2">{checklist.name}</h2>
      {checklist.items && checklist.items.length > 0 ? (
        <ul>
          {checklist.items.map((item) => (
            <li key={item.id} className="flex items-center mb-1">
              <input
                type="checkbox"
                checked={item.itemCompletionStatus}
                onChange={() =>
                  onToggleItem(checklist.id, item.id, item.itemCompletionStatus)
                }
                className="mr-2"
              />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items in this checklist.</p>
      )}
    </div>
  );
};

const Home = () => {
  const [checklists, setChecklists] = useState([]);

  const getChecklists = async () => {
    try {
      const res = await axios.get(`${baseUrl()}/checklist`, getAuthConfig());
      console.log('tes')
      setChecklists(res.data.data);
    } catch (error) {
      console.error("Error fetching checklists:", error);
    }
  };

  const toggleItemCompletion = async (checklistId, itemId, currentStatus) => {
    const userData = localStorage.getItem("userData1");
    const token = userData ? JSON.parse(userData).token : null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const updatedStatus = !currentStatus;

      await axios.put(
        `${baseUrl()}/checklist/${checklistId}/item/${itemId}`,
        {},
        config
      );

      setChecklists((prevChecklists) =>
        prevChecklists.map((checklist) => {
          if (checklist.id === checklistId) {
            return {
              ...checklist,
              items: checklist.items.map((item) =>
                item.id === itemId
                  ? { ...item, itemCompletionStatus: updatedStatus }
                  : item
              ),
            };
          }
          return checklist;
        })
      );
    } catch (error) {
      console.error("Error updating item completion status:", error);
    }
  };

  useEffect(() => {
    getChecklists();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Checklists</h1>
      {checklists.map((checklist) => (
        <ChecklistCard
          key={checklist.id}
          checklist={checklist}
          onToggleItem={toggleItemCompletion}
        />
      ))}
    </div>
  );
};

export default Home;
