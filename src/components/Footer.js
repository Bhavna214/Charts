import React from 'react'
import '../css/Footer.css'
import MOElogo from '../Assets/MOElogo.png'
import All_India_Council_for_Technical_Education_logo from '../Assets/All_India_Council_for_Technical_Education_logo.png'
import Azadi from '../Assets/Azadi.png'
const Footer = () => {
  return (
    <div>
    <footer class="site-footer">
      <div class="container footer">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">We are BugSquaers1, We are from Mumbai. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem velit saepe magnam enim blanditiis non quam facilis ut accusamus ipsam voluptas corrupti deleniti, similique reprehenderit distinctio expedita sapiente architecto quo!</p>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Features</h6>
            <ul class="footer-links">
              <li><a href="http://scanfcode.com/category/c-language/">Drag and Drop Mecanics</a></li>
              <li><a href="http://scanfcode.com/category/front-end-development/">Dynamic Difficulty Adjustment</a></li>
              <li><a href="http://scanfcode.com/category/back-end-development/">Stepwise Error Feedback</a></li>
              <li><a href="http://scanfcode.com/category/java-programming-language/">Practical 3D Scenarios</a></li>
              <li><a href="http://scanfcode.com/category/android/">Storyline</a></li>
              <li><a href="http://scanfcode.com/category/templates/">Peer Based Learning</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="https://cqube.sunbird.org/" target="_blank">Sunbird cQube</a></li>
              <li><a href="https://diksha.gov.in/" target="_blank">Diksha Dial Framework</a></li>
              <li><a href="https://www.ndear.gov.in/" target="_blank">NDEAR</a></li>
              <li><a href="https://diksha.gov.in/" target="_blank">Diksha content framework</a></li>
              <li><a href="https://www.ndear.gov.in/" target="_blank">NCERT Content</a></li>
              <li><a href="https://vikaspedia.in/news/nipun-bharat-programme-launched" target="_blank">Nipun Bharat</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container footer" style= {{marginTop:'1rem'}}>
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by 
         <a href="https://www.sih.gov.in/">SIH'22</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="https://www.education.gov.in/en" target="_blank"><img src={MOElogo} style={{top:0, left:0, right:0, bottom:0, margin:"auto"}}></img></a></li>
              <li><a class="twitter" href="https://www.aicte-india.org/" target="_blank"><img src={All_India_Council_for_Technical_Education_logo} style={{top:0, left:0, right:0, bottom:0, margin:"auto"}}></img></a></li>
              <li><a class="dribbble" href="https://amritmahotsav.nic.in/" target="_blank"><img src={Azadi} style={{top:0, left:0, right:0, bottom:0, margin:"auto"}}></img></a></li>   
            </ul>
          </div>
        </div>
      </div>
</footer>
    </div>
  )
}

export default Footer
