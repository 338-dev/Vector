import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../../server/firebase";
import BgImg from "../../../backgroundImg.jpg";
import Topbar from "../../Topbar/Topbar.component";
import "./Showassessment.css"

const Showassessment=()=>{

    const navigate=useNavigate();

    const [input, setInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    //const [link, setLink] = useState("link");
    var db=firebase.firestore();
    const user=firebase.auth().currentUser;

    const arr=[]

    const showtopic=(props)=>{
        navigate(`/showQuestions/${props}`)
    }
    
    
    const link=(props)=>{
        let text;
          text=window.location.href;
          const myarr=text.split("Show")
    
        //window.CopyToClipboard(myarr+"Intro/"+props)
        navigator.clipboard.writeText(myarr[0]+"Intro/"+props)
    }

    useEffect(() => {
        console.log("qwerty")
        if(user){
            console.log("op")
            db.collection("email").doc(user.email).collection("saveAssessments") 
            .get()
          .then((querySnapshot) => {
            const arr=[]
              querySnapshot.forEach((doc) => {
                  const sm=[]
                    sm.push(doc.id);
                    sm.push(doc.data())
                arr.push(sm);
              });
              console.log(arr)
              setFilteredData(arr);
          })  
          
        }
        
              
}, [user]);
           
    
       
    return(
        <>
        <Topbar/> 
        <br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <h1 style={{"textAlign":"center"}}>
                    Previously Created Assessments!
                </h1><br />
                <br />
                <div style={{"backgroundColor":"lightGrey","margin":"0 7%","borderRadius":"2%"}}>
                    <br />
                {filteredData.map((value, key) => {
            return (
                <div style={{"margin":"auto","textAlign":"center"}}>
              <button className="btn btn-outline-primary" style={{"margin":"1% 5%","width":"70%","color":"black","fontFamily":"monospace"}} onClick={()=>{showtopic(value[0]);}}>

                <div><p style={{"color":"black"}}>{value[1].name}</p>
                
                </div></button>
                <button className="btn btn-outline-info" style={{"float":"right","marginRight":"6%"}} onClick={()=>{link(value[0])}}>
                    Copy link
                </button>
                </div>
            );
          })}
          </div>
                
                
                </div>
            

        </>
    )
}

export default Showassessment;