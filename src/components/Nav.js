import Button from '@mui/material/Button';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function Nav() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const menuStyle = open ? { width: "18%" } : { width: "3.5%", minWidth: "5vh" };
  const MenuStyle = open ? { height: "12rem" } : { height: "4%", minHeight: "4.5vh" };

  const buttonRotation = {
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    color: "white", transition: " all 0.6s ease-in-out"
  };
  const ButtonRotation = {
    transform: open ? "rotate(270deg)" : "rotate(90deg)",
    color: "white", transition: " all 0.6s ease-in-out"
  };

  return (
    <>
      <nav style={menuStyle} className="menu">
        <button
          className='menuIcon'
          onClick={() => setOpen(!open)}>
          <DoubleArrowIcon sx={buttonRotation} />Menu
        </button>
        <ul>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/"); }}>DashBoard</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/users"); }}>Users</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/contact-us1"); }}>Contact Us 1</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/contact-us2"); }}>Contact Us 2</Button></li>
        </ul>
      </nav>
      <nav style={MenuStyle} className="Menu">
        <button
          className='MenuIcon'
          onClick={() => setOpen(!open)}>
          <DoubleArrowIcon sx={ButtonRotation} />Menu
        </button>
        <ul>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/"); }}>DashBoard</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/users"); }}>Users</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/contact-us1"); }}>Contact Us 1</Button></li>
          <li><Button className='button' onClick={() => { setOpen(!open); history.push("/contact-us2"); }}>Contact Us 2</Button></li>
        </ul>
      </nav>
    </>
  );
}
