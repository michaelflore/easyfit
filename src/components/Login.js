import React, { useRef } from "react";
import { FormGroup, FormLabel, FormControl, Card, InputLabel, Input, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/");
        } catch {
            alert('Failed to login');
        }
    }

    return (
        <React.Fragment>
            <Card>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" ref={emailRef}/>
                    <input type="password" ref={passwordRef}/>
                    <Button type="submit">
                        Login
                    </Button>
                </form>
                <div>
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default Login;