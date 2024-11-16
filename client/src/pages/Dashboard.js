// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactTable from '../components/ContactTable';
import { getContacts} from '../api/contactAPI';

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);

  const fetchContacts = async () => {
    try {
      const response = await getContacts();
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleContactDeleted = (email) => {
    // Filter out the deleted contact by matching the email
    setContacts(contacts.filter(contact => contact.email !== email));
  };
  return (
    <div>
      <h1>Contact Management</h1>
      <Link to="/add-contact">
        <button>Add New Contact</button>
      </Link>
      <ContactTable contacts={contacts} onContactDeleted={handleContactDeleted} />
    </div>
  );
};

export default Dashboard;
