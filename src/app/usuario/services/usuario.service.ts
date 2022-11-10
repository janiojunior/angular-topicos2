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
    const formData = new FormData();
    formData.append('nome', usuario.nome);
    formData.append('login', usuario.login);
    formData.append('senha', usuario.senha);
    formData.append('idCidade', String(usuario.cidade.id));
    
    formData.append('imagem', usuario.imageFile);
    formData.append('nomeImagem', usuario.nomeFile);

      return this.httpClient.post(this.ENDPOINT+'/postupload', formData);
  }

  public delete(usuario: Usuario) {
    return this.httpClient.delete<Usuario>(this.ENDPOINT +'/'+ usuario.id);
  }

  public saveAntigo(usuario: Usuario) {
    const obj = {
      id: usuario.id,
      nome: usuario.nome,
      login: usuario.login,
      senha: usuario.senha,
      idCidade: usuario.cidade.id
    }
  }
}
