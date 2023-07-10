import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "./firebase";
import "./Register.css";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate()
  const [erroNome, setErroNome] = useState("")
  const [erroEmail, setErroEmail] = useState("")
  const [erroSenha, setErroSenha] = useState("")
  const [firebaseErrorSenha, setFirebaseErrorSenha] = useState('');
  const [firebaseErrorEmail, setFirebaseErrorEmail] = useState('');
  const [firebaseError, setFirebaseError] = useState('');

  const register = async() => {
    if (!name) {
      setErroNome("Por favor insira um nome");
      return
    }

    if (!email) {
      setErroEmail("Por favor insira um Email");
      return
    }
    if (!password) {
      setErroSenha("Por favor insira uma Senha");
      return
    }
    
    try{await registerWithEmailAndPassword(name, email, password);}
    catch (error){
       
      switch (error.code) {
        case 'auth/weak-password':
          setFirebaseErrorSenha('A senha é muito fraca. Por favor, escolha uma senha mais forte.');
          break;
        case 'auth/email-already-in-use':
          setFirebaseErrorEmail('O e-mail já está em uso. Por favor, use um e-mail diferente.');
          break;
        case 'auth/invalid-email':
          setFirebaseErrorEmail('O e-mail informado é inválido. Por favor, insira um e-mail válido.');
          break;
        default:
          setFirebaseError('Ocorreu um erro durante o registro. Por favor, tente novamente mais tarde.');
          break;
      }
    }

    
  };
  

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__icon">
          <svg className="register__icon_svg" xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
          </svg>
        </div>
        {erroNome && <p>{erroNome}</p>}
        <input
          type="text"
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome Completo"
        />
        {erroEmail && <p>{erroEmail}</p>}
        {firebaseErrorEmail&& <p>{firebaseErrorEmail}</p>}
        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        {erroSenha && <p>{erroSenha}</p>}
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        <div className="register__spacer"></div>

        <button className="register__btn" onClick={register}>
          Cadastrar
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Cadastrar com Google
        </button>
        <div className="register__spacer"></div>

        <div className="register__link_to_login">
          Já tem uma conta? <Link to="/">Entre</Link> agora.
        </div>
      </div>
    </div>
  );
}

export default Register;
