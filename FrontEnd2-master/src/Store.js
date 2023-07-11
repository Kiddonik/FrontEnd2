import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from './Cartaction';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import "./Cart.css"
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function Store() {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch("");
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [showMessage, setShowMessage] = useState(false);
  const products = [
    { id: uuidv4(), name: 'God of War', price: 10, Img: "https://i0.wp.com/farm3.static.flickr.com/2005/2048331217_19fb1bcea9.jpg" },
    { id: uuidv4(), name: 'Horizon Zero Dawn', price: 20, Img: "https://cdn.awsli.com.br/600x700/1794/1794020/produto/122481059/5037b6f198.jpg"},
    { id: uuidv4(), name: 'Pokemon', price: 30, Img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c9be30e5-5d79-4c7e-b734-3ce0a28bb294/d9tkrbj-4a89683f-65db-4e8c-ab91-0c3aaf63560f.png/v1/fill/w_894,h_894,q_70,strp/pokemon_red_version__game_boy__hq_box_art_by_jadelune_d9tkrbj-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYzliZTMwZTUtNWQ3OS00YzdlLWI3MzQtM2NlMGEyOGJiMjk0XC9kOXRrcmJqLTRhODk2ODNmLTY1ZGItNGU4Yy1hYjkxLTBjM2FhZjYzNTYwZi5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Dzq2mUoMhDypY4LZzOg57_6tmJ-y87HFeAybaAYecHM"},
  ];

 const handleAddToCart = (product) => {
  dispatch(addToCart(product));
  setShowMessage(product.id);

  setTimeout(() => {
    setShowMessage(null);
  }, 2000);
};
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();

      setName(data.name);
    } catch (error) {
      console.error(error);
      //alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");

    fetchUserName();
  }, [user, loading]);


  return (
    <div className="dashboard">
      <div className="dashboard__sidebar">

        <Link to="/Home">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
          <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
        </svg>
        </Link>
        <Link to="/Store">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-joystick" viewBox="0 0 16 16">
          <path d="M10 2a2 2 0 0 1-1.5 1.937v5.087c.863.083 1.5.377 1.5.726 0 .414-.895.75-2 .75s-2-.336-2-.75c0-.35.637-.643 1.5-.726V3.937A2 2 0 1 1 10 2z" />
          <path d="M0 9.665v1.717a1 1 0 0 0 .553.894l6.553 3.277a2 2 0 0 0 1.788 0l6.553-3.277a1 1 0 0 0 .553-.894V9.665c0-.1-.06-.19-.152-.23L9.5 6.715v.993l5.227 2.178a.125.125 0 0 1 .001.23l-5.94 2.546a2 2 0 0 1-1.576 0l-5.94-2.546a.125.125 0 0 1 .001-.23L6.5 7.708l-.013-.988L.152 9.435a.25.25 0 0 0-.152.23z" />
        </svg>
        </Link>
        <Link to="/Cart">
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
        </Link>
      </div>
      <div className="dashboard__user dashboard__user_space">
        <div className="dashboard__user">
          <div className="dashboard__container">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            </svg>
            <div className="dashboard__container_inner">
              Logged in as
              <div>{name}</div>
              <div>{user?.email}</div>
            </div>
            <button className="dashboard__btn" onClick={logout}>
              Logout
            </button>
          </div>
          <div>
      <h1>Loja</h1>
      <div class= "produtos">
      <ul>
        {products.map((product) => (
          <p key={product.id}>
            <img src={product.Img} />
            <p></p>
            <p></p>
                  {showMessage && (
                    <span>Adicionado ao Carrinho</span>
                  )}
                  <p></p>
            {product.name} - ${product.price}
            <p></p>
            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </p>
      
        ))}
      </ul>
      </div>
    </div>
        </div>
      </div>
    </div>
  );
}
<Route path="/Store" element={<Store/>} />
export default Store;