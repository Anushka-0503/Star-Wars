import { useState, useEffect } from "react";
import { fetchCharacters } from "../dataFetching";
import CharacterDetails from "./CharacterDetails";
import SearchBox from "./SearchBox";
import Spinner from "./Spinner";

const CharacterList = () => {
    //State
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    //Call LoadCharacters when page changes
    useEffect(() => {
        loadCharacters(searchTerm);
    }, [page, searchTerm]);

    //Load Characters API call
    const loadCharacters = async (searchTerm) => {
        setError(null);
        setLoading(true);
        const data = await fetchCharacters(page, searchTerm);
        if (data?.results?.length) {
            setCharacters(data?.results);
            setTotalPages(Math.ceil(data?.total_records / 10));
            setLoading(false);
        } else {
            setCharacters([]);
            setLoading(false);
            setError("Couldn't find what you are looking for...");
        }
    };

    const getCharactersTable= ()=>{
        return (
            characters?.length?(
        <>
        <table className="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Gender</th>
                <th>Hair color</th>
            </tr>
        </thead>
        <tbody>
            {characters?.map((character) => (
                <tr
                    key={character.name}>
                    <td
                    className="characterName"
                    onClick={() => setSelectedCharacter(character?.url)}
                    >{character.name}</td>
                    <td>{character.height}</td>
                    <td>{character.mass}</td>
                    <td>{character.gender}</td>
                    <td>{character.hair_color}</td>
                </tr>
            ))}
        </tbody>
    </table>
    <div className="pagination">
        <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={page === 1 ? "button-disabled" : 'button'}
        >
            Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
            className={page === totalPages ? "button-disabled" : 'button'}
            onClick={() => setPage((prev) => prev + 1)}
        >
            Next
        </button>
    </div>
    </>): <div>{error}</div>)
    }

    const handleSearch = (searchTerm)=>{
        setPage(1);
        setSearchTerm(searchTerm);
        loadCharacters(searchTerm);
    }

    return (
        <div>
            <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
            {loading ? <Spinner/>: getCharactersTable()}
            {selectedCharacter && (
                <CharacterDetails
                    url={selectedCharacter}
                    onClose={() => setSelectedCharacter(null)}
                />
            )}
        </div>
    );
};

export default CharacterList;