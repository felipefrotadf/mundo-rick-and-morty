import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../services/api";
import { ArrowLeft, MapPin, Globe, Tag, Tv } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import logoRickMorty from "../assets/LogoRickMorty.png";

const speciesLabel = {
  Human: "Humano",
  Alien: "Alienígena",
  Robot: "Robô",
  Animal: "Animal",
  Mythological: "Mitológico",
  Humanoid: "Humanoide",
  unknown: "Desconhecido",
  Poopybutthole: "Poopybutthole",
  Cronenberg: "Cronenberg",
  Disease: "Doença",
};

const genderLabel = {
  Male: "Masculino",
  Female: "Feminino",
  Genderless: "Sem gênero",
  unknown: "Desconhecido",
};

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacter() {
      try {
        setLoading(true);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch {
        setError("Personagem não encontrado.");
      } finally {
        setLoading(false);
      }
    }
    fetchCharacter();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 px-6 py-4 flex items-center gap-4 shadow-lg">
        <button
          onClick={() => navigate("/characters")}
          className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-semibold">Voltar</span>
        </button>
        <img src={logoRickMorty} alt="Rick and Morty" className="h-10" />
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading && (
          <div className="text-center text-gray-400 py-20">Carregando...</div>
        )}
        {error && <div className="text-center text-red-400 py-20">{error}</div>}

        {!loading && !error && character && (
          <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row">
              {/* Imagem */}
              <div className="md:w-64 shrink-0">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Informações */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-3xl font-bold text-green-400">
                      {character.name}
                    </h1>
                    <StatusBadge status={character.status} />
                  </div>
                  <p className="text-gray-400 mb-6">
                    {speciesLabel[character.species] || character.species} —{" "}
                    {genderLabel[character.gender] || character.gender}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <Globe size={14} />
                      <span>Origem</span>
                    </div>
                    <p className="font-semibold truncate">
                      {character.origin.name}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <MapPin size={14} />
                      <span>Localização</span>
                    </div>
                    <p className="font-semibold truncate">
                      {character.location.name}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <Tag size={14} />
                      <span>Tipo</span>
                    </div>
                    <p className="font-semibold">
                      {character.type || "Desconhecido"}
                    </p>
                  </div>
                  <div className="bg-gray-700 p-4 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                      <Tv size={14} />
                      <span>Episódios</span>
                    </div>
                    <p className="font-semibold">
                      {character.episode.length} episódios
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
