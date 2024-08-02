import React from 'react';

import PropTypes from 'prop-types';

import './DropdownMenu.css';

const DropdownMenu = ({ categories, onCategoryClick, isDropdownOpen, toggleDropdown }) => {
    return (
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
                            onClick={() => onCategoryClick(category)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onCategoryClick(category);
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
    );
};
// doczytaćpropTypes jak działa i co robi
DropdownMenu.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCategoryClick: PropTypes.func.isRequired,
    isDropdownOpen: PropTypes.bool.isRequired,
    toggleDropdown: PropTypes.func.isRequired,
};

export default DropdownMenu;
