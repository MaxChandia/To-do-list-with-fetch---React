import React, { useEffect, useState } from "react";


function ToDoList() {
  const [inputValue, setInputValue] = useState('');
  const [todoList, setTodoList] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async function() {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/maxchandia');
        if (response.ok) {
          const data = await response.json();
          setTodoList(data);
        } else {
          throw new Error('Failed to fetch data');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchData();
  }, []);

  const editTodo = async function (updateList) {
    try {
      const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/maxchandia', {
        method: "PUT",
        body: JSON.stringify(updateList),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update the task list on the server');
      }
    } catch (error) {
      console.error(error);
    }
  };

    const deleteTodo = async function (updateList) {
      try {
        const response = await fetch ('https://playground.4geeks.com/apis/fake/todos/user/maxchandia', {
          method: "PUT",
          body: JSON.stringify(updateList),
          headers:{
            "Content-Type" : "application/json"
          }
        })
        if (!response.ok) {
          throw new Error('Failed to update the task list on the server');
        }
      } catch (error) {
        console.error(error);
      }
    };


    const deleteAllTodo = async function () {
      try {
        const response = await fetch('https://playground.4geeks.com/apis/fake/todos/user/maxchandia', {
          method: 'PUT',
          body: JSON.stringify([]),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`Failed to update the task list on the server. Status: ${response.status}`);
        }
    
        setTodoList([]);
      } catch (error) {
        console.error(error);
      }
    };


  const enterTask = (e) => {
    if (e.key === 'Enter') {
      const newTask = { label: inputValue, done: false };
      setTodoList([...todoList, newTask]); 
      setInputValue(''); 
      editTodo([...todoList, newTask]);
    }
  };

  function countTasks() {
    const taskCount = todoList.length;
    if (taskCount === 0) {
      return "No task pending";
    } 
    else if (taskCount === 1) {
        return "1 task pending"
    }
    else {return taskCount + " tasks pending"
        
    }
    };
  

return (
    <div className="container">
      <h1 className="Title">To do List</h1>
      <div className="taskContainer" >
      <ul>
      <input
        className="List"
        type="text"
        placeholder="What needs to be done?"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
        onKeyDown={enterTask}
      />
      
      {todoList.map((item, index) => (
            <li key={index}>
              {item.label}
              <button onClick={() => {
                const updatedList = todoList.filter((item, currentIndex) => index !== currentIndex);
                setTodoList(updatedList);
                deleteTodo(updatedList);
              }}>X</button>
            </li>
          ))}
      </ul>
      <p>{countTasks()} <button className="clearButton" onClick={deleteAllTodo}> Clear All Task</button></p>
      </div>
    </div>
  );
        }


export default ToDoList;