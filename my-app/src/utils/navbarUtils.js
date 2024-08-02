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