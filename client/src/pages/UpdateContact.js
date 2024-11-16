import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import { getContactByEmail, updateContact } from '../api/contactAPI';
import { Snackbar, Alert, CircularProgress } from '@mui/material';

const UpdateContact = () => {
  const navigate = useNavigate();
  const { email } = useParams(); // Retrieve email from URL params
  const [initialData, setInitialData] = useState(null); // Store initial contact data
  const [loading, setLoading] = useState(true); // Loading state
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Fetch the contact data for editing
  useEffect(() => {
    console.log('useEffect triggered - fetching contact data...');
    if (email) {
      const fetchData = async () => {
        try {
          setLoading(true); // Set loading to true while fetching
          console.log('Fetching contact with email:', email);
          const contact = await getContactByEmail(email); // Fetch contact by email

          if (contact) {
            console.log('Fetched contact data:', contact); // Log the contact data fetched from API
            setInitialData(contact); // Set initial data to populate the form
          } else {
            console.log('No contact found with this email:', email); // If no contact found
            setSnackbarMessage('Contact not found!');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
          }
        } catch (error) {
          console.error('Error fetching contact:', error); // Log the error
          setSnackbarMessage('Error fetching contact!');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        } finally {
          setLoading(false); // Set loading to false after API call completes
        }
      };
      fetchData();
    }
  }, [email]);

  const handleUpdateSubmit = async (formData) => {
    console.log('Form Data Submitted for Update:', formData); // Log the form data

    try {
      const response = await updateContact(formData); // Call the API to update contact
      console.log('Update API Response:', response); // Log the response from the update request
      setSnackbarMessage('Contact updated successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/'); // Redirect after successful update
    } catch (error) {
      console.error('Error updating contact:', error); // Log error during update
      setSnackbarMessage('Error updating contact!');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <h1>Edit Contact</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          {initialData ? (
            <ContactForm onSubmit={handleUpdateSubmit} initialData={initialData} />
          ) : (
            <p>Contact not found!</p>
          )}
        </div>
      )}

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default UpdateContact;



// import React, { useEffect, useState } from 'react'; // Import useState
// import { useNavigate, useParams } from 'react-router-dom'; // useParams for dynamic route
// import ContactForm from '../components/ContactForm';
// import { getContactByEmail, updateContact } from '../api/contactAPI'; // Import API functions
// import { Snackbar, Alert, CircularProgress } from '@mui/material'; // Add CircularProgress for loading state

// const UpdateContact = () => {
//   const navigate = useNavigate();
//   const { email } = useParams(); // Retrieve the email from the URL for editing
//   const [initialData, setInitialData] = useState(null); // State to hold initial contact data
//   const [loading, setLoading] = useState(true); // Loading state

//   // Snackbar state for feedback
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');
//   const [openSnackbar, setOpenSnackbar] = useState(false);

//   // Fetch the contact data for editing
//   useEffect(() => {
//     if (email) {
//       const fetchData = async () => {
//         try {
//           setLoading(true); // Start loading
//           const contact = await getContactByEmail(email);  // Fetch the contact to be edited
//           if (contact) {
//             setInitialData(contact); // Set the initial data if found
//           } else {
//             setSnackbarMessage('Contact not found!');
//             setSnackbarSeverity('error');
//             setOpenSnackbar(true);
//           }
//         } catch (error) {
//           console.error('Error fetching contact:', error);
//           setSnackbarMessage('Error fetching contact!');
//           setSnackbarSeverity('error');
//           setOpenSnackbar(true);
//         } finally {
//           setLoading(false); // Stop loading once the data is fetched
//         }
//       };
//       fetchData();
//     }
//   }, [email]);

//   // Handle form submission for updating contact
//   const handleUpdateSubmit = async (formData) => {
//     console.log('Form Data Submitted for Update:', formData);  // Log to check the data

//     try {
//       await updateContact(formData);  // Call the API to update the contact
//       setSnackbarMessage('Contact updated successfully!');
//       setSnackbarSeverity('success');
//       setOpenSnackbar(true);  // Show success snackbar
//       navigate('/');  // Redirect after successful update
//     } catch (error) {
//       console.error('Error updating contact:', error);
//       setSnackbarMessage('Error updating contact!');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);  // Show error snackbar
//     }
//   };

//   return (
//     <div>
//       <h1>Edit Contact</h1>
      
//       {/* Show a loading spinner while fetching the data */}
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <div>
//           {initialData ? (
//             <ContactForm onSubmit={handleUpdateSubmit} initialData={initialData} />
//           ) : (
//             <p>Contact not found!</p> // Display a message if no contact was found
//           )}
//         </div>
//       )}

//       {/* Snackbar for feedback */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// export default UpdateContact;
