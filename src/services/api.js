// IA-ASSISTED: Utilizei o Inner AI para auxiliar na criação do
// serviço de API com Axios. Entendi como funciona e precisei de ajuda nas
// configuração do baseURL e das funções assíncronas com async/await, incluindo os
// parâmetros de busca e filtro.

import axios from "axios";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});

export async function getCharacters(
  page = 1,
  name = "",
  status = "",
  species = "",
) {
  const response = await api.get(
    `/character?page=${page}&name=${name}&status=${status}&species=${species}`,
  );
  return response.data;
}

export async function getCharacterById(id) {
  const response = await api.get(`/character/${id}`);
  return response.data;
}
