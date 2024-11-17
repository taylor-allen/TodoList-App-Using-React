import React, { useEffect, useState } from "react";
import { X, PlusCircleFill } from "react-bootstrap-icons";

function ToDoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const userName = "taylor-allen";
  const apiUserURL = `https://playground.4geeks.com/todo/users/${userName}`;
  const apiTodosURL = `https://playground.4geeks.com/todo/todos/${userName}`;

  const createUser = async () => {
    const response = await fetch(apiUserURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("User created successfully!");
    } else {
      setErrorMessage("Failed to create user");
      window.location.reload(false);
    }
  };

  const fetchTodos = async () => {
    const response = await fetch(apiUserURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 404) {
      await createUser(); // Create user if not found
      return; // Exit function early
    }

    const data = await response.json(); // Parse the JSON
    console.log("API response:", data); // Log the API response
    if (data && Array.isArray(data.todos)) {
      setTodos(data.todos); // Access the `todos` array within the object
    } else {
      setErrorMessage(
        "Expected an array, received: " + JSON.stringify(data.todos)
      );
      setTodos([]);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos when the component mounts
  }, []);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() !== "") {
      const newTask = { label: inputValue, done: false };

      // Update local state first
      setTodos([...todos, newTask]);
      setInputValue("");

      // Send the new task to the server
      const response = await fetch(apiTodosURL, {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        setErrorMessage("Failed to add new task");
        return; // Exit function early
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Task added successfully:", data);

      // Update the local state to include the ID from the response
      setTodos((prevTodos) =>
        prevTodos.map((todo, index) =>
          index === prevTodos.length - 1 ? { ...todo, id: data.id } : todo
        )
      );
    }
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete todo with ID:", id);

    // Update todos locally first (optimistic update)
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    // Delete the task from the server
    const response = await fetch(
      `https://playground.4geeks.com/todo/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Delete response status:", response.status); // Log response status
    if (response.status === 204) {
      console.log("Task deleted successfully");
    } else {
      setErrorMessage("Failed to delete task: " + response.statusText);
      // If delete fails, revert the local state
      setTodos((prevTodos) => [
        ...prevTodos,
        todos.find((todo) => todo.id === id),
      ]);
    }
  };

  const handleClearAll = async () => {
    const deletePromises = todos.map((todo) =>
      fetch(`https://playground.4geeks.com/todo/todos/${todo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    // Wait for all delete requests to finish
    const responses = await Promise.all(deletePromises);
    const successfulDeletes = responses.filter(
      (response) => response.status === 204
    );

    if (successfulDeletes.length === todos.length) {
      console.log("All tasks cleared successfully");
      setTodos([]); // Clear local state if successful
    } else {
      setErrorMessage("Failed to clear some tasks");
    }
  };

  return (
    <div className="container w-25">
      <div
        className="card d-flex flex-column"
        style={{ minHeight: "400px", minWidth: "350px" }}
      >
        <h1 className="card-header text-center ">Taylor's To-Do List</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group m-0 p-0">
            <input
              type="text"
              placeholder="What's on your mind?"
              value={inputValue}
              onChange={handleChange}
              className="inputForm form-control border border-1 rounded-pill p-2 m-4"
              required
            />
            <div className="input-group-append">
              <button type="submit" className="btn my-4 me-2">
                <PlusCircleFill size={20} />
              </button>
            </div>
          </div>
        </form>
        <div className="cardBody flex-grow-1 px-5">
          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {todos.length === 0 ? (
            <p>No tasks yet.</p>
          ) : (
            <ul>
              {todos.map((todo, index) => (
                <li
                  key={todo.id || index} // Use todo.id as the key if it exists, otherwise fallback to index
                  className="d-flex justify-content-between align-items-center"
                >
                  {todo.label}
                  <button onClick={() => handleDelete(todo.id)} className="btn">
                    <X size={20} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="footer  d-flex justify-content-between p-3">
          <p className="d-flex justify-content-start">
            {todos.length} Task(s) Left
          </p>
          <button
            onClick={handleClearAll}
            className="btn btn-outline-light d-flex justify-content-end p-1"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;