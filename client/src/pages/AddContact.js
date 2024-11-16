import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate to redirect after adding
import ContactForm from '../components/ContactForm';
import { createContact } from '../api/contactAPI'; // Import API function for creating contact

const AddContact = () => {
  const navigate = useNavigate();

  const handleContactAdded = () => {
    navigate('/'); // Redirect to the dashboard or home page after adding a contact
  };

  // Handle submit for adding contact
  const handleAddSubmit = async (formData) => {
    try {
      await createContact(formData);  // Call the API to create the contact
      handleContactAdded();  // Redirect after successful creation
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <div>
      <h1>Add New Contact</h1>
      <ContactForm onSubmit={handleAddSubmit} />
    </div>
  );
};

export default AddContact;

// import React from 'react';
// import ContactForm from '../components/ContactForm';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate

// const AddContact = () => {
//   const navigate = useNavigate();  // Initialize navigate

//   const handleContactAdded = () => {
//     navigate('/');  // Redirect to the dashboard after adding a contact
//   };

//   return (
//     <div>
//       <h1>Add New Contact</h1>
//       <ContactForm onContactAdded={handleContactAdded} />
//     </div>
//   );
// };

// export default AddContact;
