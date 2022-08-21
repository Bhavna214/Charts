import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import scene1 from '../Assets/scene1.png'
import scene2 from '../Assets/scene2.png'
import scene3 from '../Assets/scene3.png'
import Navbar from './NavBar';
import '../css/download.css';

const Download = () => {
  return (
    <>
    <Navbar/>
    <Carousel className='download' style={{maxHeight: "90vh"}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={scene2}
          alt="First slide"
        />
        <Carousel.Caption className='caption'>
          <h3>Fun-based learning</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={scene1}
          alt="Second slide"
        />

        <Carousel.Caption className='caption'>
          <h3>Dynamic Difficulty</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={scene3}
          alt="Third slide"
        />

        <Carousel.Caption className='caption'>
          <h3>Download Now</h3>
          <a href='/student/download'>
            Download
          </a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default Download