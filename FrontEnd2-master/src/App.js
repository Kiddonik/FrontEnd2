import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import Home from "./Home";
import React from 'react';
import Store from "./Store";
import Cart from "./Cart";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import cartReducer from "./Cartreducer";

const store = createStore(cartReducer);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/reset" element={<Reset />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/store" element={<Store />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
