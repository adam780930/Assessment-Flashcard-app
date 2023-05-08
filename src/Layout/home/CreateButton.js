import React from "react";
import { useHistory } from "react-router-dom";

function CreateButton() {
  const history = useHistory();

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => history.push("/decks/new")}>
      <span className="oi oi-plus" /> Create Deck
    </button>
  );
}

export default CreateButton;