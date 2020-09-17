import React from 'react';
import { NavLink  } from 'react-router-dom';

import '../App.css';

function Navbar() {
    return (
        <nav>
            <h2>SpaceX</h2>
            <ul>
                <li>
                    <NavLink 
                        to="/" 
                        exact
                        activeClassName="activeNavBar" >
                            History
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        to="/payloads"
                        activeClassName="activeNavBar">
                            Payloads
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar