import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
// import { NavLink } from "react-router-dom";
 import firebase from "../../server/firebase"
import Topbar from "../Topbar/Topbar.component";
 import logo from "../../appLogo.png";
 import BgImg from "./../../backgroundImg.jpg";
// import avatar from "./avatar.png";
import "./Test.css";

const Test=()=> {
    const [email,setEmail]=useState()
    const [name, setName] = useState()
    const [adminn, setAdminn] = useState("")
    const [questions, setQuestions] = useState(0)
    const [filteredData, setFilteredData] = useState([]);
    const [lengthqw, setLengthqw] = useState()
    const [word, setWord] = useState("")
    const [marks, setMarks] = useState(0)
    const [timer, setTimer] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [inc, setInc]=useState(0)
    const [timertillO, setTimertillO]=useState(1000)
    const [numbers, setNumbers]=useState([])
    

    const user=firebase.auth().currentUser;
    var db=firebase.firestore();
    const navigate=useNavigate();
const [kv1, setKv1] = useState(0)


    let text = window.location.pathname;
    
    const myArray = text.split("/");


    useEffect(() => {
      
      var x=myArray[2].split("-");
      setEmail(x[0]);
    

        db.collection("assessment").doc(myArray[3])
        .get()
        .then((docref)=>{

          setMarks(docref.get("points"))
          setTimer(docref.get("duration"))

          // var timeleft = timer*60;
          // var downloadTimer = setInterval(function(){
          // timeleft--;
          // setTimertillO(timeleft);
          // if(timeleft <= -4)
          //     navigate("/End");
          // },1000);


          console.log(docref.get("admin"))

          db.collection("email").doc(docref.get("admin")).collection("saveAssessments").doc(myArray[3]).collection("students").doc(email)
          .get().then((doc)=>{
            if(doc.get("completed")===true) {
              navigate("/End")
            }
            else if(doc.get("completed")===false)
            {

              console.log("fgfhgh"+myArray[3]+docref.get("admin"))
                setAdminn(docref.get("admin"));
                console.log(myArray[3])
        
                db.collection("email").doc(docref.get("admin")).collection("saveAssessments").doc(myArray[3]).collection("save")
                .get()
                .then((querySnapshot) => {

                    const brr=[]
                    querySnapshot.forEach((doc) => {
                      //setInc(inc+1)
                     // setNumbers(numbers.push(inc))
                        const sm=[]
                        sm.push(doc.id); 
                        sm.push(doc.data())
                        brr.push(sm);
                    });
                    setNumbers(Array.from({length: brr.length}, (_, index) => index + 1));
                    //alert(foo.get(name))
                    setFilteredData(brr);
                    setLengthqw(brr.length)
                    var arrrr=[];
                    console.log(numbers)
                    // arrrr.push(filteredData[0])
                    // console.log(arrrr);
                })}
                
              })
        })

    
    
    }, [timer])



  const submit=(props,key,sizeofarr,op1,op2,op3,op4)=>{
    var x=myArray[2].split("-");
    setEmail(x[0])
    //console.log(email+adminn)

    db.collection("email").doc(adminn).collection("saveAssessments").doc(myArray[3])
    .collection("save").doc(props)
    .get()
    .then((docqw)=>{
      console.log(word)
    if(word===props ||questions==docqw.get("ansnum"))
    {
      setCorrect(correct+1);
    }


    db.collection("email").doc(adminn).collection("saveAssessments").doc(myArray[3])
            .collection("students").doc(email).collection("response").doc(props)
            .set({
              "ans":name,
              "optioninnum":questions,
              "correct":docqw.get("answer"),
              "correctinnum":docqw.get("ansnum"),
              "op1":op1,
              "op2":op2,
              "op3":op3,
              "op4":op4
            })
            .then(()=>{
              setQuestions(0)
              if(key===lengthqw-1)
              {
                var totalscore=correct/sizeofarr*marks
                db.collection("email").doc(adminn)
                .collection("saveAssessments").doc(myArray[3])
                .collection("students").doc(email)
                .update({
                  "completed":true,
                  "marks":totalscore
                })
                .then(()=>{
                  //firebase.auth().signOut();
                  navigate("/End")
                })
                
              }
              setKv1(kv1+1)
            })
          })

  }
    

  const choose=(number,value,corr)=>{
      setQuestions(number)
      setName(value)
      setWord(corr)
  }

 
  var qwert;
    
  return (<>


  
   <div className="flex-container" style={{"backgroundColor":"lightgrey","marginLeft":"0px","marginTop":"30px","height":"130px","position":"fixed","width": "100%"}}>

<div style={{"width":"50%","paddingTop":"0px"}}>
    <h1 style={{"fontSize":"50px"}} > 
        <span >   
            <img src={logo} alt="" width="250px" style={{"marginRight":"-95px","marginLeft":"-70px"}} />
        </span>
        ector
    </h1>  
</div>

<div className="" style={{"width":"50%","float":"right","paddingTop":"30px","marginRight":"20px"}}>
   <div style={{"float":"right"}}>
        
            <div className="dropdown" style={{"fontSize":"20px"}}>Logged in:
                <button className="dropbtn" style={{"fontSize":"24px"}} >{(myArray[2].split("-"))[1]}</button>
                    
            </div>

    </div>
</div>
</div> 

  
<br /><br /><br /><br /><br /><br /><br /><br /><br />
<div style={{"display":"flex"}}>


{/* <h1>Timer:{Math.round(timertillO/60)+":"+timertillO%60}</h1> */}
     {filteredData.map((value, key) => {
         
            return (
                <>
                {(key===kv1)?
              <h1 style={{"margin":"1% 5%","width":"90%","color":"black","fontFamily":"monospace","backgroundColor":"white","padding":"5%","borderRadius":"5px"}} >
            
                <><div><p style={{"color":"black","fontSize":"30px","float":"left"}}>Q{key+1+". "+value[0]}</p>      </div><br /><br /><br />
                <div >
                <button className={questions===1?"btn styledark":"btn stylelight"}  style={{"float":"left"}} onClick={()=>{choose(1,value[1].op1,value[1].answer)}}>{value[1].op1}</button><br /><br />
                <button className={questions===2?"btn styledark":"btn stylelight"} style={{"float":"left"}} onClick={()=>{choose(2,value[1].op2,value[1].answer)}}>  {value[1].op2}</button><br /><br />

                {value[1].op3!==""?<div><button className={questions===3?"btn styledark":"btn stylelight"} style={{"float":"left"}} onClick={()=>{choose(3,value[1].op3,value[1].answer);}}> {value[1].op3}</button><br /><br /></div>:""}

                {value[1].op4!==""?<div><button className={questions===4?"btn styledark":"btn stylelight"} style={{"float":"left"}} onClick={()=>{choose(4,value[1].op4,value[1].answer);}}> {value[1].op4}</button><br /><br /> </div>:""}
                </div></>
                <button className="btn btn-secondary" style={{"float":"left"}}onClick={()=>{kv1!==0?setKv1(kv1-1):setKv1(kv1)}}>Previous Question</button>
                <button className="btn btn-secondary" style={{"float":"right"}} onClick={()=>{submit(value[0],key,filteredData.length,value[1].op1,value[1].op2,value[1].op3,value[1].op4);}}>{key!==lengthqw-1?"Next Question":"Submit"}</button>
              <br /></h1>:""} </>
             )})}
             </div>
    </>
  );
}

export default Test;
