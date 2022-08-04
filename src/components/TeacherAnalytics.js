import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import axios from '../axios'
import "../css/TeacherAnalytics.css"
import '../components/StudentInfo'

const TeacherAnalytics = () => {

    let [students,setStudents]=useState([{}]);
    let [name,setName]=useState("");
    let [username,setUsername]=useState("");
    let [email,setEmail]=useState("");

    const[sBadges,setSBadges]=useState("");

    const getStudents = async ()=>{
        let headersList = {
            "Accept": "*/*",
           }
           
           let reqOptions = {
             url: "/students",
             method: "GET",
             headers: headersList,
           }
           
           let response = await axios.request(reqOptions);
           if(response){
            console.log(response.data);
            setStudents(students=response.data);
           }
          
    }

    useEffect(()=>{
        getStudents();
    },[])



     function studentInfo(e){
        console.log(e)
        console.log(e.target.innerText);
        let id = e.target.innerText;
        students?.map((student)=>{
            if(student._id===id){
                 setName(name=student.fullname);
                 setEmail(email=student.email);
                 setUsername(username=student._id);
                //  console.log(name);
                }
             })       
        
    }



  return (
    <>
    <Navbar user="Teacher"/>
    <div className="teacher-analytics">
      <div className="student-list">
        {
            students && students.map((student)=>{
                return <div onClick={studentInfo} key={student._id} className="studentListItem">
                            <div className="Avatar"></div>
                            <div className="studentName">
                                <p>{student._id}</p>
                            </div>
                       </div>
            })
        }

      </div>
      <div className="student-analysis">Student-Analysis</div>
      <div className="student-panel">
       { 
                <div className="infoContainer">
                <p>{name}</p>
                <p>{email}</p>
                <p>{username}</p>
    </div>

       } 
      </div>
    </div>
    </>
  );
};

export default TeacherAnalytics;
