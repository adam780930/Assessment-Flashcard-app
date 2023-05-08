import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index";
import { Link, useHistory } from "react-router-dom";
import CreateButton from "./CreateButton";
import ViewButton from "./ViewButton";
import StudyButton from "./StudyButton";
import DeleteButton from "./DeleteButton";

function Home() {
  const [decks, setDecks] = useState([]);

  // Load decks
  useEffect(() => {
   

    async function loadDecks() {
      const response = listDecks();
      const decksFromAPI = await response;
      setDecks(decksFromAPI);
    }
    loadDecks();
  }, []);

  // Re-render list of decks that is in the database after deletion
  function deleteDeck(deckId) {
    const newDeck = decks.filter((deck) => deck.id !== deckId);
    setDecks(newDeck);
  }

  return (
    <div>
      <CreateButton />
      {decks.map((deck, index) => {
        return (
          <div className="deck-card card mt-2" key={index}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{deck.name}</h4>
                <h5 className="text-muted">{deck.cards.length} cards</h5>
              </div>
              <p>{deck.description}</p>
              <div className="d-flex">
                <div className="mr-auto">
                  <ViewButton deck={deck} />
                  <StudyButton deck={deck} />
                </div>
                <div>
                  <DeleteButton deck={deck} deleteDeckFromState={deleteDeck} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
