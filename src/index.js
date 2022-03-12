import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './App.component';
import firebase from './server/firebase';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
//import {Redirect} from 'react-router';
import { useNavigate } from "react-router-dom";
import Login from "./components/auth/Login/Login.component"
import Register from './components/auth/Register/Register.component';
import MainAuth from './components/auth/MainAuth/MainAuth.component';
import Name from "./components/Assessment/Createassessment/Nameassessment.component";
import Create from "./components/Assessment/Createassessment/Createassessment.component";
import Showassessment from './components/Assessment/Showassessment/Showassessment.component'; 
import ShowQuestions from './components/Assessment/Showassessment/ShowQuestions.component';
import Intro from './components/TakingAssessment/Intro.component';
//import "semantic-ui-react/semantic.min.css"
import Test from './components/TakingAssessment/Test.component';
import End from './components/TakingAssessment/End.component';
import Submitlist from './components/Submit/Submitlist.component';
import Submitstudents from './components/Submit/Submitstudents.component';
import Submitquestion from './components/Submit/Submitquestions.component';

const Index = () => {
  var auth=firebase.auth();
  //var db=firebase.firestore();
  
  const navigate = useNavigate();

   useEffect(() => {
    let text = window.location.pathname
    const myArray = text.split("/")
    auth.onAuthStateChanged((user) => {
      if (user) {
        if(window.location.pathname==="/auth")
        {
          navigate("/");
        }
        navigate(window.location.pathname);
 
      }
      else if(window.location.pathname==="/auth")
      {
        navigate("/auth")
      }
      else if(myArray[1]==="Intro" || myArray[1]==="Test" || myArray[1]==="End"  ){
        navigate(window.location.pathname);
       // alert(myArray[1])
      } 
      else {
        navigate("/auth");
      }
    })
    //eslint-disable-next-line
   }, []);

 
  return (
    
      <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>} />
         <Route path='/auth' element={<MainAuth/>} />
         <Route path='/' element={<App/>}
          />
            <Route path='/Name' element={<Name/>}/>
            <Route path='/Create/:docrefId' element={<Create/>}
          />
          <Route path='/Show' element={<Showassessment/>}
          />
          <Route path='/ShowQuestions/:docrefId' element={<ShowQuestions/>}
          />
          <Route path='/Intro/:docrefId' element={<Intro/>}
          />
          <Route path='/Test/:docrefId/:docrefId' element={<Test/>}
          />
          <Route path='/End' element={<End/>}
          />
          <Route path='/Submitted' element={<Submitlist/>}
          />
          <Route path='/SubmitStudent/:docrefId' element={<Submitstudents/>}/>
          <Route path='/Submittedquestions/:decrefId/:docrefId' element={<Submitquestion/>}
          />
          
      </Routes>
  )
}
ReactDOM.render(
 
  <React.StrictMode>
    <Router>
    <Index/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();