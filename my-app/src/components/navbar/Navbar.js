import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { handleSearchSubmit, handleCategoryClick } from '../../utils/navbarUtils';

import './Navbar.css';

const Navbar = ({ categories, onCategorySelect, onSearch, onMealAppClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => setSearchTerm(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchSubmit(searchTerm, navigate, onSearch);
    };

    const handleCategoryClickWrapper = (category) => {
        handleCategoryClick(category, navigate, onCategorySelect);
        setIsDropdownOpen(false);
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={onMealAppClick}>Meal App</Link>
            <form className="search-container" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Wyszukaj danie lub składnik..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button type="submit" className="search-button">
                    Szukaj
                </button>
            </form>
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">Ulubione</Link>
                </li>
                <li className="nav-item navbar-dropdown">
                    <button 
                        className="nav-link dropdown-toggle" 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                    >
                        Kategorie
                    </button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className="dropdown-item"
                                    onClick={() => handleCategoryClickWrapper(category)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCategoryClickWrapper(category);
                                        }
                                    }}
                                    tabIndex={0}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;