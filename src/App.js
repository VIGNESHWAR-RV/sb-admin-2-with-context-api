//import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Users } from './components/users/Users';
import { ContactUs1 } from './components/ContactUs';
import { ContactUs2 } from './components/ContactUs-with-useState'
import { Dashboard } from './components/Dashboard';
import { Nav } from './components/Nav';
import { Error } from './components/Error';
import { createContext } from 'react';

//step 1 - createContext
const contextAPI = createContext(null);
function App() {
 
  const usersAPI = "https://61c412daf1af4a0017d99281.mockapi.io/users";
  const queryAPI = "https://61c412daf1af4a0017d99281.mockapi.io/queries1"

  return (
      //step - 2 publish context
    <contextAPI.Provider value={{usersAPI,queryAPI}}>

    <div className="App">
      <div className="App-header">
        <Nav/>
      </div> 
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route path="/users">
        <Users/>
      </Route>
      <Route path="/contact-us1">
        <ContactUs1/>
      </Route>
      <Route path="/contact-us2">
        <ContactUs2/>
      </Route>
      <Route path="**">
        <Error/>
      </Route>
    </Switch>
    </div>
    
    </contextAPI.Provider>
  );
}



export default App;
export {contextAPI}; //step: 3 - export and subscribing wherever we need it