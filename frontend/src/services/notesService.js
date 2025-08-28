import { apiGet, apiPost, apiPut, apiDelete } from './apiClient'

export const getNotes = (token,q='') => apiGet(`/notes?q=${encodeURIComponent(q)}`, token)

export const createNote = (token,note) => apiPost('/notes', note, token)

export const getNote = (token,id) => apiGet(`/notes/${id}`, token)

export const updateNote = (token,id,patch) => apiPut(`/notes/${id}`, patch, token)

export const deleteNote = (token,id) => apiDelete(`/notes/${id}`, token)

export const createShare = (token,id) => apiPost(`/notes/${id}/share`, {}, token)

export const getPublicNote = (shareId) => apiGet(`/notes/public/${shareId}`)