import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = ({ categories, onCategorySelect, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Moje Przepisy</Link>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Wyszukaj danie..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="search-button">
                    Szukaj
                </button>
            </div>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">Ulubione</Link>
                </li>
                <li className="nav-item navbar-dropdown">
                    <span className="nav-link">Kategorie</span>
                    <div className="dropdown-menu">
                        {categories.map(category => (
                            <Link
                                key={category}
                                to={`/${category}`}
                                className="dropdown-item"
                                onClick={() => onCategorySelect(category)}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
