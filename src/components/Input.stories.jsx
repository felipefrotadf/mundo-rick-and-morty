import Input from "./Input";
import { Mail, Lock } from "lucide-react";

export default {
  title: "Components/Input",
  component: Input,
};

export const Default = {
  args: {
    id: "email",
    placeholder: "Email",
  },
};

export const ComIcone = {
  args: {
    id: "email-icon",
    placeholder: "Email",
    icon: <Mail size={18} />,
  },
};

export const ComErro = {
  args: {
    id: "email-erro",
    placeholder: "Email",
    icon: <Mail size={18} />,
    error: "Email inválido",
  },
};

export const Senha = {
  args: {
    id: "password",
    placeholder: "Senha",
    type: "password",
    icon: <Lock size={18} />,
  },
};
