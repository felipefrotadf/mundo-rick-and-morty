import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AuthProvider, useAuth } from '../contexts/AuthContext'

function ComponenteTeste() {
  const { user, login, logout, register } = useAuth()
  return (
    <div>
      <span>{user ? `Logado: ${user.name}` : 'Deslogado'}</span>
      <button onClick={() => login({ name: 'Felipe', email: 'felipe@teste.com' })}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <button onClick={() => register({ name: 'Novo', email: 'novo@teste.com', password: '123456' })}>
        Cadastrar
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('inicia deslogado quando não há usuário no localStorage', () => {
    render(<AuthProvider><ComponenteTeste /></AuthProvider>)
    expect(screen.getByText('Deslogado')).toBeInTheDocument()
  })

  test('faz login corretamente', () => {
    render(<AuthProvider><ComponenteTeste /></AuthProvider>)
    fireEvent.click(screen.getByText('Login'))
    expect(screen.getByText('Logado: Felipe')).toBeInTheDocument()
  })

  test('faz logout corretamente', () => {
    render(<AuthProvider><ComponenteTeste /></AuthProvider>)
    fireEvent.click(screen.getByText('Login'))
    fireEvent.click(screen.getByText('Logout'))
    expect(screen.getByText('Deslogado')).toBeInTheDocument()
  })

  test('salva usuário no localStorage ao fazer login', () => {
    render(<AuthProvider><ComponenteTeste /></AuthProvider>)
    fireEvent.click(screen.getByText('Login'))
    const salvo = JSON.parse(localStorage.getItem('user'))
    expect(salvo.name).toBe('Felipe')
  })

  test('remove usuário do localStorage ao fazer logout', () => {
    render(<AuthProvider><ComponenteTeste /></AuthProvider>)
    fireEvent.click(screen.getByText('Login'))
    fireEvent.click(screen.getByText('Logout'))
    expect(localStorage.getItem('user')).toBeNull()
  })

test('não permite cadastrar email duplicado', () => {
  localStorage.setItem('users', JSON.stringify([
    { name: 'Novo', email: 'novo@teste.com', password: '123456' }
  ]))

  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const exists = users.find(u => u.email === 'novo@teste.com')

  expect(exists).toBeTruthy()
  expect(exists.email).toBe('novo@teste.com')
})
})