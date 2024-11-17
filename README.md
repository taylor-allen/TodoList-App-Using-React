# To-Do List Application

A **To-Do List Application** built with **React** to demonstrate proficiency in modern JavaScript (ES6+), RESTful APIs, and asynchronous programming. This project leverages the public [4Geeks Academy To-Do API](https://playground.4geeks.com/todo/docs) to synchronize tasks with a backend.

## 🚀 Live Demo 🚀 

[Click here to view the live demo](https://todo-list-app-using-react.vercel.app/)

---

## 📚 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage and Key Features](#usage-and-key-features)
- [API Integration](#api-integration)
- [Key Learnings](#key-learnings)
- [Future Enhancements](#future-enhancements)

---

## Features

- Add, remove, and manage tasks in real time.
- Synchronize tasks with a backend API.
- Clear all tasks with a single click, updating both the UI and backend.
- Dynamic data fetching and state management using `useEffect`.
- Clean and intuitive user interface built with React.

---

## Technologies Used

- **React**: Component-based UI development.
- **JavaScript (ES6+)**: Modern syntax including `let`, `const`, template literals, destructuring, and arrow functions.
- **RESTful API**: Integration with the [4Geeks Academy To-Do API](https://playground.4geeks.com/todo/docs).
- **CSS**: Styling for a clean and responsive user interface.
- **Vercel**: Deployment for live demo hosting.

---

## Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   
2. **Install Dependencies**
Make sure you have Node.js installed, then run:

   ```bash
   npm install

3. **Start the Development Server**
   ```bash
   npm run start
   
  Open your browser and navigate to http://localhost:3000.

4. **Build for Production**
   ```bash
   npm run build
  Deploy the build folder to your preferred hosting platform.

---

## Usage and Key Features
1. Load Initial Data:
- On first load, the app fetches tasks from the API and displays them. (Please note that this API resets its database each day).

2. **Add a Task**
- Enter a task in the input field and click the plus-sign or press `ENTER`. The list will update both on the front end and backend.

3. **Remove a Task**
- Click the delete button next to a task to remove it. This action syncs with the API.

4. **Clear All Tasks**
- Use the "Clear All" button to delete all tasks and clear the UI.

---

## API Integration
The application interacts with the 4Geeks Academy To-Do API during these key runtime moments:

   - Initial Load

Method: `GET`
   - Fetches the existing list of tasks from the server and displays them.
   - Add a Task

Method: `PUT`
   - Updates the server with the new list of tasks.
   - Remove a Task

Method: `PUT`
   - Updates the server with the updated list after task removal.
   - Clear All Tasks

Method: `DELETE`
   - Removes all tasks from the server and resets the UI.

---

## Key Learnings
- Effective use of React hooks (`useEffect` and `useState`).
- Mastery of asynchronous programming using async/await.
- Real-world application of RESTful API integration.
- Improved understanding of ES6+ JavaScript features like:
  - Template literals
  - Destructuring
  - Spread/rest operators
  - Arrow functions and closures
- Managing UI state and ensuring seamless synchronization with backend APIs.

---

## Future Enhancements
- **User Authentication:** Add user-specific task lists.
- **Task Editing:** Allow users to edit tasks directly in the app.
- **Improved UI/UX:** Enhance the design with animations and advanced styling.
- **Offline Mode:** Cache tasks locally to allow offline usage.
- **Convert to Mobile:** Allow users to access the app via smartphone or tablet. 
