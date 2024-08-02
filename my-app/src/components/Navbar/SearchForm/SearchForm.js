import React from 'react';

import PropTypes from 'prop-types';

import './SearchForm.css';

const SearchForm = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
    return (
        <form className="search-container" onSubmit={onSearchSubmit}>
            <input
                type="text"
                placeholder="Wyszukaj danie lub składnik..."
                value={searchTerm}
                onChange={onSearchChange}
                className="search-input"
            />
            <button type="submit" className="search-button">Szukaj</button>
        </form>
    );
};

SearchForm.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    onSearchSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
