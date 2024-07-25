export const handleSearchChange = (e, setSearchTerm) => {
    setSearchTerm(e.target.value);
};

export const handleSearchSubmit = (e, searchTerm, setSearchParams, onSearch, setSearchTerm) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
        setSearchParams({ search: searchTerm });
        onSearch(searchTerm.trim());
    }
    setSearchTerm('');
};

export const toggleDropdown = (setIsDropdownOpen) => {
    setIsDropdownOpen(prevState => !prevState);
};

export const handleCategoryClick = (category, setSearchParams, onCategorySelect, setIsDropdownOpen) => {
    setSearchParams({ category });
    onCategorySelect(category);
    setIsDropdownOpen(false);
};
