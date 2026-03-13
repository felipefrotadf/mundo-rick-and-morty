import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Input from "../components/Input";
import fundoRickMorty from "../assets/FundoRickMorty.png";
import logoRickMorty from "../assets/LogoRickMorty.png";

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    try {
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      navigate("/login", {
        state: { message: "Conta criada com sucesso! Faça seu login." },
      });
    } catch (err) {
      setError("email", { message: err.message });
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${fundoRickMorty})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main
        role="main"
        aria-label="Tela de cadastro"
        className="bg-gray-800 bg-opacity-95 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <img
          src={logoRickMorty}
          alt="Rick and Morty"
          className="w-48 mx-auto mb-4"
        />

        <h1 className="text-gray-400 text-center mb-8">Crie sua conta</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
          aria-label="Formulário de cadastro"
        >
          <Input
            {...register("name")}
            id="name"
            type="text"
            placeholder="Nome"
            error={errors.name?.message}
            icon={<User size={18} />}
            autoComplete="name"
          />

          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
            error={errors.email?.message}
            icon={<Mail size={18} />}
            autoComplete="email"
          />

          <div>
            <div className="relative">
              <Input
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                error={errors.password?.message}
                icon={<Lock size={18} />}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <div className="relative">
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar senha"
                error={errors.confirmPassword?.message}
                icon={<Lock size={18} />}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmação de senha"
                    : "Mostrar confirmação de senha"
                }
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Cadastrar
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            Entrar
          </Link>
        </p>
      </main>
    </div>
  );
}
