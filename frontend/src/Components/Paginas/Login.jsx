import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 1. Endereço do seu endpoint de login no backend
  const API_LOGIN_URL = "http://127.0.0.1:8000/login/"; // EX: 'http://localhost:3000/api/login'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, preencha o email e a senha.");
      return;
    }

    try {
        // 2. Chamada à API para validar o usuário
        const response = await fetch(API_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password: password }), // Note que o campo do backend pode ser 'senha'
        });

        const data = await response.json();

        if (response.ok) {
            // 3. Login bem-sucedido: Armazene o token de autenticação (se houver) e redirecione
            alert("Login bem-sucedido! Redirecionando para o site.");
            // Exemplo de como salvar um token JWT, se o seu backend retornar um:
            // localStorage.setItem('authToken', data.token); 
            navigate("/Site");
        } else {
            // 4. Login falhou (erro 401 Unauthorized ou similar)
            setError(data.message || "Email ou senha inválidos. Tente novamente.");
        }
    } catch (err) {
        // 5. Erro de rede ou servidor
        setError("Não foi possível conectar ao servidor. Verifique a URL.");
    }
  };

  return (
    <div className="principal">
      <div className="titulo">
        <h1>TripWay</h1>
      </div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
          
          <div className='Email'>
            <label htmlFor="email"><b>Email</b></label>
            <input 
              type="email" 
              placeholder='Email' 
              className="Emailinput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
            <FaUser className='icon' />
          </div> 
          <div className='Senha'>
             <label htmlFor="password"><b>Password</b></label>
            <input 
              type="password" 
              placeholder='Senha' 
              className="Senhainput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <FaLock className='icon' />
          </div>
          <div className='box'>
            <label htmlFor="">
              <input type="checkbox" />
              Lembre de mim
            </label>
          </div>
          
          <button type="submit" className="Entrar">
            <b>Entrar</b>
          </button>
          
          <div className='Semconta'>
            <p>Não possui conta? <Link to="/SingIn">Click aki</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login