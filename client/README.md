# SpendZy Client Folder

This document provides an overview of the `client` folder structure and its contents in the SpendZy project.

---

## Folder Structure

client/  
├── public/  
│   ├── index.html  
│   └── ... (other static assets)  
├── src/  
│   ├── api/  
│   │   ├── transactions.js  
│   │   └── ... (other API interaction files)  
│   ├── components/  
│   │   ├── TransferFundsModal.js  
│   │   └── ... (other React components)  
│   ├── App.js  
│   ├── index.js  
│   └── ... (other source files)  
├── package.json  
└── ... (other configuration files)  

### `public/`
- **`index.html`**: The main HTML file for the React application, acting as the entry point for rendering the app.
- Contains other static assets like images, manifest files, etc.

---

### `src/`
- **`api/`**
  - **`transactions.js`**: Handles API requests to the backend for actions like verifying accounts and transferring funds.

- **`components/`**
  - **`TransferFundsModal.js`**: A React component used to display and manage fund transfer operations.

- **`App.js`**: The root component defining the structure and routing of the application.
- **`index.js`**: The entry point of the React application. It mounts the React app to the DOM.

---

## Configuration and Dependencies
- **`package.json`**
  - Lists dependencies like React, Axios, and other libraries.
  - Contains scripts for building, testing, and running the client application.

---

## Purpose
- This folder handles the client-side functionality of SpendZy, including:
  - User Interface (UI) design and behavior using React components.
  - Interaction with backend APIs for data exchange.
  - Managing application state and user inputs.

---

For detailed information, visit the [SpendZy GitHub Repository](https://github.com/githubShreyas01/SpendZy).
