import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import NavBar from "../components/NavBar";
import Countdown from "../components/Countdown";
import PopUp from "../components/PopUp";

interface SaveItemsProps {
  foodId?: string;
  foodName: string;
  foodCategory: string;
  foodExpiryDate: string;
}

const HomePage = () => {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("Not Selected");
  const [itemExpiryDate, setItemExpiryDate] = useState("");
  const [editingFoodId, setEditingFoodId] = useState<string | null>(null);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);
  const [userSaveItems, setUserSaveItems] = useState<SaveItemsProps[]>([]);
  const [saveId, setSaveId] = useState("");
  const [expiringItems, setExpiringItems] = useState<SaveItemsProps[]>([]);
  const [isSaveItemDeleted, setIsSaveItemDeleted] = useState<boolean>(false);
  const [deletingFoodId, setDeletingFoodId] = useState<
    string | undefined
  >("");
  const [isEditSaveButtonClicked, setIsEditSaveButtonClicked] =
    useState<boolean>(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const categoryList = [
    "Not Selected",
    "Vegetables",
    "Fruits",
    "Grains",
    "Protein",
    "Dairy",
    "Beverages",
    "Snacks",
    "Condiments",
    "Spices",
    "Others",
  ];

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemName(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setItemCategory(value);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setItemExpiryDate(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const itemToPost = {
      foodName: itemName,
      foodCategory: itemCategory,
      foodExpiryDate: itemExpiryDate,
    };
    createSaveItem(itemToPost);
    console.log(`API_BASE: ${API_BASE}`);
  };

  const handleEdit = (item: SaveItemsProps) => {
    setIsEditButtonClicked(true);
    setEditingFoodId(item.foodId || null);
    setItemName(item.foodName);
    setItemCategory(item.foodCategory);
    setItemExpiryDate(item.foodExpiryDate);
  };

  const handleDelete = (foodId: string | undefined) => {
    deleteSaveItem(foodId);
    setShowPopUp(false);
  };

  const fetchSaveItems = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `${API_BASE}/api/FoodSaver/GetFoodItemsByUserProviderId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setUserSaveItems(response.data);
        console.log("Success response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Save Items:", error);
    }
  };

  const fetchExpiringItems = async () => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.get(
        `${API_BASE}/api/FoodSaver/GetExpiringItemsByUserProviderId`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setExpiringItems(response.data);
        console.log("Success response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Expiring Items:", error);
    }
  };

  const createSaveItem = async (itemToPost: SaveItemsProps) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.post(
        `${API_BASE}/api/FoodSaver/CreateFoodItem`,
        itemToPost,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setSaveId(response.data);
        setItemName("");
        setItemCategory("Not Selected");
        setItemExpiryDate("");
      }
    } catch (error) {
      console.error("Error creating Save Item:", error);
    }
  };

  const deleteSaveItem = async (foodId: string | unknown) => {
    const token = localStorage.getItem("jwt");
    try {
      const response = await axios.delete(
        `${API_BASE}/api/FoodSaver/DeleteFoodItem/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsSaveItemDeleted(!isSaveItemDeleted);
      }
    } catch (error) {
      console.error("Error deleting Save Item:", error);
    }
  };

  const editSaveItem = async (itemId: string | unknown) => {
    const token = localStorage.getItem("jwt");
    const newData = {
      foodId: itemId,
      foodName: itemName,
      foodCategory: itemCategory,
      foodExpiryDate: itemExpiryDate,
    };
    try {
      const response = await axios.put(
        `${API_BASE}/api/FoodSaver/UpdateFoodItem`,
        newData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsEditSaveButtonClicked(!isEditSaveButtonClicked);
        setEditingFoodId(null);
        setIsEditButtonClicked(false);
        setItemName("");
        setItemCategory("Not Selected");
        setItemExpiryDate("");
      }
    } catch (error) {
      console.error("Error updating Save Item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSaveItems();
      await fetchExpiringItems();
    };
    fetchData();
  }, [saveId, isSaveItemDeleted, isEditSaveButtonClicked]);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      {expiringItems.length > 0 && <Countdown />}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-500 mb-6 text-center">
          Save It Manager
        </h1>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mb-6">
          <p className="text-blue-700">
            Add items to your inventory by selecting the correct category and
            expiry date. You’ll receive reminder emails starting 3 days before
            an item expires. To ensure delivery, add noreplySaveIt@gmail.com to
            your safe sender list — it may otherwise go to spam or junk. Here's
            a{" "}
            <a
              href="https://www.youtube.com/shorts/4Q3BfcLM_fg"
              target="_blank"
              className="underline"
            >
              link
            </a>{" "}
            on how to do it in 47 seconds.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 mb-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <label className="flex-1 flex flex-col text-gray-700">
              Item Name:
              <input
                type="text"
                value={itemName}
                onChange={handleNameChange}
                className={`mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  itemName == ""
                    ? "border-red-300 focus:ring-red-400"
                    : "border-black-300 focus:ring-blue-400"
                }`}
              />
            </label>

            <label className="flex-1 flex flex-col text-gray-700">
              Item Category:
              <select
                value={itemCategory}
                onChange={handleCategoryChange}
                className={`mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  itemCategory == "Not Selected"
                    ? "border-red-300 focus:ring-red-400"
                    : "border-black-300 focus:ring-blue-400"
                }`}
              >
                {categoryList.map((eachCategory) => (
                  <option key={eachCategory} value={eachCategory}>
                    {eachCategory}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex-1 flex flex-col text-gray-700">
              Expiry Date:
              <input
                type="date"
                value={itemExpiryDate}
                onChange={handleExpiryDateChange}
                className={`mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  itemExpiryDate == ""
                    ? "border-red-300 focus:ring-red-400"
                    : "border-black-300 focus:ring-blue-400"
                }`}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={
              itemName == "" ||
              itemCategory == "Not Selected" ||
              itemExpiryDate == "" ||
              isEditButtonClicked
            }
            className="mt-2 w-full sm:w-auto px-4 py-2 font-semibold rounded-md transition-colors duration-200 bg-green-500 text-white hover:bg-green-600 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 border-b text-gray-800 font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 border-b text-gray-800 font-semibold">
                  Category
                </th>
                <th className="px-6 py-3 border-b text-gray-800 font-semibold">
                  Expiry Date
                </th>
                <th className="px-6 py-3 border-b text-gray-800 font-semibold">
                  Delete Action
                </th>
                <th className="px-6 py-3 border-b text-gray-800 font-semibold">
                  Edit Action
                </th>
              </tr>
            </thead>
            <tbody>
              {userSaveItems.map((item, index) => (
                <tr
                  key={item.foodId}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }
                >
                  <td className="px-6 py-3 border-b text-gray-800">
                    {item.foodName}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-800">
                    {item.foodCategory}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-800">
                    {item.foodExpiryDate}
                  </td>
                  <td className="px-6 py-3 border-b text-gray-800">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPopUp(true);
                        setDeletingFoodId(item.foodId);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                  <td className="px-6 py-3 border-b text-gray-800">
                    {editingFoodId === item.foodId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => editSaveItem(item.foodId)}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingFoodId(null);
                            setIsEditButtonClicked(false);
                            setItemName("");
                            setItemCategory("Not Selected");
                            setItemExpiryDate("");
                          }}
                          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showPopUp && (
          <PopUp
            foodId={deletingFoodId}
            onConfirm={handleDelete}
            onClose={() => setShowPopUp(false)}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;