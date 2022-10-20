import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly ENDPOINT = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {

  }

  public list() {
    return this.httpClient.get<Usuario[]>(this.ENDPOINT);
  }

  public save(usuario: Usuario) {
    const obj = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      idCidade: usuario.cidade.id
    }


    if (usuario.id == null)
      return this.httpClient.post<Usuario>(this.ENDPOINT, obj);
    return this.httpClient.put<Usuario>(this.ENDPOINT +'/'+ usuario.id, obj);
  }

  public delete(usuario: Usuario) {
    return this.httpClient.delete<Usuario>(this.ENDPOINT +'/'+ usuario.id);
  }
}
