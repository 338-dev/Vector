import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../server/firebase"
import Topbar from "../Topbar/Topbar.component";

const Submitquestion=()=>{

    const navigate=useNavigate();

    const [input, setInput] = useState("");
    const [answer,setAnswer]=useState("");
    const [studentsdata, setStudentsdata] = useState([]);
    //const [link, setLink] = useState("link");
    var db=firebase.firestore();
    const user=firebase.auth().currentUser;

    const arr=[]

   
    


    useEffect(() => {
        const qwe=[]

        let text = window.location.pathname;
        const myArray = text.split("/");
            console.log(myArray[2])
            if(user){
//         db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[3]).collection("save").doc(studentsdata[0])
//             .onSnapshot((ref)=>{
//                 console.log(ref.get("ansnum"))
//                 if(ref.get("ansnum")===1)
//                 {
//                     setAnswer(ref.get("ansnum"))
//                 }
//                 else if(ref.get("ansnum")===2)
//                 {
//                     setAnswer(ref.get("ansnum"))
//                 }
//                 else if(ref.get("ansnum")===3)
//                 {
//                     setAnswer(ref.get("ansnum"))
//                 }
//                 else if(ref.get("ansnum")===4)
//                 {
//                     setAnswer(ref.get("ansnum"))
//                 }
// })
        
        
            db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2]).collection("students").doc(myArray[3]).collection("response").get()
    .then((querySnapshot) => {
        
      const brr=[]
        querySnapshot.forEach((doc) => {
            
                const smi=[]
                qwe.push(doc.id)
              smi.push(doc.id);
              smi.push(doc.data())
              smi.push(answer)
          brr.push(smi);
        });
        
        console.log(brr)
        setStudentsdata(brr);
            
            
            
    })

        }
        
              
}, [user]);
           
    
       
    return(
        <>
        <Topbar/> 
        <br /><br /><br /><br /><br /><br /><br /><br />
            <div>
                <h1 style={{"textAlign":"center"}}>
                    Questions and Responses
                </h1><br />
                <br />
                <div style={{"backgroundColor":"lightGrey","margin":"0 7%","borderRadius":"2%"}}>
                    <br />
                {studentsdata.map((value, key) => {
            return (
                <div>
              <button className="btn btn-outline-primary" style={{"margin":"1% 5%","width":"90%","color":"black"}}>

                <div style={{"float":"left"}}>
                <h3 style={{"color":"black"}}>Q.{key+1+" "+value[0]}</h3>
                <div>
                <h5>1. {value[1].op1}</h5>
                <h5>2. {value[1].op2}</h5>
                {value[1].op3!==""?<h5>3. {value[1].op3}</h5>:""}
                {value[1].op4!==""?<h5>4. {value[1].op4}</h5>:""}
                <br />
                <div style={{"display":"flex"}}>
                    <p>Choosen:{value[1].optioninnum}</p>
                    <p style={{"float":"right","marginLeft":"190%"}}>Answer:{value[1].correctinnum}</p>
                    </div>
                </div>
                
                </div></button>
                </div>
        );
          })}
          </div>
                
                
                </div>
            

        </>
    )
}

export default Submitquestion;