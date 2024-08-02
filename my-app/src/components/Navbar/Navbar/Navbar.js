import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { 
    handleSearchChange, 
    handleSearchSubmit, 
    toggleDropdown, 
    handleCategoryClick 
} from '../../../utils/navbarUtils';

import SearchForm from '../SearchForm/SearchForm';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

import './Navbar.css';

const Navbar = ({ categories, onCategorySelect, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const initialSearch = searchParams.get('search') || '';
        setSearchTerm(initialSearch);
    }, [searchParams]);

    useEffect(() => {
        const category = searchParams.get('category');
        if (category) {
            onCategorySelect(category);
        }
    }, [searchParams, onCategorySelect]);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">Meal App</Link>
            <SearchForm
                searchTerm={searchTerm}
                onSearchChange={(e) => handleSearchChange(e, setSearchTerm)}
                onSearchSubmit={(e) => handleSearchSubmit(e, searchTerm, setSearchParams, onSearch, setSearchTerm)}
            />
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">Ulubione</Link>
                </li>
                <DropdownMenu
                    categories={categories}
                    onCategoryClick={(category) => handleCategoryClick(category, setSearchParams, onCategorySelect, setIsDropdownOpen)}
                    isDropdownOpen={isDropdownOpen}
                    toggleDropdown={() => toggleDropdown(setIsDropdownOpen)}
                />
            </ul>
        </nav>
    );
};

export default Navbar;