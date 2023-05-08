import React from "react";
import { deleteCard } from "../../utils/api/index";

function DeleteCard({ cardId, DeleteCardFromState }) {
  const clickHandler = () => {
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      deleteCard(cardId);
      DeleteCardFromState(cardId);
    }
  };

  return (
    <button
      className="btn btn-danger pr-4 pl-4"
      onClick={clickHandler}
      type="button"
    >
      <span className="oi oi-trash" />
    </button>
  );
}

export default DeleteCard;
