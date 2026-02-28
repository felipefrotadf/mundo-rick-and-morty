// IA-ASSISTED: Utilizei o Inner AI para auxiliar na implementação dos
// filtros de status e espécie integrados à API. Entendi como passar múltiplos
// parâmetros de query string e como resetar a paginação ao aplicar filtros.

import { useState, useEffect } from "react";
import { getCharacters } from "../services/api";
import { useAuth } from "../contexts/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import CharacterCard from "../components/CharacterCard";
import logoRickMorty from "../assets/LogoRickMorty.png";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const debouncedSearch = useDebounce(search);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch, status, species]);

  async function fetchCharacters() {
    try {
      setLoading(true);
      setError(null);
      const data = await getCharacters(page, debouncedSearch, status, species);
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch {
      setError("Nenhum personagem encontrado.");
      setCharacters([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleStatus(e) {
    setStatus(e.target.value);
    setPage(1);
  }

  function handleSpecies(e) {
    setSpecies(e.target.value);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
        <img src={logoRickMorty} alt="Rick and Morty" className="h-10" />
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">Olá, {user?.name}</span>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Buscar personagem..."
            value={search}
            onChange={handleSearch}
            className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          />
          <select
            value={status}
            onChange={handleStatus}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todos os status</option>
            <option value="alive">Vivo</option>
            <option value="dead">Morto</option>
            <option value="unknown">Desconhecido</option>
          </select>
          <select
            value={species}
            onChange={handleSpecies}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Todas as espécies</option>
            <option value="Human">Humano</option>
            <option value="Alien">Alienígena</option>
            <option value="Robot">Robô</option>
            <option value="Animal">Animal</option>
            <option value="Humanoid">Humanoide</option>
            <option value="unknown">Desconhecido</option>
          </select>
        </div>

        {loading && (
          <div className="text-center text-gray-400 py-20">Carregando...</div>
        )}

        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
              >
                Anterior
              </button>
              <span className="text-gray-400">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="bg-gray-800 px-4 py-2 rounded-lg disabled:opacity-40 hover:bg-gray-700 transition-colors"
              >
                Próximo
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
