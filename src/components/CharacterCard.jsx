import { useNavigate } from "react-router-dom";
import StatusBadge from "./StatusBadge";

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

export default function CharacterCard({ character }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/characters/${character.id}`)}
      className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 hover:ring-2 hover:ring-green-400 transition-all"
    >
      <div className="relative">
        <div className="overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="w-full transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="absolute top-2 right-2">
          <StatusBadge status={character.status} />
        </div>
      </div>
      <div className="p-3">
        <p className="font-semibold text-sm truncate">{character.name}</p>
        <p className="text-gray-400 text-xs">
          {speciesLabel[character.species] || character.species}
        </p>
      </div>
    </div>
  );
}
