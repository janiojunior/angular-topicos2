import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/autenticacao/services/token.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly ENDPOINT = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {

  }

  getUrlImagem(nomeImagem: string) {
    return this.ENDPOINT+'/download/'+nomeImagem;
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
    formData.append('nomeImagem', usuario.nomeImagem);

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

  public teste(nomeImagem: string) {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders().set('authorization','Bearer '+token);

    this.httpClient.get(this.ENDPOINT+'/download/'+nomeImagem, {
      responseType: 'arraybuffer',headers:headers}
     ).subscribe(response => this.downLoadFile(response, "application/ms-excel"));
  }




/**
* Method is use to download file.
* @param data - Array Buffer data
* @param type - type of the document.
*/
downLoadFile(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Please disable your Pop-up blocker and try again.');
  }
}


}
