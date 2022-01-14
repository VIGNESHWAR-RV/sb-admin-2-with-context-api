import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Footer } from "../Footer";
import { contextAPI } from '../../App';

export function UserAdd() {

  const {usersAPI} = useContext(contextAPI);

  const history = useHistory();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [DOB, setDOB] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("");


  const split = () => {
    let split = name.split(" ");
    if (split[1][0]) {
      return split[0][0].toUpperCase() + split[1][0].toUpperCase();
    }
    return split[0][0].toUpperCase();
  };

  const userName = (name === undefined || name === "")
    ? ""
    : (name.includes(" "))
      ? split(name)
      : name[0].toUpperCase();


  const revenue = Math.ceil(Math.random() * 50);

  const newUser = { name, userName, revenue, location, DOB, profession, gender, image };

  const checkAndSet = () => {
    if (newUser.name === "" || newUser.name === undefined)
      alert("please Enter a valid name!!!");
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
    else {
      fetch(usersAPI,
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-Type": "application/json" }
        })
        .then(() => history.push("/users/"));
    };
  };

  return (
    <>
      <div className='adduserHead'>
        <h1>Create New User</h1>
      </div>
      <div className='adduser'>
        <div>
          <span>Name :</span>
          <input type="text" placeholder='Enter the first-Name and Last-Name with space' onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <span>Country :</span>
          <input type="text" placeholder='Enter your  current living Country' onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div>
          <span>D-O-B :</span>
          <input type="date" placeholder='Enter your Birthday' onChange={(e) => setDOB(e.target.value + "")} />
        </div>
        <div>
          <span>PROFESSION :</span>
          <input type="text" placeholder='Enter your Career name' onChange={(e) => setProfession(e.target.value)} />
        </div>
        <div>
          <span>GENDER :</span>
          <select onChange={(e) => setGender(e.target.value)}>
            <option default hidden>Select your gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Preferred not to say</option>
          </select>
        </div>
        <div>
          <span>Image :</span>
          <input type="url" placeholder="Enter your image Link" onChange={(e) => setImage(e.target.value)} />
        </div>
      </div>
      <div className='addUserBtn'>
        <button onClick={() => checkAndSet()}>ADD USER</button>
        <button className='cancel' onClick={() => history.push("/users/")}>Cancel</button>
      </div>
      <Footer />
    </>
  );
}
