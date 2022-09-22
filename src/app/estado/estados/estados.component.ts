import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Estado } from '../model/estado';
import { EstadoService } from '../services/estado.service';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css']
})
export class EstadosComponent implements OnInit {

  // estados: Estado[] = [
  //   {id: 1, nome: 'Tocantins', sigla: 'TO'},
  //   {id: 2, nome: 'Goiás', sigla: 'GO'},
  //   {id: 3, nome: 'São Paulo', sigla: 'SP'}
  // ] 
  estados: Observable<Estado[]>;
  displayedColumns = ['nome', 'sigla']

  constructor(private estadoService: EstadoService) { 
    this.estados = estadoService.list();
  }

  ngOnInit(): void {
  }

}
