import "./Style.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({onLogin}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin();
        console.log(
            email,
            password
        );
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