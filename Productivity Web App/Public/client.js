// const axios = require('axios'); 

//Create an item
async function createItem(itemData) {
  try {
    const response = await axios.post('http://localhost:3000/items', itemData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

//Get all items
async function getAllItems() {
  try {
    const response = await axios.get('http://localhost:3000/items');
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

//Get item by ID
async function getItemById(itemId) {
  try {
    const response = await axios.get(`http://localhost:3000/items/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

// Update an item by ID
async function updateItem(itemId, updatedData) {
  try {
    const response = await axios.patch(`http://localhost:3000/items/${itemId}`, updatedData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}

// Delete an item by ID
async function deleteItem(itemId) {
  try {
    const response = await axios.delete(`http://localhost:3000/items/${itemId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || error.message);
  }
}


export {createItem, getAllItems, getItemById, updateItem, deleteItem};
