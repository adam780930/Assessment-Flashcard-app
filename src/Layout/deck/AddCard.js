import React, { useEffect, useState } from "react";
import { createCard, readDeck } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState([]);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  //Captures user input
  const handleCardFrontChange = (e) => setCardFront(e.target.value);
  const handleCardBackChange = (e) => setCardBack(e.target.value);

  //Render deck
  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, [deckId]);

  //Submit handler then remove the user input
  const handleDeckSubmit = (e) => {
    e.preventDefault();
    createCard(deckId, {
      front: cardFront,
      back: cardBack,
    })
    setCardFront("");
    setCardBack("");
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
            <Link to={`/decks/${deckId}`}>{decks.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{decks.name}: Add Card</h2>
      <CardForm
        handleDeckSubmit={handleDeckSubmit}
        handleCardFrontChange={handleCardFrontChange}
        handleCardBackChange={handleCardBackChange}
        cardFront={cardFront}
        cardBack={cardBack}
        deckId={deckId}
        frontPlaceholder="Front side of card"
        backPlaceholder="Back side of card"
        done="Done"
        save="Save"
      />
    </div>
  );
}

export default AddCard;
