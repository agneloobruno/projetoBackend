import { useState } from "react"; // 1. Importar useState
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // 2. Importar useNavigate
import { MdAlternateEmail } from "react-icons/md";
import "./SingIn.css";

const SingIn = () => {
  // 3. Definir estados para os campos e para erros
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  // 4. Endereço do seu endpoint de cadastro no backend
  const API_SIGNUP_URL = "http://127.0.0.1:8000/register/"; // EX: 'http://localhost:3000/api/register'

  const handleCadastrar = async (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário
    setError("");
    setSuccess("");

    // 5. Validação básica no front-end
    if (!nome || !email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // 6. Chamada à API para criar a conta
      const response = await fetch(API_SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mude para enviar 'name' e 'password'
        body: JSON.stringify({ 
          name: nome, 
          email: email, 
          password: senha 
        }),
      });

      if (response.ok) {
        // 7. Sucesso no cadastro
        setSuccess("Conta criada com sucesso! Redirecionando para o login...");
        // Redireciona para a página de Login após um pequeno atraso
        setTimeout(() => {
          navigate("/"); // A rota "/" é a página de Login (App.jsx)
        }, 2000);
      } else {
        // 8. Erro no backend (ex: email já existe)
        setError(data.message || "Erro ao tentar cadastrar. Tente novamente.");
      }
    } catch (err) {
      // 9. Erro de rede ou servidor
      setError("Não foi possível conectar ao servidor. Verifique a URL.");
    }
  };

  return (
    <div>
      <div className="Titulo2">
        <h1>Faça seu Cadastro</h1>
      </div>
      <div className='container1'>
        {/* 10. Associa a função de cadastro ao evento onSubmit */}
        <form onSubmit={handleCadastrar}>
            
            {/* Mensagens de feedback */}
            {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{success}</p>}
            
            <div className='SingNome'>
              <label htmlFor="nome"><b>Nome</b></label>
              {/* Captura o valor do Nome */}
              <input type="text" placeholder='Nome' className="SingNome2" value={nome} onChange={(e) => setNome(e.target.value)} required />
              <FaUser className='icon' />
            </div>
            <div className='SingEmail'>
              <label htmlFor="Email"><b>Email</b></label>
              {/* Captura o valor do Email */}
              <input type="email" placeholder='Email' className="SingEmail2" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <FaLock className='icon' />
            </div>
             <div className='SingSenha'>
              <label htmlFor="senha"><b>Senha</b></label>
              {/* Captura o valor da Senha */}
              <input type="password" placeholder='Senha' className="SingSenha2" value={senha} onChange={(e) => setSenha(e.target.value)} required />
              <MdAlternateEmail className='icon' />
             </div>
             
             {/* O botão agora submete o formulário */}
             <button type="submit" className="Cadastrar">
               <b>Cadastrar</b>
             </button>
             
        </form>
      </div>
    </div>
  )
}

export default SingIn;