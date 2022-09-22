import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Estado } from '../model/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private httpClient: HttpClient) {

   }

   public list() {
    return this.httpClient.get<Estado[]>('http://localhost:8080/estados');
   }
}
