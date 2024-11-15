const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true, // Make this field required
  },
  lastName: {
    type: String,
    required: true, // Make this field required
  },
  email: {
    type: String,
    required: true, // Make this field required
    unique: true,  // Ensures no duplicate emails
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], // Email validation
  },
  phone: {
    type: String,
    required: true, // Make this field required
  },
  company: {
    type: String,
    required: false, // Optional field
  },
  jobTitle: {
    type: String,
    required: false, // Optional field
  },
}, { timestamps: true });  // Automatically adds createdAt and updatedAt fields

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
