// src/api/contactAPI.js
import axios from 'axios';

// API URL that matches your backend endpoint
const API_URL = 'http://localhost:5000/api/contacts';

// Fetch all contacts
export const getContacts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

// Create a new contact
export const createContact = async (contactData) => {
    try {
        const response = await axios.post(API_URL, contactData);
        return response.data;
    } catch (error) {
        console.error('Error creating contact:', error);
        throw error;
    }
};

// Update an existing contact by 'email'
export const updateContact = async (contactData) => {
  try {
    console.log('Updating contact with data:', contactData);  // Log the data being sent
    const response = await axios.put(`${API_URL}/${contactData.email}`, contactData);  // Send email as identifier
    console.log('Update Response:', response);  // Log the response to check if the API returns as expected
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};
// export const updateContact = async (contactData) => {
//   try {
//       const response = await axios.put(`${API_URL}/${contactData.email}`, contactData);  // Send email as identifier
//       return response.data;
//   } catch (error) {
//       console.error('Error updating contact:', error);
//       throw error;
//   }
// };

// Delete a contact by 'email'
export const deleteContact = async (email) => {
  try {
      const response = await axios.delete(`${API_URL}/${email}`);  // URL uses email
      return response.data;
  } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
  }
};

export const getContactByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/${email}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching contact by email:', error);
    throw error;
  }
};