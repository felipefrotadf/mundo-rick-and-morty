import StatusBadge from "./StatusBadge";

export default {
  title: "Components/StatusBadge",
  component: StatusBadge,
};

export const Vivo = {
  args: { status: "Alive" },
};

export const Morto = {
  args: { status: "Dead" },
};

export const Desconhecido = {
  args: { status: "unknown" },
};
