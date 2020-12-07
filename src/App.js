import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./redux/actions";

import Header from "./components/Header/Header";
import ProductList from "./ProductList";

function App({ getItems }) {
  React.useEffect(() => {
    getItems();
  }, [getItems]);

  console.log("App is being called");

  return (
    <div className="App">
      <Header />
      <Route component={ProductList} />
    </div>
  );
}

export default connect(null, actions)(App);
