const Contact = require('../models/contactModel');
const mongoose = require('mongoose');
// Create a new contact
exports.createContact = async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !phone) {
    return res.status(400).json({ success: false, message: 'Please provide all required fields.' });
  }

  try {
    // Create a new contact
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle
    });

    await contact.save();
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error: Unable to create contact.' });
  }
};

// Get all contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error: Unable to fetch contacts.' });
  }
};
// Get contact by email
exports.getContactByEmail = async (req, res) => {
  const { email } = req.params;
  try {
      const contact = await Contact.findOne({ email });

      if (!contact) {
          return res.status(404).json({ message: 'Contact not found' }); // Return 404 if contact is not found
      }

      return res.status(200).json(contact); // Successfully found the contact
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' }); // Handle unexpected errors
  }
};


// Update a specific contact by email
exports.updateContact = async (req, res) => {
  const { firstName, lastName, email, phone, company, jobTitle } = req.body;
  const { email: contactEmail } = req.params;  // Destructure email from URL params

  console.log('Received request to update contact:');
  console.log('Request Body:', req.body);
  console.log('Contact Email from Params:', contactEmail);

  try {
    // Find the contact by email
    const contact = await Contact.findOne({ email: contactEmail });
    
    if (!contact) {
      console.log(`Contact with email ${contactEmail} not found.`);
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    console.log(`Found contact with email: ${contactEmail}`);

    // Update fields if provided
    if (firstName) contact.firstName = firstName;
    if (lastName) contact.lastName = lastName;
    if (phone) contact.phone = phone;
    if (company) contact.company = company;
    if (jobTitle) contact.jobTitle = jobTitle;

    // Check if the new email already exists (to avoid duplicate emails)
    if (email && email !== contact.email) {
      console.log(`Checking if email ${email} already exists...`);

      const existingEmail = await Contact.findOne({ email });
      if (existingEmail) {
        console.log(`Email ${email} already in use.`);
        return res.status(400).json({ success: false, message: 'Email is already in use' });
      }

      console.log(`Email ${email} is available, updating contact.`);
      contact.email = email;
    }

    // Save the updated contact
    await contact.save();
    console.log('Contact updated successfully:', contact);
    
    return res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error('Error during contact update:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error: Unable to update contact.',
      error: error.message,
    });
  }
};


// exports.updateContact = async (req, res) => {
//   const { firstName, lastName, email, phone, company, jobTitle } = req.body;
//   const { email: contactEmail } = req.params;  // Destructure email from URL params

//   try {
//     // Find the contact by email
//     const contact = await Contact.findOne({ email: contactEmail });
//     if (!contact) {
//       return res.status(404).json({ success: false, message: 'Contact not found' });
//     }

//     // Update fields if provided
//     if (firstName) contact.firstName = firstName;
//     if (lastName) contact.lastName = lastName;
//     if (phone) contact.phone = phone;
//     if (company) contact.company = company;
//     if (jobTitle) contact.jobTitle = jobTitle;

//     // Check if the new email already exists (to avoid duplicate emails)
//     if (email && email !== contact.email) {
//       const existingEmail = await Contact.findOne({ email });
//       if (existingEmail) {
//         return res.status(400).json({ success: false, message: 'Email is already in use' });
//       }
//       contact.email = email;
//     }

//     // Save the updated contact
//     await contact.save();
//     res.status(200).json({ success: true, data: contact });
//   } catch (error) {
//     console.error('Error updating contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error: Unable to update contact.',
//       error: error.message,
//     });
//   }
// };

// Delete a specific contact by email
exports.deleteContact = async (req, res) => {
  const { email } = req.params;
  console.log('Received request to delete contact with email:', email);  // Log email for debugging

  try {
    const contact = await Contact.findOneAndDelete({ email });
    if (!contact) {
      console.log(`Contact with email ${email} not found`);
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    console.log(`Successfully deleted contact with email ${email}`);
    res.status(200).json({ success: true, message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error: Unable to delete contact.',
      error: error.message,
    });
  }
};


// exports.deleteContact = async (req, res) => {
//   const { email } = req.params;  // Destructure email from URL params

//   try {
//     // Find the contact by email and delete it
//     const contact = await Contact.findOneAndDelete({ email });
//     if (!contact) {
//       return res.status(404).json({ success: false, message: 'Contact not found' });
//     }

//     res.status(200).json({ success: true, message: 'Contact deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting contact:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server Error: Unable to delete contact.',
//       error: error.message,
//     });
//   }
// };
