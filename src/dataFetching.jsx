//Fetch characters
export const fetchCharacters = async (page = 1, searchTerm='') => {
    //Used to fetch characters from the API with Pagination
    let url = `https://swapi.dev/api/people?page=${page}`;
    if(searchTerm) {
        //Adding search term to the URL to get paginated search results
        url = `https://swapi.dev/api/people/?page=${page}&&search=${searchTerm}`;
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            results: data?.results || [],
            total_records: data?.count || 0
        }
    } catch (error) {
        return { results: [], total_records: 0 };
    }
};

//Fetch character details
export const fetchCharacterDetails = async (url) => {
    try {
        const response = await fetch(url);
        const data = response.json();
        return data;
    } catch (error) {
        return null;
    }
};