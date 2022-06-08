import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./login.css";
import { Button } from 'react-bootstrap';
import useAxios from '../utils/UseAxios'
// import AuthContext from "../context/AuthContext";
// import { centercode } from 'fontawesome';
import { useNavigate } from 'react-router-dom';

const styles = {
	color: 'red',
	textAlign: 'center'
}
const style = {
	textAlign: 'center'
}
const SignUp = (props) => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password1, setPassword1] = useState("");

	const navigate = useNavigate();

	// const { registerUser } = useContext(AuthContext);

	const onChangeUsername = (e) => {
		const username = e.target.value;
		setUsername(username);
	};
	const onChangeEmail = (e) => {
		const email = e.target.value;
		setEmail(email);
	};
	const onChangePassword = (e) => {
		const password = e.target.value;
		setPassword(password);
	};
	const onChangePassword1 = (e) => {
		const password1 = e.target.value;
		setPassword1(password1);
	};
	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	const username = e.target.value;
	// 	const email = e.target.value;
   //    const password = e.target.value;
	// 	registerUser(username, email, password)
	// }
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await useAxios.post('/register/', {
				username: username,
				email: email,
   	   	password: password
			});
			navigate("/login");
			return response;
		} catch(error) {
			console.log(error)
		}
	}
	return (
		<>
			<div className="login-form" style={style}>
				<h3 className="h3 mb-3 font-weight-normal"><b>Register</b></h3>
				<form className="form-signin" onSubmit={handleSubmit}>
					<input
						type="text"
						id="inputUsername"
						className="form-control"
						placeholder="Username"
						value={username}
						required=""
						onChange={onChangeUsername}
					/>
					<input
						type="email"
						id="inputEmail"
						className="form-control"
						placeholder="Email address"
						required=""
						value={email}
						onChange={onChangeEmail}
					/>
					<input
						type="password"
						id="inputPassword"
						className="form-control"
						placeholder="Password"
						required=""
						value={password}
						onChange={onChangePassword}
					/>
					<input
						type="password"
						id="inputConfirmPassword"
						className="form-control"
						placeholder="Confirm Password"
						required=""
						value={password1}
						onChange={onChangePassword1}
					/>
					<p><b><small style={styles} >{password1 !== password ? "Passwords do not match" : ""}</small></b></p>
					<Button className='button' variant="outline-success" type="submit"><b>Sign Up</b></Button>

					<hr />
					<div className="forgot">
						<p className='link'>
							Already have Account?
							<Link to="/login">
								<i className="fas fa-user-plus" /><b>Log in</b>
							</Link>
						</p>
					</div>
				</form>
			</div>

		</>
	);
}

export default SignUp;