<<<<<<< HEAD
export const handleSearchSubmit = (searchTerm, navigate, onSearch) => {
    if (searchTerm.trim()) {
        onSearch(searchTerm.trim());
        navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
        onSearch('');
        navigate('/');
    }
};

export const handleCategoryClick = (category, navigate, onCategorySelect) => {
    navigate(`/${category}`);
    onCategorySelect(category);
};
=======
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
>>>>>>> bf92175cf8f1e45b0fe5b1c05af0cb727c4f47f6
