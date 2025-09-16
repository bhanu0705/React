import "./Style.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Snackbar } from "@mui/material";

const Login = ({onLogin}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen,setSnackbarOpen]=useState(false);
    const [snackMessage, setSnackMessage]=useState();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:8080/login",{email:email,password:password}).then(res => {
                console.log(res.data);
                if(res.data === "Login successful"){
                  onLogin();
                }
              })
        }catch(error){
            if(error.response && error.response.status === 401){
                setSnackMessage("Invalid Email or Password");
                setSnackbarOpen(true);
                return;
            }else{
               console.error("Unexpected error: ",error);
            }
        }
       

    };

    return (

        <div className="login-box">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) =>
                        setEmail(e.target.value)
                    } required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={(e) =>
                            setPassword(e.target.value)
                        } required />
                </div>

                <button type="submit" value="Submit">Login</button>

                <p>Don't have an account? <br/><Link to="/signup">Sign Up Here</Link></p>
            </form>
            
            <Snackbar
                open={snackbarOpen}
                message={snackMessage}
                autoHideDuration={1500}
                onClose={()=>setSnackbarOpen(false)}
                anchorOrigin={{vertical:"bottom",horizontal:"left"}}>
            </Snackbar>

        </div>
    );
}

export default Login;