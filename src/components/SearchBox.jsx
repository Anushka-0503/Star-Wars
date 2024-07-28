const SearchBox = ({searchTerm, handleSearch}) => {
    const handleInputChange = (e) => {
        handleSearch(e.target.value);
    };

    return (
        <input
            className="search-box"
            type="text"
            placeholder="Search characters..."
            value={searchTerm}
            onChange={handleInputChange}
        />
    );
};

export default SearchBox;