import React, { useRef } from "react";
import { FormGroup, FormLabel, FormControl, Card, InputLabel, Input, Button } from "@material-ui/core";
import {Link} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

const SignUp = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signup } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            alert('Failed, make sure password is strong.');
        }
    }

    return (
        <React.Fragment>
            <Card>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" ref={emailRef}/>
                    <input type="password" ref={passwordRef}/>
                    <Button type="submit">
                        Sign Up
                    </Button>
                </form>
                <div>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </Card>
        </React.Fragment>
    );
};

export default SignUp;