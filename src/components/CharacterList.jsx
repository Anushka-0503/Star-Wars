import { useState, useEffect } from "react";
import { fetchCharacters } from "../dataFetching";
import CharacterDetails from "./CharacterDetails";
import SearchBox from "./SearchBox";
import Spinner from "./Spinner";
import TableView from "./TableView";
import CardView from "./CardView";

const CharacterList = () => {
    //State
    const [characters, setCharacters] = useState([]);
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

    //Call LoadCharacters when page changes
    useEffect(() => {
        loadCharacters(searchTerm);
    }, [page, searchTerm]);

    useEffect(()=>{
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };  
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }

    },[])

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

    const getCharactersList= ()=>{
        return (
            characters?.length?(
                <>{isMobileView ? (
                    <CardView characters={characters} setSelectedCharacter={setSelectedCharacter} />
                ) : (
                    <TableView characters={characters} setSelectedCharacter={setSelectedCharacter} />
                )}
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
            </>
            ):(<div>{error}</div>)
        )
    }

    const handleSearch = (searchTerm)=>{
        setPage(1);
        setSearchTerm(searchTerm);
        loadCharacters(searchTerm);
    }

    return (
        <div>
            <SearchBox searchTerm={searchTerm} handleSearch={handleSearch} />
            {loading ? <Spinner/>: getCharactersList()}
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