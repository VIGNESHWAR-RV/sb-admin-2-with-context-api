import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Footer } from "../Footer";
import { contextAPI } from '../../App';

export function UserProfile() {

  const {usersAPI} = useContext(contextAPI);

  let { id } = useParams();
  const [profile, setUser] = useState();
  const getUser = () => {
    fetch(`${usersAPI}/${id}`, { method: "GET" })
    .then(response => response.json())
    .then((data) => setUser(data));
  };
  useEffect(() => getUser(), []);
  const gender = (profile)
    ? (profile.gender === "Male" || profile.gender === "Female")
      ? "," + profile.gender
      : ""
    : "";
  return (
    <>
      {(profile) ?
        <><div className='userProfile'>
          <div className='userImage'>
            <img src={profile.image} alt='profile-pic'></img>
          </div>
          <div className='userinfo'>
            <h1>{profile.name}</h1>
            <h2>{profile.DOB}{gender}</h2>
            <h3> <span> PROFESSION: </span> {profile.profession}</h3>
            <h3> <span>LIVES IN: </span>{profile.location}</h3>
            <h3><span>CONTRIBUTION: </span>${profile.revenue}/-</h3>
          </div>
        </div><Footer />
        </> : ""}
    </>
  );
}
