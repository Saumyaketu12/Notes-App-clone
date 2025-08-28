import { apiPost, apiGet } from './apiClient'
export const login = (email,password)=> apiPost('/api/auth/login',{ email, password })
export const register = (name,email,password)=> apiPost('/api/auth/register',{ name,email,password })
export const me = (token)=> apiGet('/api/auth/me', token)