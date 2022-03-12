import React, {useState} from "react"
import { NavLink } from "react-router-dom";
import firebase from "../../../server/firebase";
 import BgImg from "./backgroundImg.jpg";
import Login from "../Login/Login.component";
import Register from "../Register/Register.component";
import "./MainAuth.css";
import logo from "../../../appLogo.png"

const MainAuth =()=>{
    const content=<Login/>
    const [pr,setPr]=useState(content);
    const [stylel, setStylel] = useState("loginBottom");
    const [styler, setStyler] = useState("registerBottom");
    const style1 = {
        "backgroundColor": "white", 
        "margin":"20%",
        "marginBottom":"0%",
        "marginTop":"10%"
        };
    const main={
        "backgroundColor": "white", 
        "marginRight": "13%", 
        "marginLeft": "13%", 
        
      }
      const login=()=>{
          setPr(<Login/>);
          setStylel("loginBottom")
          setStyler("registerBottom");
        }
      const register=()=>{
          setPr(<Register/>)
          setStyler("loginBottom");
          setStylel("registerBottom");
        };
    const css = `
    body {
        background-image: url(${BgImg});
        background-size: 2000px;
    }
  `
 return(
 <>
 <style>{css}</style>
 <h1 style={{"fontSize":"50px","marginTop":"50px","marginBottom":"-10%"}} > 
            <span >   
                <img src={logo} alt="" width="250px" style={{"marginRight":"-95px","marginLeft":"-70px","cursor":"pointer"}} />
            </span>
            ector
        </h1>  
 <div style={style1}>
     <div>
     <p className={[stylel,"btn","login1"].join(' ')} onClick={()=>{login()}}> 
         <h3>Login</h3>
     </p>
     <p className={[styler,"btn","register"].join(' ')} onClick={()=>{register()}}>
         <h3>Register</h3>
     </p>
     <div>{pr}</div>
     </div>
 
 </div>
   
 </>)
}
 
export default MainAuth;