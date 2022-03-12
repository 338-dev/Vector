import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { NavLink } from "react-router-dom";
 import firebase from "../../server/firebase"
// import logo from "./appLogo.png";
// import BgImg from "./backgroundImg.jpg";
// import avatar from "./avatar.png";


const Intro=()=> {
    const [email,setEmail]=useState("")
    const [name, setName] = useState("")
    const [emailchange, setEmailchange] = useState("")
    const [admin, setAdmin] = useState("")
    const [already, setAlready] = useState("")

    const user=firebase.auth().currentUser;
    var db=firebase.firestore();
    const navigate=useNavigate();
    let text = window.location.pathname;
    const myArray = text.split("/");
    const [tim, setTim] = useState(false)   // const nxt=navigate(`/Test/${myArray[2]}`)


    const submit=()=>{
        //alert(name+email)
        
        //alert(myArray[2])
        var ev=email.split("@");
        setEmailchange(ev[0]+"128tdv63ge"+ev[1])
      
          // if(createdUser.exists)
          // {
          //   firebase.auth().signInAnonymously(email,"12345678")
          // }
            
        
            db.collection("assessment").doc(myArray[2])
            .get()
            .then((docop)=>{
                
                setAdmin(docop.get("admin"));
               // alert(docop.get("admin"))
                //alert(admin);

                db.collection("email").doc(docop.get("admin")).collection("saveAssessments").doc(myArray[2])
                .collection("students").doc(email)
                .get().then((doc) => {
                  if (doc.exists) {
                    //alert(admin);
                      console.log("Document data:", doc.data());
                      setAlready("This user has registered in this test")
                  } 
                  else
                  {
                  // doc.data() will be undefined in this case
                     // alert(docop.get("admin"));
                  
                      db.collection("email").doc(docop.get("admin")).collection("saveAssessments").doc(myArray[2])
                      .collection("students").doc(email)
                      .set(
                          {
                              "name":name,
                              "completed":false
                          }
                      )
                      .then((doc)=>{
                         // alert(docop.get("admin"));
                  
                      //alert("qwrwqer")
                          navigate(`/Test/${email+"-"+name+"/"+myArray[2]}`)
                      })
                  }
                
                })
            })
   
        // .catch((error)=>{

        //      var errorCode = error.code;
             
        //       if(errorCode === "auth/email-already-in-use"){
        //         alert("Email in use aldready")
        //       }
        //       firebase.auth().signInWithEmailAndPassword(email,"12345678")
        //       .then(()=>{
        //         db.collection("assessment").doc(myArray[2])
        //     .get()
        //     .then((docop)=>{
                
        //         setAdmin(docop.get("admin"));
        //         alert(docop.get("admin"))
        //         alert(admin);

        //         db.collection("email").doc(docop.get("admin")).collection("saveAssessments").doc(myArray[2])
        //         .collection("students").doc(email)
        //         .get().then((doc) => {
        //           if (doc.exists) {
        //             alert(admin);
        //               console.log("Document data:", doc.data());
        //               setAlready("This user has registered in this test")
        //           } 
        //           else
        //           {
        //           // doc.data() will be undefined in this case
        //               alert(docop.get("admin"));
                  
        //               db.collection("email").doc(docop.get("admin")).collection("saveAssessments").doc(myArray[2])
        //               .collection("students").doc(email)
        //               .set(
        //                   {
        //                       "name":name,
        //                       "completed":false
        //                   }
        //               )
        //               .then((doc)=>{
        //                   alert(docop.get("admin"));
                  
        //               //alert("qwrwqer")
        //                   navigate(`/Test/${email+"-"+name+"/"+myArray[2]}`)
        //               })
        //           }
                
        //         })
        //     })
        //       })
        // })
    }

 
  return (<>
  <div >
    <div style={{"margin":"0 20%","marginTop":"300px"}}>
  <div className="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e=>setEmail(e.target.value)} />
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label for="exampleInputPassword1">Enter your name</label>
    <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>
  </div>
  <div className="form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary" onClick={()=>{submit()}}>Submit</button>
  </div>
  {already}
  </div>
{/* </div></div>:
<div style={{"margin":"0 20%","marginTop":"300px"}}>The test will start in {timer} seconds
    </div>} */}
    </>
  );
}

export default Intro;
