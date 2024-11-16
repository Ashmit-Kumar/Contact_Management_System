import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
import { getContactByEmail, createContact, updateContact } from '../api/contactAPI'; // Import API functions

const ContactForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Prefill form with initial data (for editing)
  useEffect(() => {
    if (initialData) {
      console.log('Prefilling form with initial data:', initialData); // Log initial data
      setFormData(initialData); // Prefill form fields with initial data for editing
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); // Log form data

    try {
        // Attempt to fetch the contact by email to check if it exists
        const contact = await getContactByEmail(formData.email);
        
        if (contact) {
            console.log('Contact exists, updating...');
            // If the contact exists, update it
            await updateContact(formData);
            setSnackbarMessage('Contact updated successfully!');
            setSnackbarSeverity('success');
        }
    } catch (error) {
        // Check if the error is a 404 (not found), meaning the contact doesn't exist
        if (error.response && error.response.status === 404) {
            console.log('Contact does not exist, creating...');
            // If the contact doesn't exist, create a new one
            await createContact(formData);
            setSnackbarMessage('Contact created successfully!');
            setSnackbarSeverity('success');
        } else {
            // For any other errors, show an error message
            setSnackbarMessage('Error processing contact!');
            setSnackbarSeverity('error');
            console.error('Error during form submission:', error);
        }
    }
    
    // Close the snackbar after 6 seconds
    setOpenSnackbar(true);

    // Reset the form after submission
    setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: ''
    });
};

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Submitting form with data:', formData); // Log form data

  //   try {
  //     // Check if contact exists by email
  //     const contactExists = await getContactByEmail(formData.email);

  //     if (contactExists) {
  //       console.log('Contact exists, updating...');
  //       // If contact exists, update it
  //       await updateContact(formData);
  //       setSnackbarMessage('Contact updated successfully!');
  //       setSnackbarSeverity('success');
  //     } else {
  //       console.log('Contact does not exist, creating...');
  //       // If contact does not exist, create it
  //       await createContact(formData);
  //       setSnackbarMessage('Contact created successfully!');
  //       setSnackbarSeverity('success');
  //     }
  //     setOpenSnackbar(true);
  //     setFormData({ // Reset form after submission
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       phone: '',
  //       company: '',
  //       jobTitle: ''
  //     });
  //   } catch (error) {
  //     setSnackbarMessage('Error processing contact!');
  //     setSnackbarSeverity('error');
  //     setOpenSnackbar(true);
  //     console.error('Error during form submission:', error); // Log any error during form submission
  //   }
  // };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            type="email"
            disabled={!!initialData}  // Disable email field if editing
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {initialData ? 'Update Contact' : 'Add Contact'}
          </Button>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default ContactForm;

// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';

// const ContactForm = ({ onSubmit, initialData }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     company: '',
//     jobTitle: ''
//   });

//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   // Prefill form with initial data (for editing)
//   useEffect(() => {
//     if (initialData) {
//       console.log('Prefilling form with initial data:', initialData); // Log initial data
//       setFormData(initialData); // Prefill form fields with the initial data for editing
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     console.log(`Updated ${name}:`, value); // Log each input change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting form with data:', formData); // Log the form data before submission

//     try {
//       await onSubmit(formData); // Pass form data to parent handler (either Add or Update)
//       setSnackbarMessage('Operation successful!');
//       setSnackbarSeverity('success');
//       setOpenSnackbar(true);
//       setFormData({ // Reset form after successful submission
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         company: '',
//         jobTitle: ''
//       });
//     } catch (error) {
//       setSnackbarMessage('Error processing contact!');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//       console.error('Error during form submission:', error); // Log any error during form submission
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             label="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             required
//             type="email"
//             disabled={!!initialData}  // Disable email field if editing
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Company"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Job Title"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             {initialData ? 'Update Contact' : 'Add Contact'}
//           </Button>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </form>
//   );
// };

// export default ContactForm;

// // src/components/ContactForm.js
// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Grid, Snackbar, Alert } from '@mui/material';
// import { createContact, updateContact } from '../api/contactAPI';

// const ContactForm = ({ onContactAdded, initialData }) => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     company: '',
//     jobTitle: ''
//   });

//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [snackbarSeverity, setSnackbarSeverity] = useState('success');

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);  // If editing, pre-fill the form with initial data
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       if (initialData) {
//         // If we are editing, call the update contact API
//         const response = await updateContact(formData);
//         onContactAdded(response.data);  // Pass updated contact to parent
//         setSnackbarMessage('Contact updated successfully!');
//       } else {
//         // If adding a new contact, call the create contact API
//         const response = await createContact(formData);
//         onContactAdded(response.data);  // Pass new contact to parent
//         setSnackbarMessage('Contact added successfully!');
//       }
//       setSnackbarSeverity('success');
//       setOpenSnackbar(true);
//       setFormData({
//         firstName: '',
//         lastName: '',
//         email: '',
//         phone: '',
//         company: '',
//         jobTitle: ''
//       });
//     } catch (error) {
//       setSnackbarMessage('Error processing contact!');
//       setSnackbarSeverity('error');
//       setOpenSnackbar(true);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={6}>
//           <TextField
//             label="First Name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Last Name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             fullWidth
//             required
//             type="email"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Phone"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Company"
//             name="company"
//             value={formData.company}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             label="Job Title"
//             name="jobTitle"
//             value={formData.jobTitle}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             {initialData ? 'Update Contact' : 'Add Contact'}
//           </Button>
//         </Grid>
//       </Grid>

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//       >
//         <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </form>
//   );
// };

// export default ContactForm;
