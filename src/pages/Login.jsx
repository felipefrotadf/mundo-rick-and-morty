import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Input from '../components/Input'
import fundoRickMorty from '../assets/FundoRickMorty.png'
import logoRickMorty from '../assets/LogoRickMorty.png'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const successMessage = location.state?.message
  const [showPassword, setShowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(schema)
  })

  function onSubmit(data) {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(u => u.email === data.email && u.password === data.password)
    if (!user) {
      setError('email', { message: 'Email ou senha inválidos' })
      return
    }
    login(user)
    navigate('/characters')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${fundoRickMorty})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <main
        role="main"
        aria-label="Tela de login"
        className="bg-gray-800 bg-opacity-95 p-8 rounded-2xl w-full max-w-md shadow-xl"
      >
        <img src={logoRickMorty} alt="Rick and Morty" className="w-48 mx-auto mb-4" />

        <h1 className="text-gray-400 text-center mb-8">Entre na sua conta</h1>

        {successMessage && (
          <div
            role="status"
            aria-live="polite"
            className="bg-green-500 text-white text-center py-3 rounded-lg mb-4"
          >
            {successMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
          aria-label="Formulário de login"
        >
          <Input
            {...register('email')}
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
                {...register('password')}
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Senha"
                error={errors.password?.message}
                icon={<Lock size={18} />}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-green-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Entrar
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Não tem conta?{' '}
          <Link
            to="/register"
            className="text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
          >
            Cadastre-se
          </Link>
        </p>
      </main>
    </div>
  )
}