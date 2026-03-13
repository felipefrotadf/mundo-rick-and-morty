import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StatusBadge from '../components/StatusBadge'

describe('StatusBadge', () => {
  test('exibe "Vivo" quando status é Alive', () => {
    render(<StatusBadge status="Alive" />)
    expect(screen.getByText('Vivo')).toBeInTheDocument()
  })

  test('exibe "Morto" quando status é Dead', () => {
    render(<StatusBadge status="Dead" />)
    expect(screen.getByText('Morto')).toBeInTheDocument()
  })

  test('exibe "Desconhecido" quando status é unknown', () => {
    render(<StatusBadge status="unknown" />)
    expect(screen.getByText('Desconhecido')).toBeInTheDocument()
  })

  test('exibe o status original quando não está mapeado', () => {
    render(<StatusBadge status="outro" />)
    expect(screen.getByText('outro')).toBeInTheDocument()
  })
})