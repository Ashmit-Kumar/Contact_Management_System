// src/pages/EditContact.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Correct import for useNavigate
import ContactForm from '../components/ContactForm';
import { getContacts } from '../api/contactAPI';

const EditContact = () => {
  const { id } = useParams();  // Get the contact id from URL
  const navigate = useNavigate();  // Initialize navigate
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await getContacts();
        const contactToEdit = response.data.find(c => c.id === id);
        setContact(contactToEdit);
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  const handleContactUpdated = (updatedContact) => {
    navigate('/');  // Redirect to the dashboard after updating the contact
  };

  if (!contact) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Contact</h1>
      <ContactForm onContactAdded={handleContactUpdated} initialData={contact} />
    </div>
  );
};

export default EditContact;
