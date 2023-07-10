import React, { useState } from 'react';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from './Cartaction';
import { useSelector } from 'react-redux';



function Store() {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch("");

  const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
  ];

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div>
      <h1>Loja</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
      <Dashboard></Dashboard>
    </div>
  );
}

<Route path="/Store" element={<Store/>} />
export default Store;
