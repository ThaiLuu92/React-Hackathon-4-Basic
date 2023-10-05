import React, { useState } from 'react';
import './App.css';

const App: React.FC = () => {
  type Todo = {
    id: number;
    text: string;
    date: string
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  const appStyles = {
    backgroundColor: isDarkMode ? '#333' : 'white',
    color: isDarkMode ? 'white' : 'black',
  };

  const addTodo = () => {
    if (newTodo.trim() === '') {
      return;
    }

    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      date: new Date().toLocaleDateString()
    };

    setTodos([...todos, newTodoItem]);
    setNewTodo('');

  };


  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };


  const countCharacters = (text: string) => {
    if (text.length <= 200) {
      return 200 - text.length;

    } else {
      return 0;
    }

  }

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchKeyword.toLowerCase())
  );



  return (
    <div className="App" style={appStyles}>
      <div id='App-title'><h3>Todo List nha Béc Cọp Không ăn được nha</h3><i style={{ color: isDarkMode ? 'white' : 'black' }}><button onClick={toggleDarkMode} id='btn-dark'>Toggle Dark Mode</button></i></div>
      <div id='seacrch-bar'><input type="text" placeholder='Search here...' value={searchKeyword}
        onChange={handleSearchInputChange} /></div>
      <div className='tasks-area'>
        {filteredTodos.map((todo) => (
          <div className='task-add task' key={todo.id}>
            <textarea name="" id="" cols={10} rows={7}
              value={todo.text}

            />
            <div className='task-add-footer'>
              <div className='task-date'>{todo.date}</div>
              <button className='btn' id='btn-del' onClick={() => deleteTodo(todo.id)}>DELETE</button>
            </div>
          </div>
        ))}
        <div className='task-add'>
          <textarea name="" id="" cols={10} rows={7} defaultValue={""} placeholder='Nhập nội dung công việc ...'
            value={newTodo}
            maxLength={200}
            onChange={(e) => setNewTodo(e.target.value)} />
          <div className='task-add-footer'>
            <div className='task-date'>Ký tự còn lại: {countCharacters(newTodo)}</div>
            <button className='btn' id='btn-add' onClick={addTodo}>ADD</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App; 
