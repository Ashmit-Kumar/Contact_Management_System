// src/pages/AddContact.js
import React from 'react';
import ContactForm from '../components/ContactForm';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddContact = () => {
  const navigate = useNavigate();  // Initialize navigate

  const handleContactAdded = () => {
    navigate('/');  // Redirect to the dashboard after adding a contact
  };

  return (
    <div>
      <h1>Add New Contact</h1>
      <ContactForm onContactAdded={handleContactAdded} />
    </div>
  );
};

export default AddContact;
