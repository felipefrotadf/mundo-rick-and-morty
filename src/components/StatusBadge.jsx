const statusColor = {
  Alive: "bg-green-400",
  Dead: "bg-red-400",
  unknown: "bg-gray-400",
};

const statusLabel = {
  Alive: "Vivo",
  Dead: "Morto",
  unknown: "Desconhecido",
};

export default function StatusBadge({ status }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-900 bg-opacity-80">
      <span
        className={`w-2 h-2 rounded-full ${statusColor[status] || "bg-gray-400"}`}
      />
      <span className="text-white text-xs font-semibold">
        {statusLabel[status] || status}
      </span>
    </div>
  );
}
