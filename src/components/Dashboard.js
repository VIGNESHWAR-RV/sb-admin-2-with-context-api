import { useState, useEffect ,useContext } from 'react';
import chart from '../SVGs/charts.svg';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { Footer } from "./Footer";
import { contextAPI } from '../App';

export function Dashboard() {

  return (
    <div className='content'>
      <div className='svgs'>
        <object className='world' type="image/svg+xml" data={chart}>
          <img src={chart} alt="imagee" />
        </object>
      </div>

      <div className="Body">
        <section className='welcome'>
          <h1>Welcome ADMIN!!!</h1>
        </section>
        <section className='mainContent'>
          <MainContentDash />
        </section>
      </div>
    </div>
  );
}
function MainContentDash() {

  const [users1, setUser] = useState([]);
  const {usersAPI} = useContext(contextAPI);
  useEffect(() => {
    fetch(usersAPI, { method: "GET" })
    .then(response => response.json())
    .then(data => setUser(data));
  }, []);

  

  const num = users1.length;
  const sum = users1.reduce((sum, element) => sum + element.revenue, 0);
  const current = (num !== 0) ? users1[num - 1].revenue : 0;


  const data2 = [
    { name: "pr-1", uv: 10, sold: 2 },
    { name: "pr-2", uv: 30, sold: 1 },
    { name: "pr-3", uv: 20, sold: 4 },
    { name: "pr-4", uv: 17, sold: 3 },
    { name: "pr-5", uv: 33, sold: 6 },
    { name: "pr-6", uv: 23, sold: 5 },
    { name: "pr-7", uv: 14, sold: 8 },
    { name: "pr-8", uv: 28, sold: 7 }
  ];
  const num1 = data2.length;
  const sold = data2.reduce((sum, element) => sum + element.sold, 0);
  const sum1 = data2.reduce((sum, element) => sum + element.uv, 0);



  return (
    <>
      <div className='dashTop'>
        <div className='search'>
          <form className='searchForm'>
            <input placeholder='Search' />
            <button disabled><SearchIcon /></button>
          </form>
        </div>
        <div className='prof'>
          <Badge badgeContent={4} color="error">
            <MailIcon sx={{ color: "#f0c7c7" }} />
          </Badge>
          <Badge badgeContent={2} color="error">
            <NotificationsIcon sx={{ color: "#f0c7c7" }} />
          </Badge>
          <Avatar sx={{ background: "red" }}>RV</Avatar>
        </div>
      </div>
      <div className="dashyInfo">
        <div className='detailsAndChart'>
          <div className='details'>
            <h1>USERS - INFO</h1>
            <h2>Total Users - {num}</h2>
            <h2>Total Income - ${sum}</h2>
            <h2>Current Income - ${current} </h2>
          </div>
          <div className='Areachart'>
            <AreaChart id="Areachart" width={500} height={400} data={users1}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="userName" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#5e0404" fill="#5e0404" />
            </AreaChart></div>
        </div>

        <div className='detailsAndChart'>
          <div className='details'>
            <h1>PRODUCTS - INFO</h1>
            <h2>Total Products - {num1}</h2>
            <h2>Units Sold -  {sold}</h2>
            <h2>Total Income - ${sum1} </h2>
          </div>
          <div className='Areachart'>
            <AreaChart id="Areachart" width={500} height={400} data={data2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="sold" stroke="#5e0404" fill="#5e0404" />
            </AreaChart>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
