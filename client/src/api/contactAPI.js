// src/api/contactAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/contacts'; // Backend API URL

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
  
  // Update an existing contact
  export const updateContact = async (contactData) => {
    try {
      const response = await axios.put(`${API_URL}/${contactData.id}`, contactData);  // Assuming you pass an 'id' in contactData
      return response.data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  };
  
  // Delete a contact
  export const deleteContact = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  };
  