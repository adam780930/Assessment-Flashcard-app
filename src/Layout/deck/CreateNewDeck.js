import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";

function CreateNewDeck() {
  const history = useHistory();

  const [deckName, setDeckName] = useState("");
  const [deckDescription, setDeckDescription] = useState("");

  const handleDeckNameChange = (e) => setDeckName(e.target.value);
  const handleDeckDescriptionChange = (e) => setDeckDescription(e.target.value);

  const handleDeckSubmit = (e) => {
    e.preventDefault();
    createDeck({
      name: deckName,
      description: deckDescription,
    }).then((newDeck) => history.push(`/decks/${newDeck.id}`));
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
          <li class="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
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
        <Link to="/">
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
export default CreateNewDeck;
