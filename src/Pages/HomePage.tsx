import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE } from "../api";

interface SaveItemsProps {
  foodId?: string;
  foodName: string;
  foodCategory: string;
  foodExpiryDate: string;
}

const HomePage = () => {
  const [itemName, setItemName] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemExpiryDate, setItemExpiryDate] = useState("");
  const [userSaveItems, setUserSaveItems] = useState<SaveItemsProps[]>([]);
  const [saveId, setSaveId] = useState("");
  const categoryList = [
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const itemToPost = {
      foodName: itemName,
      foodCategory: itemCategory,
      foodExpiryDate: itemExpiryDate,
    };
    createSaveItem(itemToPost);
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
        setSaveId(response.data);
      }
    } catch (error) {
      console.error("Error deleting Save Item:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchSaveItems();
    };
    fetchData();
  }, [saveId]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            onChange={(event) => setItemName(event.target.value)}
          ></input>
        </label>
        <label>
          Category:
          <select onChange={(event) => setItemCategory(event.target.value)}>
            {categoryList.map((eachCategory) => (
              <option value={eachCategory}>{eachCategory}</option>
            ))}
          </select>
        </label>
        <label>
          Expiry Date:
          <input
            type="date"
            onChange={(event) => setItemExpiryDate(event.target.value)}
          ></input>
        </label>
        <button type="submit">Add</button>
      </form>
      <ul>
        {userSaveItems.map((eachSaveItem) => (
          <li key={eachSaveItem.foodId}>
            {eachSaveItem.foodName} {eachSaveItem.foodCategory}{" "}
            {eachSaveItem.foodExpiryDate}
            <button
              type="button"
              onClick={() => deleteSaveItem(eachSaveItem.foodId)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
