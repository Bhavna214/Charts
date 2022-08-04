import React from 'react'
import Navbar from './NavBar';
import "../css/Teacherhome.css"

const Teacherhome = () => {

    let  [tData,setTData] = React.useState(null);

    React.useEffect( ()=>{
        let data =JSON.parse(sessionStorage.getItem("Teacher Data"))
        if(data){
            setTData(tData=data);
            console.log(tData);
        }
    },[])


  return (
    <div style={{color:"white"}}>
        
        <Navbar user="Teacher"></Navbar>

        <div className="teacher-main">
            <div className="leftSidebar">
                    <h1>left side bar</h1>
            </div>
            <div className="rightSideBar">
                    <h1>right side bar </h1>
            </div>
        </div>
       
    </div>
  )
}

export default Teacherhome
