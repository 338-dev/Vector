import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase"
//import BgImg from "../../../backgroundImg.jpg";
import Topbar from "../Topbar/Topbar.component";

const Submitlist=()=>{

    const navigate=useNavigate();

    const [input, setInput] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [studentsdata, setStudentsdata] = useState([]);
    //const [link, setLink] = useState("link");
    var db=firebase.firestore();
    const user=firebase.auth().currentUser;

    const arr=[]

    // const showtopic=(props)=>{
    //     navigate(`/showQuestions/${props}`)
    // }
    
    

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



const students=(props)=>{

    navigate(`/SubmitStudent/${props}`);   
     
}
           
    
       
    return(
        <>
        <Topbar/> 
        <br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <h1 style={{"textAlign":"center"}}>
                    Previously Submitted Assessments!
                </h1><br />
                <br />
                <div style={{"backgroundColor":"lightGrey","margin":"0 7%","borderRadius":"2%"}}>
                    <br />
                {filteredData.map((value, key) => {
            return (
                <div>
              <button className="btn btn-outline-primary" style={{"margin":"1% 5%","width":"90%","color":"black","fontFamily":"monospace"}} onClick={()=>{students(value[0]);}}>

                <div><p style={{"color":"black"}}>{value[1].name}</p>
                
                </div></button>
                </div>
            );
          })}
          </div>
                
                
                </div>
            

        </>
    )
}

export default Submitlist;