import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import "./validator.css";
import { Link} from "react-router-dom";
import image from "./image.png";
import axios from '../../axios';
import {useNavigate} from "react-router-dom";


const Login = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({password: "",username: ""});
  const [whoIsEntering, setWhoIsEntering] = useState("");
  let cont;
  const [error, setError] = useState("");
//   const [username, setUserName] = useState("");
//   const [password, setPassword] = useState("");
  const handleChange = ({ currentTarget: input }) => {
  	setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (whoIsEntering === "student") {
      // student login api
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify(data);

      let reqOptions = {
        url: "/students/login",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
      if(response){
        console.log(response.data);
        sessionStorage.setItem("Student Data", JSON.stringify(response.data));
        navigate("/student/home", { replace: true });
        }
	
    

    } else {
      // teacher login api
	  let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify(data);

      let reqOptions = {
        url: "/teachers/login",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };

      let response = await axios.request(reqOptions);
	  if(response){
		console.log(response.data);
		sessionStorage.setItem("Teacher Data", JSON.stringify(response.data));
		navigate("/teacher/home", { replace: true });
	  }

    }
  };

  function enterStudent() {
    document.querySelector(".validator__container").style.display = "none";
    setWhoIsEntering("student");
    localStorage.setItem("userRole","Student")
    document.querySelector(".login__container").style.display = "grid";
  }

  function enterTeacher() {
    document.querySelector(".validator__container").style.display = "none";
    setWhoIsEntering("teacher");
    localStorage.setItem("userRole","Teacher")
    document.querySelector(".login__container").style.display = "grid";
  }

  return (
    <>
      <div className="validator__container">
        <div className="container">
          <div className="headingContainerInitial">
            <h2>Welcome To Bug Squashers</h2>
            <img src={image} alt="" />
          </div>

          <div className="buttonContainer">
            <button onClick={enterStudent}>Enter as student</button>
            <button onClick={enterTeacher}>Enter as teacher</button>
          </div>
        </div>
      </div>
      {console.log(whoIsEntering)}
      <div className={`${styles.login_container} login__container`}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1>Login to Your Account</h1>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              {error && <div className={styles.error_msg}>{error}</div>}
              <button type="submit" className={styles.green_btn}>
                Sign In
              </button>
            </form>
          </div>
          <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
