import React from 'react';
import axios from 'axios';
import UsersList from './components/UsersList';

import './index.scss';

function App() {
  const [users, setUsers] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [inputValue, setInputValue] = React.useState('');
  const [isEnd, setIsEnd] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const addUsers = (data) => {
    setUsers((users) => [...users, ...data]);
  };

  const fetchUsers = async () => {
    const response = await axios.get(
      `https://5c3755177820ff0014d92711.mockapi.io/users?page=${count}&limit=10`,
    );
    setLoading(true);
    if (response.data.length) {
      addUsers(response.data);
    } else {
      setIsEnd(true);
    }
  };

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div className="app">
      {!loading && <h2>loading...</h2>}
      <input
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Поиск пользователя..."
      />
      <UsersList
        users={users.filter((obj) =>
          (obj.name + ' ' + obj.email).toLowerCase().includes(inputValue.toLocaleLowerCase()),
        )}
      />
      {!isEnd && (
        <button onClick={!loading ? null : () => setCount(count + 1)}>
          {!loading ? 'Wait ...' : 'Next 10 users'}
        </button>
      )}
    </div>
  );
}

export default App;
