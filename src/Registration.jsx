import "./Style.css";
import { useState } from "react";
import { Link} from "react-router-dom";
import { Snackbar } from "@mui/material";

function Registration({onLogin}) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [snackbarOpen,setSnackbarOpen]=useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password!==confirmPassword){
            setSnackbarOpen(true);
            return;
        }
        onLogin();
        console.log(
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        );
    };

    return (

        <div className="signup-box">
            <h2>Sign Up</h2>
            <p>It's free and only takes a minute</p>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>First Name</label>
                    <input type="text" id="first-name" value={firstName} onChange={(e) =>
                        setFirstName(e.target.value)
                    } required />
                </div>
                <div className="input-group">
                    <label>Last Name</label>
                    <input type="text" id="last-name" value={lastName} onChange={(e) =>
                        setLastName(e.target.value)
                    } required />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" id="email" value={email} onChange={(e) =>
                        setEmail(e.target.value)
                    } required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="input-group">
                    <label>Confirm Password</label>
                    <input type="password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <button type="submit" value="Submit">Sign Up</button>

                <p className="terms">
                    By clicking the Sign Up button, you agree to our
                    <a href="#"> Terms and Condition</a> and
                    <a href="#"> Policy Privacy</a>
                </p>

                <p className="login-link">
                    Already have an account? <Link to="/login">Login Here</Link>
                </p>
            </form>

            <Snackbar
                open={snackbarOpen}
                message="Passwords do not match!"
                autoHideDuration={1500}
                onClose={()=>setSnackbarOpen(false)}
                anchorOrigin={{vertical:"bottom",horizontal:"left"}}>
            </Snackbar>
        </div>
    );
}

export default Registration;