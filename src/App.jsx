import { useState } from 'react';
import './App.css';

function App() {
  const [listTodo, setListTodo] = useState([]);

  // Add a new task
  let addList = (inputText) => {
    if (inputText !== '') {
      setListTodo([...listTodo, { text: inputText, completed: false }]);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const newTasks = listTodo.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setListTodo(newTasks);
  };

  // Delete individual task
  const deleteListItem = (index) => {
    const newListTodo = listTodo.filter((_, i) => i !== index);
    setListTodo(newListTodo);
  };

  // Delete done (completed) tasks
  const deleteCompletedTasks = () => {
    setListTodo(listTodo.filter((task) => !task.completed));
  };

  // Delete all tasks
  const deleteAllTasks = () => {
    setListTodo([]);
  };

  // Filtering functions
  const showAllTasks = () => {
    setListTodo(listTodo); 
  };

  const showDoneTasks = () => {
    setListTodo(listTodo.filter((task) => task.completed)); 
  };

  const showTodoTasks = () => {
    setListTodo(listTodo.filter((task) => !task.completed));
  };

  return (
    <div className="main-container">
      <div className="center-container">
        <h1 className="todohead">TodoInput</h1>
        <TodoInput addList={addList} />
        <h1 className='h1-2'>Todo List</h1>
        
        {/* Buttons for filtering and deleting */}
        <div className="todo-buttons">
          <button onClick={showAllTasks}>All</button>
          &nbsp; 
          &nbsp; 
          &nbsp; 
          &nbsp; 
          &nbsp; 
          <button onClick={showDoneTasks}>Done</button>
          &nbsp; 
          &nbsp; 
          &nbsp; 
          &nbsp; 
          &nbsp; 
          <button onClick={showTodoTasks}>Todo</button>
          <ul>
          {listTodo.map((listItem, index) => (
            <Todolist
              key={index}
              index={index}
              item={listItem.text}
              completed={listItem.completed}
              toggleTaskCompletion={() => toggleTaskCompletion(index)}
              deleteItem={() => deleteListItem(index)}
            />
          ))}
        </ul></div>
          <br></br>
          <button className="delete-button" onClick={deleteCompletedTasks}>
            Delete done tasks
          </button>
          &nbsp; 
          &nbsp; 
         
          <button className="delete-button" onClick={deleteAllTasks}>
            Delete all tasks 
          </button>
        

        {/* List of tasks */}
       
      </div>
    </div>
  );
}

// Todo Input Component
function TodoInput({ addList }) {
  const [inputText, setInputText] = useState('');

  const handleEnterPress = (e) => {
    if (e.keyCode === 13) {
      addList(inputText);
      setInputText('');
    }
  };

  return (
    <div className="input-container">
      <div>
      <input
        type="text"
        className="input-box-todo"
        placeholder="New Todo"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      </div>
      <div>
      <button
        className="add-btn"
        onClick={() => {
          addList(inputText);
          setInputText('');
        }}
      >
        Add New Task
      </button>
      </div>
    </div>
    
  );
}

// Todo List Component
function Todolist({ item, completed, toggleTaskCompletion, deleteItem, updateItem }) {
  const [isEditing, setIsEditing] = useState(false); 
  const [editedText, setEditedText] = useState(item); 

  const handleEditChange = (e) => {
    setEditedText(e.target.value); 
  };

  const handleSave = () => {
    updateItem(editedText); 
    setIsEditing(false); 
  };

  return (
    <li className="list-item">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
          />
          <button className="btn-save" onClick={handleSave}>Save</button> 
        </div>
      ) : (
        <span style={{ textDecoration: completed ? 'line-through' : '' }}>
          {item}
        </span>
      )}
      <input
        type="checkbox"
        checked={completed}
        onChange={toggleTaskCompletion}
      />
      <span className="icons">
        {!isEditing && (
          <i
            className="fa-solid fa-pen icon-edit"
            onClick={() => setIsEditing(true)} 
          ></i>
        )}
        <i className="fa-solid fa-trash-can icon-delete" onClick={deleteItem}></i>
      </span>
    </li>
  );
}




export default App;




