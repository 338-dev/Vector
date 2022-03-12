import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase"
import Topbar from "../Topbar/Topbar.component";

const Submitstudents=()=>{

    const navigate=useNavigate();

    const [input, setInput] = useState("");
    const [studentsdata, setStudentsdata] = useState([]);
    //const [link, setLink] = useState("link");
    var db=firebase.firestore();
    const user=firebase.auth().currentUser;

    const arr=[]

   
    


    useEffect(() => {
        let text = window.location.pathname;
    const myArray = text.split("/");
        console.log("qwerty")
        if(user){
            db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2]).collection("students").get()
    .then((querySnapshot) => {
      const brr=[]
        querySnapshot.forEach((doc) => {
            const smi=[]
              smi.push(doc.id);
              smi.push(doc.data())
          brr.push(smi);
        });
        console.log(brr)
        setStudentsdata(brr);
    }) 
          
        }
        
              
}, [user]);
           
    
const showquestions=(props)=>{
    let text = window.location.pathname;
    const myArray = text.split("/");
    navigate(`/Submittedquestions/${myArray[2]+"/"+props}`);   
}       


    return(
        <>
        <Topbar/> 
        <br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <h1 style={{"textAlign":"center"}}>
                    Students who took assessment
                </h1><br />
                <br />
                <div style={{"backgroundColor":"lightGrey","margin":"0 7%","borderRadius":"2%"}}>
                    <br />
                {studentsdata.map((value, key) => {
            return (
                <div>
              <button className="btn btn-outline-primary" style={{"margin":"1% 5%","width":"50%","color":"black","fontFamily":"monospace"}} onClick={()=>{showquestions(value[0])}}>

                <div><h3 style={{"color":"black"}}>{value[1].name}</h3>
                <p style={{"color":"darkGrey"}}>{value[0]}</p>
                
                </div></button>
                <button type="button" className="btn btn-primary">
  Score <span className="badge badge-light" style={{"backgroundColor":"white","color":"black"}}>{Math.round(value[1].marks)}</span>
</button>
                
                
                </div>
            );
          })}
          </div>
                
                
                </div>
            

        </>
    )
}

export default Submitstudents;