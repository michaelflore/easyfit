import React, {Fragment, useState} from "react";
import Button from "@material-ui/core/Button";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";

const Home = () => {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const history = useHistory();

    async function handleLogout() {
        try {
            await logout();
            history.push("/login");
        }
        catch {
            setError('Failed');
        }
    }
    return (
        <Fragment>
            <div>
                <h1>Home Page</h1>
                <p>Email: {currentUser.email} </p>
                <Button onClick={handleLogout}>Log Out</Button>
            </div>
        </Fragment>
    );
};

export default Home;