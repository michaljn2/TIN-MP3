import React from "react";

function Header(){
    return(
        <header>
            <h1>PJATK Students</h1>
            <img src={process.env.PUBLIC_URL + '/img/pjatk-logo.jpg'} alt="PJATK Logo"/>
        </header>
    )
}

export default Header