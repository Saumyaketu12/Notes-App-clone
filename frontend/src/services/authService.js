import { apiPost, apiGet } from './apiClient'
export const login = (email,password)=> apiPost('/auth/login',{ email, password })
export const register = (name,email,password)=> apiPost('/auth/register',{ name,email,password })
export const me = (token)=> apiGet('/auth/me', token)