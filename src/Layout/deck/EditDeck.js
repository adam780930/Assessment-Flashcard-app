import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();

  const [decks, setDecks] = useState([]);
  const [deckName, setDeckName] = useState("");
  const [deckDescription, setdeckDescription] = useState("");

  const handleDeckNameChange = (e) => setDeckName(e.target.value);
  const handleDeckDescriptionChange = (e) => setdeckDescription(e.target.value);

  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
      setDeckName(decksFromAPI.name);
      setdeckDescription(decksFromAPI.description);
    }
    loadDecks();
  }, [deckId]);

  const handleDeckSubmit = (e) => {
    e.preventDefault();
    updateDeck({
      name: deckName,
      description: deckDescription,
      id: deckId,
    }).then(() => history.push(`/decks/${deckId}`));
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
            Edit Deck
          </li>
        </ol>
      </nav>
      <form onSubmit={handleDeckSubmit}>
        <div class="mb-3">
          <label htmlFor="deckName" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="deckName"
            name="deckName"
            placeholder="Deck Name"
            onChange={handleDeckNameChange}
            value={deckName}
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Description</label>
          <textarea
            class="form-control"
            id="deckDescription"
            name="deckDescription"
            placeholder="Brief description of the deck"
            rows="5"
            onChange={handleDeckDescriptionChange}
            value={deckDescription}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button type="button" className="btn btn-dark mr-2">
            Cancel
          </button>
        </Link>
        <button type="submit" class="btn btn-primary pr-4 pl-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
