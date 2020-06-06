import React from 'react';

import { Link } from 'react-router-dom';

import './style.css';

export default function Navbar() {
    return (
        <div className="container">
            <Link to="/">
                <strong>Pokedex</strong>
            </Link>
        </div>
    );
}
