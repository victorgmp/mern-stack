import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { IUser } from '../interfaces/user';

const CreateUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get('http://localhost:4000/api/users');

      setUsers(res.data);
    };

    getUsers();
  }, [userList]);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/users', {
      username,
    });
    setUsername('');
    setUserList(!userList);
  };

  const deleteUser = async (id: string) => {
    console.log(id);
    await axios.delete(`http://localhost:4000/api/users/${id}`);
    // getUsers();
    setUserList(!userList);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card card-body">
          <h3>Create new user</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input type="text" className="form-control" value={username} onChange={onChangeUsername} />
            </div>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user: IUser) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
              onDoubleClick={() => deleteUser(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;
