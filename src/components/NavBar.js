import { useState } from "react"
import '../css/navbar.css'

export default function Navbar({user}) {
  const [isNavExpanded, setIsNavExpanded] = useState(false)

  function showNotes(){
    document.getElementById("notes").style.display="block";
  }

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        BUG SQUASHERS
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded)
        }}
      >
        {/* hamburger svg code... */
        <svg viewBox="0 0 100 80" width="25" height="25">
        <rect width="100" height="20"></rect>
        <rect y="30" width="100" height="20"></rect>
        <rect y="60" width="100" height="20"></rect>
      </svg>
      }
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >{
        user==='Teacher'?(
        <ul>
          <li>
            <a href="/teacher/home">Dashboard</a>
          </li>
          <li>
            <a href="/teacher/analytics">Analysis</a>
          </li>
          <li>
            <a onClick={showNotes}>Notes</a>
          </li>
          <li>
            <a href="/"  onClick={()=>{sessionStorage.removeItem("Teacher Data")}}>Logout</a>
          </li>
        </ul>):
        (
          <ul>
            <li>
            <a href="/student/download">Download</a>
          </li>
          <li>
            <a href="/student/home">Dashboard</a>
          </li>
          <li>
            <a href="/student/helproom">Help Room</a>
          </li>
          {/* <li>
            <a href="/student/teams">My Teams</a>
          </li> */}
          <li>
            <a href="/">Logout</a>
          </li>
        </ul>
        )
      }
        
      </div>
    </nav>
  );
}