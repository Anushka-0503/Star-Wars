import { useState, useEffect } from 'react';
import { fetchCharacterDetails } from "../dataFetching";
import Cross from './Cross';

const CharacterDetails = ({ url, onClose }) => {
  const [character, setCharacter] = useState("");

  useEffect(() => {
    //Load Character Details
    const loadCharacter = async () => {
      const data = await fetchCharacterDetails(url);
      setCharacter(data);
    }
    loadCharacter();
  }, [url])

  return (
    <div className="characterDetailModal" onClick={onClose}>
      <div className="characterDetailContent" onClick={(e) => e.stopPropagation()}>
        <div className="characterDetailHeader">
          <h4 className="characterDetailTitle">Character Details</h4>
          <Cross onClick={onClose}/>
        </div>
        <div>
          <h2>{character.name}</h2>
          <p>Height: {character.height}</p>
          <p>Mass: {character.mass}</p>
          <p>Gender: {character.gender}</p>
          <p>Hair color: {character.hair_color}</p>
          <p>Skin color: {character.skin_color}</p>
          <p>Eye color: {character.eye_color}</p>
          <p>Birth year: {character.birth_year}</p>
        </div>
      </div>
    </div>
  )
};

export default CharacterDetails;