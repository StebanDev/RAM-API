import React from 'react';

const CharacterCard = props => (
  <div
    className="CharacterCard"
    style={{ backgroundImage: `url(${props.character.image})` }}
  >
    <div className="CharacterCard__name-container text-truncate">
      {props.character.name}
    </div>
  </div>
);

export default CharacterCard;
