import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaRoute, FaSearch } from "react-icons/fa";
import paris from "../../assets/Paris.jpg";
import roma from "../../assets/Roma.jpg";
import tokyo from "../../assets/Tokyo.jpg";
import Rj from "../../assets/Rj.jpg";
import Praga from "../../assets/Praga.jpg";
import "./Site.css";

const DESTINOS = [
  { id: 1, nome: "Paris", img: paris },
  { id: 2, nome: "Roma", img: roma },
  { id: 3, nome: "Tokyo", img: tokyo },
  { id: 4, nome: "Rio de Janeiro", img: Rj },
  { id: 5, nome: "Praga", img: Praga },
];

export default function Site() {
  const [q, setQ] = useState("");

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return t ? DESTINOS.filter(d => d.nome.toLowerCase().includes(t)) : DESTINOS;
  }, [q]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="tw-nav">
        <div className="tw-nav-inner">
          <div className="tw-logo">
            <Link to="/"><FaRoute /> TripWay</Link>
          </div>
          <ul className="tw-links">
            <li><Link to="/">Início</Link></li>
            <li><Link to="#">Minhas Viagens</Link></li>
            <li><Link to="#">Criar roteiro</Link></li>
            <li><Link to="#">Explorar</Link></li>
            <li><Link to="#">Ajustes</Link></li>
          </ul>
        </div>
      </nav>

      {/* LOGO GRANDE */}
      <h1 className="tw-brand">TripWay</h1>

      {/* BUSCA */}
      <div className="tw-search">
        <FaSearch className="tw-search-icon" aria-hidden />
        <input
          className="tw-search-input"
          type="search"
          placeholder="Pesquisar destinos"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* GRID DE DESTINOS */}
      <section className="tw-grid">
        {lista.map((d) => (
          <article key={d.id} className="tw-card">
            <img className="tw-thumb" src={d.img} alt={d.nome} />
            <div className="tw-card-body">
              <h3 className="tw-card-title">{d.nome}</h3>

              <div className="tw-dates" role="group" aria-label="Intervalo de datas">
                <input className="tw-date" placeholder="Data" />
                <span className="tw-arrow" aria-hidden>→</span>
                <input className="tw-date" placeholder="do" />
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* AÇÃO */}
      <div className="tw-actions">
        <button className="tw-cta">Gerar roteiro</button>
      </div>

      {/* SEÇÃO INFORMATIVA (o texto que você tinha) */}
      <section className="tw-about" id="inicio">
        <h2>Bem-vindo ao TripWay</h2>
        <p>
          A aplicação visa ser uma ferramenta interativa e colaborativa que auxilia os usuários a
          montar e gerenciar roteiros de viagem de forma completa. Seu foco é integrar todas as
          informações cruciais de uma viagem em um só lugar.
        </p>
        <ul>
          <li><b>Itinerários:</b> organize atividades por dia/horário e visualize em mapa.</li>
          <li><b>Integrações:</b> rotas (Directions) e clima (OpenWeather).</li>
          <li><b>Colaboração:</b> compartilhe por link e edite em conjunto.</li>
        </ul>
      </section>
    </>
  );
}
