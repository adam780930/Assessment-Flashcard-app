import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link, useRouteMatch } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function StudyPage() {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { deckId } = useParams();

  const [decks, setDecks] = useState("");
  const [cards, setCards] = useState([]);
  const [flip, setFlip] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState({});

  // Load deck and cards
  useEffect(() => {
    async function loadDecks() {
      const response = await readDeck(deckId);
      const decksFromAPI = response;
      setDecks(decksFromAPI);
      setCards(decksFromAPI.cards);
      setCurrentCard(decksFromAPI.cards[cardIndex]);
    }
    loadDecks();
  }, [deckId, cardIndex]);

  // Handler for when next is clicked
  function handleNextClick() {
    if (cards.length > cardIndex + 1) {
      setCardIndex(cardIndex + 1);
      setCurrentCard(cards[cardIndex + 1]);
      setFlip(!flip);
    } else if (
      window.confirm("Restart cards? Click 'cancel' to return to the home page")
    ) {
      setCardIndex(0);
      setCurrentCard(cards[0]);
      setFlip(!flip);
    } else {
      history.push("/");
    }
  }

  //Flip clicked
  function handleFlipClick() {
    setFlip(!flip);
  }

  // When less than 3 cards
  if (cards.length < 3) {
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
              Study
            </li>
          </ol>
        </nav>
        <h1>{decks.name}: Study</h1>
        <h3>Not enough cards</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck
        </p>
        <Link to={`/decks/${decks.id}/cards/new`}>
          <button className="btn btn-primary">Add Cards</button>
        </Link>
      </div>
    );
  }

  //Render cards in deck
  if (flip === false) {
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
              Study
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header">
            Card {cardIndex + 1} of {cards.length}
          </div>
          <div className="card-body">
            <h5 className="card-title">{decks.name}: Study</h5>
            <p className="card-text">{currentCard.front}</p>
            <button
              onClick={handleFlipClick}
              className="btn btn-secondary pr-4 pl-4"
            >
              Flip
            </button>
          </div>
        </div>
      </div>
    );
  } else if (flip === true) {
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
              Study
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header">
            Card {cardIndex + 1} of {cards.length}
          </div>
          <div className="card-body">
            <h5 className="card-title">{decks.name}: Study</h5>
            <p className="card-text">{currentCard.back}</p>
            <button
              onClick={handleFlipClick}
              className="btn btn-secondary pr-4 pl-4 mr-2"
            >
              Flip
            </button>
            <button
              onClick={handleNextClick}
              className="btn btn-primary pr-4 pl-4"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudyPage;
