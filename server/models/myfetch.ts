export const API_ROOT =  'http://localhost:8000/api/v1/';
 
 export function rest<T>(url: string): Promise<T> {
   return fetch(url).then((x) => x.json())
 }
 
 export function api<T>(action: string): Promise<T> {
   return rest<T>(`${API_ROOT}${action}`)
 }