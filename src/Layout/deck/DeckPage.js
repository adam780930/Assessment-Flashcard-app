import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";
import DeleteButton from "../home/DeleteButton";
import DeleteCard from "./DeleteCard";

function DeckPage() {
  const { deckId } = useParams();

  const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

  // Load deck and cards
  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const deckFromAPI = await response;
      setDecks(deckFromAPI);
      setCards(deckFromAPI.cards);
    }
    loadDecks();
  }, [deckId]);

  //Re-render card list after deleting one card
  function delCard(cardId) {
    const newCards = cards.filter((card)=> card.id !== cardId);
    setCards(newCards);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
          {decks.name}
          </li>
        </ol>
      </nav>
      <div>
        <div className="mb-3">
          <div>
            <h3>{decks.name}</h3>
            <p>{decks.description}</p>
            <div className="d-flex justify-content-between">
              <div>
                <Link to={`/decks/${decks.id}/edit`}>
                  <button className="btn btn-secondary pr-4 pl-4 mr-2">
                  <span className="oi oi-pencil" /> Edit Deck
                  </button>
                </Link>
                <Link to={`/decks/${decks.id}/study`}>
                  <button className="btn btn-primary pr-4 pl-4 mr-2">
                  <span className="oi oi-book" /> Study
                  </button>
                </Link>
                <Link to={`/decks/${decks.id}/cards/new`}>
                  <button className="btn btn-primary pr-4 pl-4">
                  <span className="oi oi-plus" /> Add Cards
                  </button>
                </Link>
              </div>
              <DeleteButton deck={decks} deleteDeckFromState={setDecks}/>
            </div>
          </div>
        </div>
      </div>
      <h1>Cards</h1>
      {cards.map((card, index) => {
        return (
          <div key={index}>
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between ">
                  <h5 className="col-6 card-text">{card.front}</h5>
                  <h5 className="col-6 card-text">{card.back}</h5>
                </div>
                <div className="d-flex justify-content-end">
                  <Link to={`/decks/${decks.id}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary pr-4 pl-4 mr-2">
                    <span className="oi oi-pencil" /> Edit Card
                    </button>
                  </Link>
                  <DeleteCard cardId={card.id} DeleteCardFromState={delCard}/>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default DeckPage;
