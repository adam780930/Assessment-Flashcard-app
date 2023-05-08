import React from "react";
import { Link } from "react-router-dom";

function CardForm({
  handleDeckSubmit,
  handleCardFrontChange,
  handleCardBackChange,
  cardFront,
  cardBack,
  deckId,
  frontPlaceholder,
  backPlaceholder,
  done,
  save,
}) {
  return (
    <div>
      <form onSubmit={handleDeckSubmit}>
        <div class="mb-3">
          <label htmlFor="cardFront" class="form-label">
            Card Front
          </label>
          <textarea
            class="form-control"
            id="cardFront"
            name="cardFront"
            placeholder={frontPlaceholder}
            onChange={handleCardFrontChange}
            value={cardFront}
          />
        </div>

        <div class="mb-3">
          <label htmlFor="cardBack" class="form-label">
            Card Back
          </label>
          <textarea
            class="form-control"
            id="cardBack"
            name="cardBack"
            placeholder={backPlaceholder}
            onChange={handleCardBackChange}
            value={cardBack}
          />
        </div>
        <Link to={`/decks/${deckId}`}>
          <button class="btn btn-secondary pr-3 pl-3 mr-2">{done}</button>
        </Link>
        <button type="submit" class="btn btn-primary pr-3 pl-3">
          {save}
        </button>
      </form>
    </div>
  );
}

export default CardForm;
