import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ categories, onCategorySelect, onSearch, onMyRecipesClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            navigate(`/?search=${encodeURIComponent(searchTerm)}`);
            onSearch(searchTerm.trim()); 
        } else {
            navigate('/');
        }
        setSearchTerm(''); 
    };

    const handleMyRecipesClick = () => {
        navigate('/');
        onMyRecipesClick(); 
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryClick = (category) => {
        navigate(`/${category}`); 
        onCategorySelect(category);
        setIsDropdownOpen(false); 
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={handleMyRecipesClick}>Meal App</Link>
            <form className="search-container" onSubmit={handleSearchSubmit}>
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
                        onClick={toggleDropdown}
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
                                    onClick={() => handleCategoryClick(category)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleCategoryClick(category);
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
