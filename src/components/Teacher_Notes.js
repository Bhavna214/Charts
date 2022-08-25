import React from 'react'
import '../css/Teacher-notes.css'
import CancelIcon from '@mui/icons-material/Cancel';
import diksha from '../Assets/diksha.jpeg'
import AddIcon from '@mui/icons-material/Add';

const Teacher_Notes = () => {

    function closeNotes(){
        document.getElementById("notes").style.display="none";
    }
  return (
    <div className='teacher-notes' id="notes">
        <div className='heading'>
        <h1>My Notes</h1>
        <CancelIcon onClick={closeNotes} style={{position: "absolute", right: "-10px", fontSize: "2rem", top: "-10px", color: "#BF7B35"}}/>
        </div>
        <div className='notes'>
            <div className='note-item'>
                <img src={diksha}></img>
                <div className='note-content'>
                    <h4>Computer Science</h4>
                    <a href="www.google.com">www.google.com</a>
                </div>
            </div>
            <div className='note-item'>
                <img src={diksha}></img>
                <div className='note-content'>
                    <h4>Computer Science</h4>
                    <a href="www.google.com">www.google.com</a>
                </div>
            </div>
            <div className='note-item'>
                <img src={diksha}></img>
                <div className='note-content'>
                    <h4>Computer Science</h4>
                    <a href="www.google.com">www.google.com</a>
                </div>
            </div>
            <div className='note-item'>
                <img src={diksha}></img>
                <div className='note-content'>
                    <h4>Computer Science</h4>
                    <a href="www.google.com">www.google.com</a>
                </div>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center", padding: "1rem"}}>
            <AddIcon style={{ fontSize: "2rem", color: "#BF7B35", backgroundColor: "#401e07"}}/>
            </div>
        </div>
    </div>
  )
}

export default Teacher_Notes