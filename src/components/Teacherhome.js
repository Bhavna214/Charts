import React from 'react'
import Navbar from './NavBar';
import "../css/Teacherhome.css"
import axios from '../axios'
import { useEffect, useState } from 'react';

const Teacherhome = () => {

  let [tData, setTData] = React.useState({});
  let [students, setStudents] = useState([{}]);

  React.useEffect(() => {
    let data = JSON.parse(sessionStorage.getItem("Teacher Data"))
    if (data) {
      setTData(tData = data);
      console.log(tData);
    }
  }, [])

  const getStudents = async () => {
    let headersList = {
      "Accept": "*/*",
    }

    let reqOptions = {
      url: "/students",
      method: "GET",
      headers: headersList,
    }

    let response = await axios.request(reqOptions);
    if (response) {
      console.log(response.data);
      setStudents(students = response.data);
    }

  }

  useEffect(() => {
    getStudents();
  }, [])

  const GoldStudent = () => {
    let goldArray = []
    let silverArray = []
    let bronzeArray = []
    // console.log(e)
    students?.map((student) => {
      student?.level?.map((obj, index) => {
        if (obj.badges === "gold") {
          goldArray.push(student.fullname)
        }
        if (obj.badges === "bronze") {
          bronzeArray.push(student.fullname)
        }
        if (obj.badges === "silver") {
          silverArray.push(student.fullname)
        }
      })
    })
    console.log(goldArray)
    console.log(silverArray)
    console.log(bronzeArray)
  }

  useEffect(() => {
    GoldStudent();
  }, [])

  let puzzleList=[]
  
  return (
    <div>

      <Navbar user="Teacher"></Navbar>

      <div className="teacher-main">
        <div className="leftSideBar" style={{ color: "white" }}>
          <div className='puzzleList'>
            {
              students[0]?.level?.map((obj,index)=>{
                puzzleList.push(`P${index+1}`)
                console.log(puzzleList)

                // return(
                //   <div>
                //     {`P${index+1}`}
                //   </div>
                // )
              })
            }
          </div>
        </div>
        <div className="rightSideBar">
          <h4>MY PROFILE</h4>
          <table>
            <tr>
              <td className='bold'>Name:</td>
              <td className='data'>{tData.fullname}</td>
            </tr>
            <tr>
              <td className='bold'>Username:</td>
              <td className='data'>{tData._id}</td>
            </tr>
            <tr>
              <td className='bold'>Email:</td>
              <td className='data'>{tData.email}</td>
            </tr>
            <tr>
              <td className='bold'>Subject:</td>
              <td className='data'>{tData.subject}</td>
            </tr>
          </table>
        </div>
      </div>

    </div>
  )
}

export default Teacherhome
