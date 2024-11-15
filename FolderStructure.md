contact-management-system/
│
├── client/                      # Frontend (ReactJS)
│   ├── public/                  # Public assets (HTML, images, etc.)
│   │   └── index.html
│   ├── src/                     # Source files for React app
│   │   ├── assets/              # Images, icons, etc.
│   │   ├── components/          # Reusable components (Forms, Buttons, Tables)
│   │   │   ├── ContactForm.js   # Component for adding a new contact
│   │   │   ├── ContactTable.js  # Component for displaying contacts in a table
│   │   │   ├── EditContact.js   # Component for editing a contact
│   │   │   └── TablePagination.js # Pagination component for the contact table
│   │   ├── pages/               # React pages (views)
│   │   │   └── Dashboard.js     # Page with the contact table and form
│   │   ├── api/                 # API calls for interacting with the backend
│   │   │   └── contactAPI.js    # API functions for CRUD operations
│   │   ├── styles/              # Global styles, theme, MUI overrides
│   │   │   └── theme.js         # MUI theme configuration
│   │   ├── App.js               # Root component
│   │   └── index.js             # Entry point for React app (ReactDOM.render)
│   ├── .env                     # Environment variables (e.g., API URL)
│   └── package.json             # Frontend dependencies and scripts
│
├── server/                      # Backend (Node.js/Express)
│   ├── controllers/             # Logic to handle CRUD requests
│   │   └── contactController.js # Controller for handling contact routes
│   ├── models/                  # Mongoose models
│   │   └── contactModel.js      # Contact schema definition
│   ├── routes/                  # Express routes
│   │   └── contactRoutes.js     # Routes for CRUD operations on contacts
│   ├── config/                  # Configuration files (DB, environment settings)
│   │   └── db.js                # MongoDB connection
│   ├── middleware/              # Middleware functions (e.g., error handling)
│   │   └── errorHandler.js      # Error handling middleware
│   ├── .env                     # Environment variables (e.g., database URI)
│   ├── server.js                # Entry point for Express server
│   └── package.json             # Backend dependencies and scripts
│
├── .gitignore                   # Files to ignore in version control
├── README.md                    # Project documentation
└── package.json                 # Root package.json with dependencies for both client and server



## Frontend Folder Struture
src/
├── assets/
│   └── logo.png        # For logos or static assets
├── components/
│   ├── ContactForm.js  # Form to add a new contact
│   ├── ContactTable.js # Table to display contacts
│   └── TablePagination.js # For handling pagination
├── pages/
│   └── Dashboard.js    # Main page that includes both the form and table
├── api/
│   └── contactAPI.js   # API calls (CRUD operations with backend)
├── App.js              # Root component (App)
└── index.js            # Entry point for React app
