const CardView = ({characters, setSelectedCharacter}) => {
    return(
        <div className="cards-container">
        {characters.map((character) => (
            <div className="card" key={character.name}>
                <div className="card-header">
                    <h3
                        className="characterName"
                        onClick={() => setSelectedCharacter(character?.url)}
                    >
                        {character.name}
                    </h3>
                </div>
                <div className="card-body">
                    <p><strong>Height:</strong> {character.height}</p>
                    <p><strong>Mass:</strong> {character.mass}</p>
                    <p><strong>Gender:</strong> {character.gender}</p>
                    <p><strong>Hair color:</strong> {character.hair_color}</p>
                </div>
            </div>
        ))}
    </div>
    )
}

export default CardView;