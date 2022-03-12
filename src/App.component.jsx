import React, {/*useState, useEffect*/} from "react"
// import { NavLink } from "react-router-dom";
// import firebase from "./server/firebase";
// import logo from "./appLogo.png";
// import BgImg from "./backgroundImg.jpg";
// import avatar from "./avatar.png";
import Topbar from "./components/Topbar/Topbar.component";
import Maincontent from "./components/maincontent/Maincontent.component";
import "./App.css"

function App() {
 
  return (<>
    <div className="App">
   
  <Topbar/> 
  <Maincontent/>
      
    </div>
    </>
  );
}

export default App;
