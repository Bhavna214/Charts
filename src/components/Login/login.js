import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import './validator.css'
import axios from "axios";
import {Link, Route, Router } from "react-router-dom"
import image from './image.png'


const Login = () => {
	// const [data, setData] = useState({password: "",username: ""});

	const [whoIsEntering,setWhoIsEntering]=useState("")
	let cont;
	const [error, setError] = useState("");
	const[username,setUserName]=useState("");
	const[password,setPassword]=useState("");
	// const handleChange = ({ currentTarget: input }) => {
	// 	setData({ ...data, [input.name]: input.value });
	// };

	const handleSubmit = async (e) => {

		e.preventDefault();


		const url = "http://localhost:3031/students/login";
			const options = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json;charset=UTF-8",
				},
				body: JSON.stringify({
					username: username,
					password: password
				}),
				};
				fetch(url, options)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				});

		// const url = 'http://localhost:3031/teachers/login'
		// 	const data = {
		// 		username: username,
		// 		password: password
		// 	};
		// 	axios
		// 	.get(url, data, {
		// 		headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json;charset=UTF-8",
		// 		},
		// 	})
		// 	.then(({data}) => {
		// 		console.log(data);
		// 	});

		// try {
		// 	console.log(typeof(username) +" " + typeof(password));
		// 	console.log(username +" " + password);

		// 	const response = await axios({
		// 		method: "GET",
		// 		url: "http://localhost:3031/students/login",
		// 		headers:{
		// 			"Content-Type": "application/json"
		// 		},
		// 		data: {
		// 			username: username,
		// 			password: password
		// 		},
		// 	  }).catch((e) => console.log(e));
		// 		  console.log(response);
		// 	// const url = "http://localhost:3031/teachers/login";
		// 	// const { data: res } = await axios.get(url, JSON.stringify(data), {
		// 	// 	headers: { "Content-Type": "application/json" },
		// 	//   },{validateStatus:false});
		// 	// console.log(res);
		// 	// localStorage.setItem("token", res.data);
		// 	// window.location = "/";
		// } catch (error) {
		// 	if (
		// 		error.response &&
		// 		error.response.status >= 400 &&
		// 		error.response.status <= 500
		// 	) {
		// 		setError(error.response.data.message);
		// 	}
		// }
	};


function enterStudent(){
	document.querySelector('.validator__container').style.display="none"
	setWhoIsEntering("student")
	document.querySelector('.login__container').style.display="grid"
	
}	

function enterTeacher(){
	document.querySelector('.validator__container').style.display="none"
	setWhoIsEntering("teacher")
	document.querySelector('.login__container').style.display="grid"
}

	




	return (
		<>		
		<div className='validator__container'> 
		  <div className="container">
			  <div className="headingContainer">
				  <h2>Welcome To Bug Squashers</h2>
				  <img src={image} alt="" />
			  </div>
  
			  <div className="buttonContainer">
					  <button onClick={enterStudent} >Enter as student</button>
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
							onChange={function(e){
								setUserName(e.target.value);
							}}
							value={username}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={function(e){
								setPassword(e.target.value);
							}}
							value={password}
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


