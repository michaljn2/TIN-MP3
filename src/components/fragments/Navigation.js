import React from "react";
import {Link} from "react-router-dom";

function Navigation() {
    return(
        <nav>
            <ul>
                <li><Link to="/">Strona główna</Link></li>
                <li><Link to="/students">Studenci</Link></li>
                <li><Link to="/groups">Grupy</Link></li>
                <li><Link to="/studies">Przynależności</Link></li>
            </ul>
        </nav>
    )
}

export default Navigation