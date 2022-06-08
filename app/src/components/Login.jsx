import { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';
import { Button } from 'react-bootstrap';
import useAxios from '../utils/UseAxios';
import { useNavigate } from 'react-router-dom';



const Login = (props) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   // const { loginUser } = useContext(AuthContext);
   const navigate = useNavigate();


   const onChangeEmail = (e) => {
      const email = e.target.value;
      setUsername(email);
   }
   const onChangePassword = (e) => {
      const password = e.target.value;
      setPassword(password);
   }

   // const handleSubmit = (e) => {
   //    e.preventDefault();
   //    useAxios.post('/token/', {
   //       username: username,
   //       password: password
   //    }).then((result) => {
   //       if (response === 200) {
   //          useAxios.defaults.headers['Authorization'] = "JWT " + result.data.access;
   //          localStorage.setItem('access_token', result.data.access);
   //          localStorage.setItem('refresh_token', result.data.refresh);

   //          history.push("/");
   //       } else {
   //          alert("Something went wrong!");
   //       }
   //    }).catch((error) => {
   //       throw error
   //    })

   //    // loginUser(username, password);
   // }
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await useAxios.post('/token/', {
            username: username,
            password: password
         });
         if (response.status === 200) {
            useAxios.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            navigate("/");
            return response;
         } else {
            alert("Something went wrong");
         }
         
      } catch (error) {
         throw error;
      }
   }

   return (
      <>
         <div className="login-form">
            <h3 className="h3 mb-3 font-weight-normal"><b>Sign in</b></h3>

            <form className="form-signin" onSubmit={handleSubmit} >
               <input
                  type="text"
                  id="inputEmail"
                  className="form-control"
                  placeholder="Username"
                  required=""
                  autoFocus=""
                  value={username}
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

               <Button className='button' variant="outline-success" type="submit"><b>Login</b></Button>
               <div className="forgot">
                  <p className="after"><b>Forgot password?</b></p>
                  <hr />
                  <p className='link'><b>
                     New user?
                     <Link to="/register">
                        <i className="fas fa-user-plus" /> Sign up
                     </Link></b>
                  </p>
               </div>

            </form>
         </div>
      </>
   );
}

export default Login;