import React, { useEffect, useState } from "react";
import { readDeck, readCard, updateCard } from "../../utils/api";
import { Link, useHistory, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const history = useHistory();
  const { deckId } = useParams();
  const { cardId } = useParams();
  const [decks, setDecks] = useState([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const handleCardFrontChange = (e) => setCardFront(e.target.value);
  const handleCardBackChange = (e) => setCardBack(e.target.value);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
    }
    async function loadCards() {
      const response = await readCard(cardId);
      const CardsFromAPI = response;
      setCardFront(CardsFromAPI.front);
      setCardBack(CardsFromAPI.back);
    }
    loadDecks();
    loadCards();
  }, [deckId, cardId]);

  const handleDeckSubmit = (e) => {
    e.preventDefault();
    updateCard({
      front: cardFront,
      back: cardBack,
      id: cardId,
      deckId: parseInt(deckId),
    })
    history.push(`/decks/${deckId}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>
            {decks.name}
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>{decks.name}: Edit Card</h2>
      <CardForm 
      handleDeckSubmit={handleDeckSubmit}
      handleCardFrontChange={handleCardFrontChange}
      handleCardBackChange={handleCardBackChange}
      cardFront={cardFront}
      cardBack={cardBack}
      deckId={deckId}
      frontPlaceholder="Front side of card"
      backPlaceholder="Back side of card"
      done="Cancel"
      save="Submit"
      />
    </div>
  );
}

export default EditCard;
