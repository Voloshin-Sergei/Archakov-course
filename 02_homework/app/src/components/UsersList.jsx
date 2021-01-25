import React from 'react';

function UsersList(props) {
  return (
    <ul className="users">
      {props.users.map((obj) => (
        <li className="users__item" key={obj.id}>
          <div className="users__item-name">{obj.name}</div>
          <div className="users__item-email">{obj.email}</div>
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
