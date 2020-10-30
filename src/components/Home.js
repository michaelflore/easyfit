import React, {Fragment, useState} from "react";
import NavBar from "./NavBar";
import Header from "./Header";

const Home = () => {

    return (
        <Fragment>
            <Header title="Home" />
            <NavBar />
        </Fragment>
    );
};

export default Home;