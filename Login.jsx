import "./Style.css";
import { React, useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(
            email,
            password
        );
        navigate("/thankyou");
    };

    return (

        <div className="login-box">
            <h2>Login</h2>

            <form>
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

                <button type="submit" value="Submit" onClick={(e) => handleSubmit(e)}>Submit</button>

                <p>Don't have an account? <Link to="/signup">Sign Up Here</Link></p>
            </form>
        </div>
    );
}

export default Login;