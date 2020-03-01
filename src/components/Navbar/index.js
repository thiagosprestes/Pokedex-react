import React from 'react';

import { Link } from 'react-router-dom';

import './style.css';

function Navbar() {
    return (
        <div className="container">
            <Link to="/">
                <strong>Pokedex</strong>
            </Link>
        </div>
    )
}

export default Navbar;