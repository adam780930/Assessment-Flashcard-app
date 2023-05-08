import React from "react";
import { deleteDeck } from "../../utils/api/index";
import { useHistory } from "react-router-dom";

function DeleteButton({ deck, deleteDeckFromState }) {
  const history = useHistory();
  function handleDeleteDeck() {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      deleteDeck(deck.id);
      deleteDeckFromState(deck.id);
      history.push("/");
    }
  }

  return (
    <button type="button" className="btn btn-danger" onClick={handleDeleteDeck}>
      <span className="oi oi-trash" />
    </button>
  );
}

export default DeleteButton;
