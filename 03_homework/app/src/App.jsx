import React from 'react';
import TodoItem from './components/TodoItem';

const colors = ['grey', 'red', 'blue', 'orange', 'green'];

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [activeColor, setActiveColor] = React.useState('grey');

  const addTask = (textTask, color) => {
    setTasks((tasks) => {
      if (tasks.length < 1) {
        return [{ id: 1, textTask, color, completed: false }];
      } else {
        return [
          ...tasks,
          { id: tasks[tasks.length - 1].id + 1, textTask, color, completed: false },
        ];
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const removeTask = (id) => {
    if (window.confirm('Вы действительно хотите удалить?')) {
      setTasks((tasks) => tasks.filter((obj) => obj.id !== id));
    }
  };

  const editTask = (id) => {
    let newText = prompt();
    setTasks(
      tasks.map((obj) => {
        if (id === obj.id && newText) {
          obj.textTask = newText;
        }
        return obj;
      }),
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const onInputKeyDown = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      addTask(event.target.value, activeColor);
      setActiveColor('grey');
      event.target.value = '';
      event.target.focus();
    }
  };

  const checkedTask = (id) => {
    console.log(id);
    setTasks(
      tasks.map((obj) => {
        if (obj.id === id && obj.completed === false) {
          obj.completed = true;
        } else {
          obj.completed = false;
        }
        return obj;
      }),
    );
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  return (
    <div className="App">
      <div className="todo">
        <h2>Список задач</h2>
        {tasks.map((obj) => (
          <TodoItem
            key={obj.id}
            id={obj.id}
            text={obj.textTask}
            color={obj.color}
            removeTask={removeTask}
            editTask={editTask}
            checkedTask={checkedTask}
          />
        ))}
        <div className="todo-input">
          <input type="text" placeholder="Текст задачи..." onKeyUp={onInputKeyDown} />
          <ul>
            {colors.map((color) => (
              <li
                onClick={(event) => {
                  setActiveColor(color);
                  event.target.className += ` active`;
                }}
                className={
                  activeColor === color ? `todo-color ${color} active` : `todo-color ${color}`
                }
                key={color}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
