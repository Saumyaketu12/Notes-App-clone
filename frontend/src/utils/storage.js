export const TOKEN_KEY = 'notes_token'
export const saveToken = (t)=> localStorage.setItem(TOKEN_KEY, t)
export const loadToken = ()=> localStorage.getItem(TOKEN_KEY)
export const clearToken = ()=> localStorage.removeItem(TOKEN_KEY)