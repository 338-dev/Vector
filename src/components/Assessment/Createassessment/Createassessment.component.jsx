import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import firebase from "../../../server/firebase"
import BgImg from "../../../backgroundImg.jpg";
import Topbar from "../../Topbar/Topbar.component";
import "./Createassessment.css"



const Createassessment=()=>{

    const navigate=useNavigate();
    const [inputQues,setInputQues]=useState("")
    
    const [inputop1,setInputop1]=useState("")
    
    const [inputop2,setInputop2]=useState("")
    
    const [inputop3,setInputop3]=useState()
    
    const [inputop4,setInputop4]=useState()

    const [ans,setAns]=useState(1)
    const [dur,setDur]=useState("")
    const [answerw,setAnswerw]=useState("")

    const [marks,setMarks]=useState()
    const [comp,setComp]=useState(false)
        
    const Timemarks=()=>{
        return(
            <>
                <button type="button" className="btn btn-primary" style={{"margin":"0 2%"}}>
  Duration<span className="badge badge-light"><input type="number" name="btn" className="form-control" id="inlineFormInputGroup" placeholder="in min." min="1" max="100" value={dur} onChange={e => setDur(e.target.value)}/></span>
</button>
<button type="button" className="btn btn-primary" >
  Total marks<span className="badge badge-light"><input type="number" name="btn" className="form-control" id="inlineFormInputGroup" min="1" max="100" value={marks} onChange={e => setMarks(e.target.value)}/></span>
</button>
            </>
        )
    }
    const Tag2=()=>{
        return(
            <>
            <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">3</div>
            </div>
            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Option3"
            value={inputop3}
                     onChange={e => setInputop3(e.target.value)}/>

                     
          </div>
          <br />
            </>
        )
    }

    const Tag3=()=>{
        return(
            <>
                        <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">4</div>
            </div>
            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Option4"
             value={inputop4}
                    onChange={e => setInputop4(e.target.value)}/>
          </div>
          <br />
            </>
        )
    }
    const Plus=()=>{
        return(
            <>
<button className="btn btn-outline-secondary" style={{"float":"right"}} onClick={()=>{
                        hidden();
                    }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg>
</button>
            </>
        )
    }


   // const navigate=useNavigate();
    const user=firebase.auth().currentUser
     const [topic, setTopic] = useState("");
     const[noq,setNoq]=useState("")
     const[tags,setTags]=useState([]);
     var db=firebase.firestore();
    // setTopic();
    let text = window.location.pathname;
    const myArray = text.split("/");
    useEffect(()=>{
        if(user)
        {
            db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2])
            .onSnapshot((doc)=>{
                
                    setTopic(doc.get("name"))
                    console.log(doc.get("name"));
                
            })

            db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2]).collection("save")
            .onSnapshot((doc)=>{
                
                    
                    setNoq(doc.size);
                
            })
        }
    },[user])



    var a=1;
    var arr=[]
    const hidden=()=>{
        console.log(a);
      
        if(tags.length===0)
        {
            //alert(1221)
            //arr.push()
            setTags([<Tag2/>]);
            a+=1;
            //arr.pop();    
        }
        else if(tags.length===1)
        {
           // arr.push([<Tag3/>])
            setTags([<Tag2/>,<Tag3/>]);
            a+=1;
            //arr.pop();    
        }
    }
    const add=()=>{
      //alert("rsfgdfg")
        if(tags.length===0)
        {
            setInputop3("");
            setInputop4("");
        }
        else if(tags.length===1)
        {
            setInputop4("")
        }

        if(ans===1)
        {
          setAnswerw(inputop1)
         //   alert(2)

        }
        else if(ans===2)
        {
          setAnswerw(inputop2)
         //   alert(2)
        }
        else if(ans===3)
        {
          setAnswerw(inputop3)
         //   alert(2)
        
        }
        else if(ans===4)
        {
         //   alert(2)
         setAnswerw(inputop4)
        }
        db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2]).collection("save").doc(inputQues)
        .set({
            op1:inputop1,
            op2:inputop2,
            op3:inputop3,
            op4:inputop4,
            answer:answerw,
            ansnum:ans

            
        })
        .then(()=>{
            setInputQues("")
            setInputop1("")
            
            setInputop2("")
            setInputop3()
            setInputop4()
            setAns(1)
            setTags([]);
            setAnswerw("")
    })
  }

    const submit=()=>{
        db.collection("email").doc(user.email).collection("saveAssessments").doc(myArray[2])
        .update({
            point:marks,
            duration:dur
        })
        .then(()=>{
          //  alert("submit");
          db.collection("assessment").doc(myArray[2]).
          update({
            points:marks,
            duration:dur
          })
          .then(()=>{
            navigate("/");
          })
        })
    }
     
        //eslint-disable-next-line
    //    `*{
    //     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    //    }
    //    `
     
    //   console.log(value)
    // const mystyle = {
    //     fontaFmily: -apple-system, BlinkMacSystemFont, SegoeUI, Roboto, Oxygen, Ubuntu, Cantarell, OpenSans, HelveticaNeue, sansSerif
    //   };
    return(
        <>
        <Topbar/> 
        <br /><br /><br /><br /><br /><br /><br />
            <div>
                
                <h1 style={{"textAlign":"center"}}>
                    Create assessment!
                </h1>
                <h3 style={{"textAlign":"center"}}>
                  {topic}
                </h3>
                <br />
                <button type="button" className="btn btn-primary">
  Total Questions <span className="badge badge-light" style={{"backgroundColor":"white","color":"black"}}>{noq}</span>
</button>
                <br />
                <div style={{"textAlign":"center", "width":"40%","margin":"auto"}}>
                 
                <div className="input-group mb-2" style={{"display":"flexbox","textAlign":"center","margin":"auto"}}>
        <div className="input-group-prepend">
          <div className="input-group-text">Question</div>
        </div>
        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Enter the Question"
        value={inputQues} onChange={e => setInputQues(e.target.value)}
        />
      </div>
                    <br />
                    <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">1</div>
        </div>
        <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Option1"
        value={inputop1} onChange={e => setInputop1(e.target.value)}
        />
      </div>

                    <br />
                    <div className="input-group mb-2">
            <div className="input-group-prepend">
              <div className="input-group-text">2</div>
            </div>
            <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Option2"
                    value={inputop2} onChange={e => setInputop2(e.target.value)}/>
          </div>
                        <br />
                    {tags}
                    <div>
                    {tags.length<2?<Plus/>:" "}{comp===false?
                    <button type="button" className="btn btn-primary">
  Answer <span className="badge badge-light"><input type="number" name="btn" className="form-control" id="inlineFormInputGroup" min="1" max={tags.length+2} value={ans} onChange={e => setAns(e.target.value)}/></span>
</button>:""}
                    {/* <p style={{"float":"left"}}>
                        {
                            tags.length===0?<Answer2/>
                            :tags.length===1?<Answer3/>
                            :<Answer4/>
                        }
                    </p><br /> */}
                    
                </div>

                    <br />
                    


                    {comp===true?<Timemarks/>:""}
                </div>
               <br />
                <div style={{"display":"flexbox","width":"50%","margin":"auto","marginBottom":"20px"}}>

                <button className="btn btn-primary" onClick={()=>{add();}}>Add Question</button>
                    
                <button className="btn btn-primary" style={{"float":"right"}} onClick={()=>{comp===false?setComp(true):submit();}}>{comp===false?"Done!":"Submit"}</button>
                </div>
                </div>
            

        </>
    )
}

export default Createassessment;