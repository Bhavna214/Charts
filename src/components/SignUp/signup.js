import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import axios from "../../axios";
import {Link } from "react-router-dom"
import {useNavigate} from "react-router-dom";

const Signup = () => {
	let navigate = useNavigate();
	const [data, setData] = useState({
		fullname: "",
		username: "",
		email: "",
		password: ""
	});
	const [sub,setSub] = useState("");
	const [error, setError] = useState("");
	const [userRole,setUserRole]=useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const setSubject = (e) =>{
		setSub(e.target.value);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(userRole==="Student"){
			console.log(data);
			try {
				let headersList = {
					Accept: "*/*",
					"Content-Type": "application/json",
				  };
				let bodyContent = JSON.stringify(data);
				let reqOptions = {
					url: "/students/register",
					method: "POST",
					headers: headersList,
					data: bodyContent,
				  };
				  let response = await axios.request(reqOptions);
				console.log(response);

				if(response){
					console.log(response.data);
					navigate("/", { replace: true });
				  }

				// navigate("/login");
				
			} catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}

		}else{
			
			try{
				let headersList = {
					Accept: "*/*",
					"Content-Type": "application/json",
				  };
				let reqBody = data;
				reqBody.subject =sub;
				console.log(reqBody)
				let bodyContent = JSON.stringify(reqBody);
				console.log(bodyContent)
				let reqOptions = {
					url: "/teachers/register",
					method: "POST",
					headers: headersList,
					data: bodyContent,
				  };

				  let response = await axios.request(reqOptions);
				  console.log(response);
  
				  if(response){
					  console.log(response.data);
					  navigate("/", { replace: true });
					}
			}catch (error) {
				if (
					error.response &&
					error.response.status >= 400 &&
					error.response.status <= 500
				) {
					setError(error.response.data.message);
				}
			}

		}


		
	};


	useEffect(()=>{
		let userRole = localStorage.getItem("userRole");
		console.log(userRole);
		setUserRole(userRole);
	},[])

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Already have an account?</h1>
					<Link to="/">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Full Name"
							name="fullname"
							onChange={handleChange}
							value={data.fullname}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Username"
							name="username"
							onChange={handleChange}
							value={data.username}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
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

						{userRole === "Teacher" && 
						<input
							type="Text"
							placeholder="Subject"
							name="sub"
							onChange={setSubject}
							value={sub}
							required
							className={styles.input}
						/>
						
						
						}


						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;
