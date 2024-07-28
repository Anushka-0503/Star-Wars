const TableView = ({characters, setSelectedCharacter}) => {
    return (
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
    )
}

export default TableView;