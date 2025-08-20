import "./Style.css";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login({setLoggedIn}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        localStorage.setItem("isLoggedIn","true");
        setLoggedIn(true);
        e.preventDefault();
        console.log(
            email,
            password
        );
        navigate("/");
    };

    return (

        <div className="login-box">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" id="email" value={email} onChange={(e) =>
                        setEmail(e.target.value)
                    } required />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" id="password" value={password} onChange={(e) =>
                            setPassword(e.target.value)
                        } required />
                </div>

                <button type="submit" value="Submit">Submit</button>

                <p>Don't have an account? <br/><Link to="/signup">Sign Up Here</Link></p>
            </form>
            
        </div>
    );
}

export default Login;