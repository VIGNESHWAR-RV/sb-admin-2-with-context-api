import { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Footer } from "../Footer";
import { contextAPI } from '../../App';

export function UserEdit() {

  const { id } = useParams();
  const history = useHistory();
  
  const {usersAPI} = useContext(contextAPI); 

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [DOB, setDOB] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");
  const [userName, setUserName] = useState("");
  const [revenue, setRevenue] = useState("");

  const setUser = ({ name, location, DOB, profession, gender, image, userName, revenue }) => {
    setName(name);
    setLocation(location);
    setDOB(DOB);
    setProfession(profession);
    setGender(gender);
    setImage(image);
    setUserName(userName);
    setRevenue(revenue);
  };

  const getUsers = () => {
    fetch(`${usersAPI}/${id}`, { method: "GET" })
    .then(response => response.json())
    .then((user) => setUser(user));
  };
  useEffect(() => getUsers(), []);

  const newUser = { id: +id, name, userName, revenue, location, DOB, profession, gender, image };

  const checkAndUpdate = () => {
    if (newUser.name === "" || newUser.name === undefined)
      alert("please Enter a valid name!!!");
    else if (newUser.userName === "" || newUser.userName === undefined || newUser.userName.length > 2)
      alert("please enter a username with maximum of two letters!!!");
    else if (newUser.location === "" || newUser.location === undefined)
      alert("please Enter a valid location!!!");
    else if (newUser.DOB === "" || newUser.DOB === undefined)
      alert("please Enter a valid Date-Of-Birth!!!");
    else if (newUser.profession === "" || newUser.profession === undefined)
      alert("please Enter a valid profession name!!!");
    else if (newUser.gender === "")
      alert("please select any of the options in gender!!!");
    else if (newUser.image === "" || newUser.image === undefined)
      alert("please enter a valid image url");
    else if (newUser.revenue === "" || undefined)
      alert("please enter a contribution amount!!!");
    else {
      fetch(`${usersAPI}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" }
        })
        .then(() => history.push("/users/"));
    }
  };
  return (
    <>
      <div className='adduserHead'>
        <h1>Update User Details</h1>
      </div>
      <div className='adduser'>
        <div>
          <span>Name :</span>
          <input type="text" value={name} placeholder='Enter the first-Name and Last-Name with space' onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span>UserName:</span>
          <input type="text" value={userName} placeholder='Keep Two Letters you like' onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div>
          <span>Country :</span>
          <input type="text" value={location} placeholder='Enter your  current living Country' onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <span>D-O-B :</span>
          <input type="date" value={DOB} placeholder='Enter your Birthday' onChange={(e) => setDOB(e.target.value + "")} />
        </div>
        <div>
          <span>PROFESSION :</span>
          <input type="text" value={profession} placeholder='Enter your Career name' onChange={(e) => setProfession(e.target.value)} />
        </div>
        <div>
          <span>GENDER :</span>
          <select onChange={(e) => setGender(e.target.value)}>
            <option default hidden>{gender}</option>
            <option>Male</option>
            <option>Female</option>
            <option default>Preferred not to say</option>
          </select>
        </div>
        <div>
          <span>Image :</span>
          <input type="url" value={image} placeholder="Enter your image Link" onChange={(e) => setImage(e.target.value)} />
        </div>
        <div>
          <span>Contribution :</span>
          <input type="number" value={revenue} placeholder='Enter the contribution Amount' onChange={(e) => setRevenue(e.target.value)} />
        </div>
      </div>
      <div className='addUserBtn'>
        <button onClick={() => checkAndUpdate()}>Update USER</button>
        <button className='cancel' onClick={() => history.push("/users/")}>Cancel</button>
      </div>
      <Footer />
    </>
  );
}
