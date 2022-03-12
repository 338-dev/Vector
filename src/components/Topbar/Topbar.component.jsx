import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase";
import logo from "../../appLogo.png";
import avatar from "../../avatar.png";
import "./Topbar.css"

const Topbar=()=>{
    
 var [username,setUsername]=useState("User");
 const navigate=useNavigate();

var user = firebase.auth().currentUser;

useEffect(() => {
 
    if (user !== null) {
   
        const displayName = user.displayName;
        setUsername(displayName); 
        console.log(username)      
        
      }

}, [user]);



 
const signout=()=>{
    firebase.auth().signOut();
  }
  const start=()=>{
    navigate("/");
  }

return(
    <>
<div className="flex-container" style={{"backgroundColor":"lightgrey","marginLeft":"0px","marginTop":"30px","height":"130px","position":"fixed","width": "100%"}}>

    <div style={{"width":"50%","paddingTop":"0px"}}>
        <h1 style={{"fontSize":"50px"}} > 
            <span >   
                <img src={logo} alt="" width="250px" style={{"marginRight":"-95px","marginLeft":"-70px","cursor":"pointer"}} onClick={()=>{start();}} />
            </span>
            ector
        </h1>  
    </div>
    
    <div className="" style={{"width":"50%","float":"right","paddingTop":"30px","marginRight":"20px"}}>
       <div style={{"float":"right"}}>
            <img src={avatar} width="100px" style={{"width":"","marginRight":"0px","paddingTop":"0px"}}/>
                <div className="dropdown">
                    <button className="dropbtn" >{username}</button>
                        <div className="dropdown-content">
                        <button className="btn" onClick={()=>{signout()}}>Signout</button>
                       </div>
                </div>

        </div>
    </div>
</div> 

        </>
    )
    
}

export default Topbar;