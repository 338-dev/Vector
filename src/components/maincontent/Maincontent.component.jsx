import React, {/*useState,*/} from "react"
import { NavLink } from "react-router-dom";
//import firebase from "../../server/firebase";
import BgImg from "../../backgroundImg.jpg"
import "./maincontent.css"
import Name from "../Assessment/Createassessment/Nameassessment.component"
import Showassessment from "../Assessment/Showassessment/Showassessment.component";
import { useNavigate } from "react-router-dom";
const Maincontent=()=>{

    const navigate = useNavigate();

    function handleClick1() {
        navigate("/Name");
    }  
  
    function handleClick2() {
        navigate("/Show");
    } 
    
    function handleClick3() {
        navigate("/Submitted");
    } 
  
  const css = `
      body {
          background-image: url(${BgImg});
          background-size: 2000px;
          margin-top:-60px;
          background-repeat: no-repeat;
          background-attachment: fixed;
      }
    `
  
    return(
        <>
        <br /><br /><br /><br /><br /><br />
        <style>{css}</style>
        <div className="maindiv">
            
<div className="dheadline" style={{"width":"40%","marginTop":"10%"}}>
    <h1 className="headline" style={{"textAlign":"center","marginLeft":"30%"}}>
        Easiest Way to create assessments!
    </h1>
</div>
        <div className="mainbtn" style={{"borderRadius":"5px","marginTop":"5%","marginBottom":"0","padding":"8%","paddingLeft":"5%","paddingRight":"5%","paddingTop":"0"}}>
            <div style={{"width":"100%"}}>        
                <button className="button-64" role="button" onClick={()=>{handleClick1()}}><span style={{"borderRadius":"50px","padding":"60px 40px","fontFamily":"monospace"}}>Create new assessment</span></button>
            </div>
            {/* <NavLink to="/Name">nanana</NavLink> */}
            <br />
            <div style={{"width":"100%"}}>
                <button className="button-64" role="button" onClick={()=>{handleClick2()}}><span className="text" style={{"borderRadius":"50px","paddingTop":"60px","paddingBottom":"60px","fontFamily":"monospace"}}>View created assessments</span> </button>
            </div><br />
            <div style={{"width":"97%"}}>
                <button className="button-64" role="button" onClick={()=>{handleClick3()}}><span className="text" style={{"borderRadius":"50px","paddingTop":"60px","paddingBottom":"60px","fontFamily":"monospace"}}>View submitted assessments</span> </button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Maincontent;