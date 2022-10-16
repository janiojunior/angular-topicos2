import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cidade } from '../model/cidade';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {

  private readonly ENDPOINT = 'http://localhost:8080/cidades';

  constructor(private httpClient: HttpClient) {

  }

  public list() {
    return this.httpClient.get<Cidade[]>(this.ENDPOINT);
  }

  public save(cidade: Cidade) {
    if (cidade.id == null)
      return this.httpClient.post<Cidade>(this.ENDPOINT, cidade);
    return this.httpClient.put<Cidade>(this.ENDPOINT +'/'+ cidade.id, cidade);
  }

  public delete(cidade: Cidade) {
    return this.httpClient.delete<Cidade>(this.ENDPOINT +'/'+ cidade.id);
  }
}
