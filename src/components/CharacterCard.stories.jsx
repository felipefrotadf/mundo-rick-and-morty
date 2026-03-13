import { MemoryRouter } from 'react-router-dom'
import CharacterCard from './CharacterCard'

export default {
  title: 'Components/CharacterCard',
  component: CharacterCard,
  decorators: [
  // eslint-disable-next-line no-unused-vars
  (Story) => <MemoryRouter><Story /></MemoryRouter>
]
}

const characterMock = {
  id: 1,
  name: 'Rick Sanchez',
  species: 'Human',
  status: 'Alive',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
}

export const Vivo = {
  args: { character: { ...characterMock, status: 'Alive' } }
}

export const Morto = {
  args: { character: { ...characterMock, status: 'Dead', name: 'Bird Person' } }
}

export const Desconhecido = {
  args: { character: { ...characterMock, status: 'unknown', name: 'Alien Morty' } }
}