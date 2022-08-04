import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import axios from '../axios'
import "../css/TeacherAnalytics.css"


const TeacherAnalytics = () => {

    let [students,setStudents]=useState([{}]);

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



  return (
    <>
    <Navbar user="Teacher"/>
    <div className="teacher-analytics">
      <div className="student-list">
        {
            students && students.map((student)=>{
                return <div  className="studentListItem">
                            <div className="Avatar"></div>
                            <div className="studentName">
                                <p>{student.fullname}</p>
                            </div>
                       </div>
            })
        }

      </div>
      <div className="student-analysis">Student-Analysis</div>
      <div className="student-panel">Student-Panel</div>
    </div>
    </>
  );
};

export default TeacherAnalytics;
