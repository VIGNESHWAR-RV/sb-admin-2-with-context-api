import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Avatar from '@mui/material/Avatar';
import { Footer } from "../Footer";
import { contextAPI } from '../../App';

export function UserList() {

  const [users, setUser] = useState([]);
  const {usersAPI} = useContext(contextAPI);
  const getUsers = () => {
    fetch(usersAPI, { method: "GET" })
    .then(response => response.json())
    .then(data => setUser(data));
  };

  function Delete(id) {
    fetch(`${usersAPI}/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(() => getUsers());
  };

  useEffect(() => getUsers(), []);

  const history = useHistory();
  return (<>
    <div className='userAdd'>
      <div>
        <button onClick={() => history.push("/users/add")}>➕Add users</button>
      </div>
    </div>
    <div className='usersDiv'>
      {users.map((user, index) => {
        return (
          <div key={index} className='userDiv'>
            <div>
              <h1>{index + 1}.{user.name}</h1>
              <Avatar className="img">{user.userName}</Avatar>
            </div>

            <div>
              <p>{user.profession},{user.location}</p>
              <div className='userEditDelete'>
                <button onClick={() => { history.push(`/users/edit/${user.id}`); }}><EditIcon /></button>
                <button onClick={() => Delete(user.id)}><DeleteForeverIcon /></button>
              </div>
            </div>
            <button className='userView' onClick={() => { history.push(`/users/${user.id}`); }}>View Profile</button>
          </div>
        );
      })}
    </div>
    <Footer />
  </>
  );
}
