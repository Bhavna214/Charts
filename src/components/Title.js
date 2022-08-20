import React from 'react'
import Fire from '../Assets/Fire.mp4';
import { Link} from "react-router-dom";
import Login from './Login/Login';
import '../css/Teacherhome.css'

const Title = () => {
  return (
    <div>
      <video autoPlay loop muted style={{position: "absolute",width: "100%", height: "100%", objectFit: "cover",}}>
        <source src={Fire} type="video/mp4"></source>
      </video>
      <div className='title-text'>
      <h1>The Ivory Flame</h1>
      <Link to="/login">
        <button type="button">
          START
        </button>
      </Link>
      </div>
    </div>
  )
}

export default Title
