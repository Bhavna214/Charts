import React from 'react'
import Fire from '../Assets/Fire.mp4';
import { Link} from "react-router-dom";
import '../css/Teacherhome.css'

const Title = () => {
  return (
    <div style={{overflow: "hidden", maxHeight:"100vh"}}>
      <video autoPlay loop muted style={{width: "100%", height: "100%", objectFit: "cover", zindex: "-1", overflow:"hidden"}}>
        <source src={Fire} type="video/mp4"></source>
      </video>
      <div className='title-text'>
      <h1>The Ivory Flame</h1>
      <Link to="/login">
        <button type="button">
          Start
        </button>
      </Link>
      <Link to="/">
        <button type="button" style={{fontSize:"1rem", width:"100%", marginTop:"1rem", letterSpacing:"0"}}>
          <a>Download Now</a>
        </button>
      </Link>
      </div>
    </div>
  )
}

export default Title
