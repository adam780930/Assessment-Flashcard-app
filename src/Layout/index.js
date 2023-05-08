import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route } from "react-router-dom";
import Home from "./home/Home";
import DeckPage from "./deck/DeckPage";
import CreateNewDeck from "./deck/CreateNewDeck";
import EditDeck from "./deck/EditDeck";
import AddCard from "./deck/AddCard";
import EditCard from "./deck/EditCard";
import StudyPage from "./Study/StudyPage";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/decks/new">
            <CreateNewDeck />
          </Route>

          <Route exact path="/decks/:deckId/study">
            <StudyPage />
          </Route>

          <Route exact path="/decks/:deckId/edit">
            <EditDeck />
          </Route>

          <Route exact path="/decks/:deckId">
            <DeckPage />
          </Route>

          <Route exact path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>

          <Route exact path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>

          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
