import { Injectable } from '@angular/core';
import { FormOptions01 } from '../classes/form-options';
import { Session } from '../classes/session';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = "http://127.0.0.1:8000"

  private async fetch(request: Request): Promise<any> {
    const response = await fetch(request);
    
    if ([200,401].includes(response.status)) {       
      return response.json()
    } else {
      throw new Error("¡Algo anda mal en el servidor API!")
    }
  }

  async verifyUser(user: string | null | undefined, password: string | null | undefined): Promise<Session>{
    const _user = typeof (user) == 'string' ? user : ""
    const _password = typeof (password) == 'string' ? password : ""
    const request = new Request(`${this.url}/api/login`, {
      method: "POST",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },      
      body: JSON.stringify({ 'user': _user, 'password': _password })
    });   
     
    return await this.fetch(request);
  }
  
  /**
   * Devuelve las alternativas de los items de selección simple o múltiple del formulario "Inspección Técnica de Estación GNV"
   * @returns Promise<FormOptions01>
   */
  async getFormOptions01(): Promise<FormOptions01 | undefined>{
    const request = new Request(`${this.url}/api/form01`, {
      method: "GET",
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },      
    });   
     
    return await this.fetch(request);
  }
}
