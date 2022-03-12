import React, {useState, useEffect, useContext} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../../server/firebase"
import BgImg from "../../../backgroundImg.jpg";
import Topbar from "../../Topbar/Topbar.component";
import "./Nameassessment.css"
import Createassessment from "./Createassessment.component";

const Nameassessment=()=>{

    const navigate=useNavigate();
    //const id=useContext();

    const [input, setInput] = useState("");
    var db=firebase.firestore();
    var auth=firebase.auth().currentUser;

    const registernames=()=> {
        db.collection("email").doc(auth.email).collection("saveAssessments")
        .add(
            {
                "name":input
            }
        )
        .then((docref)=>{
        

            db.collection("assessment").doc(docref.id)
            .set(
                {
                    "admin":auth.email
                }
            )
            .then(()=>{
                navigate(`/Create/${docref.id}`);
            })
        })
        
        

    }


    
        //eslint-disable-next-line
       
     
    //   console.log(value)
    return(
        <>
        <Topbar/>
        <br />
        <br />
        <br />
        <br /> 
        <br />
        <br />
        <br />
        <br />
        <br />
            <div>
                <h1 style={{"textAlign":"center"}}>
                    Enter the name of assessment
                </h1>
                <br /><br /><br />
                
                <input type="text" style={{"width":"50%","margin":"auto"}} className="form-control name"
                value={input} onChange={e => setInput(e.target.value)} />
                <br />
                <center>
                <button className="btn btn-primary"   onClick={()=>{
                    registernames()}}>Done!</button>
                </center>
                </div>
            

        </>
    )
}

export default Nameassessment;