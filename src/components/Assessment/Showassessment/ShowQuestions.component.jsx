import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../../server/firebase";
import BgImg from "../../../backgroundImg.jpg";
import Topbar from "../../Topbar/Topbar.component";
//import "./ShowQuestions.css"


const ShowQuestions=()=>{
    const [filteredData, setFilteredData] = useState([]);
    var db=firebase.firestore();
    const user=firebase.auth().currentUser;
   
        const[topic,setTopic]=useState("")
        const[marks,setMarks]=useState("")
        const[time,setTime]=useState("")
        var text = window.location.pathname;
        const myArray = text.split("/");

        useEffect(() => {
          if(user){
            db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2]).collection("save") 
            .get()
               .then((querySnapshot) => {
                const brr=[]
                querySnapshot.forEach((doc) => {
                const sm=[]
                 sm.push(doc.id);
                sm.push(doc.data())
                
                brr.push(sm);
                });
                
                setFilteredData(brr);
                            
               })
               db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2])
               .get()
               .then((doc)=>{
                   setTime(doc.get("duration"))
                   setMarks(doc.get("point"))
                   setTopic(doc.get("name"))
               })
            } 
        }, [user])  
        
        
    

    return(
        <>
        <Topbar/>
        <br />

        <div style={{"textAlign":"center","marginTop":"160px"}}>
            <h2>{topic}</h2>
<div style={{"float":"left","marginLeft":"20px" }}>
<button type="button" className="btn btn-primary">
  Timer<span className="badge badge-light">{time}</span>
</button>
    
</div>
<button type="button" className="btn btn-primary" style={{"float":"right","marginRight":"20px"}}>
  Total marks<span className="badge badge-light">{marks}</span>
</button>
<br /><br />
        {filteredData.map((value, key) => {
            return (
              <h1 className="btn btn-outline-primary" style={{"margin":"1% 5%","width":"70%","color":"black","fontFamily":"monospace"}} >

                <div><p style={{"color":"black","fontSize":"30px","float":"left"}}>Q.  {value[0]}</p>      </div><br /><br /><br />
               <br /><br />
                <div >
                <p style={{"float":"left"}}>1. {value[1].op1}</p><br /><br />
                <p style={{"float":"left"}}>2.   {value[1].op2}</p><br /><br />
{value[1].op3!==""?<><p style={{"float":"left"}}>3.  {value[1].op3}</p><br /><br /></>:""}               
{value[1].op3!==""?<><p style={{"float":"left"}}>4. {value[1].op4}</p><br /><br /></>:""}
<p style={{"float":"left"}}>Answer. {value[1].ansnum}</p>
                </div>
          
                
              </h1>
            );
          })}
          </div>
        </>
    )
} 

export default ShowQuestions;