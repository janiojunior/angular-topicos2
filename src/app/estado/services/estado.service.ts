import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private readonly ENDPOINT = 'http://localhost:8080/estados';

  constructor(private httpClient: HttpClient) {

   }

   public list() {
    return this.httpClient.get<Estado[]>(this.ENDPOINT);
   }

   public save(estado: Estado) {
    return this.httpClient.post<Estado>(this.ENDPOINT, estado);
   }
}
