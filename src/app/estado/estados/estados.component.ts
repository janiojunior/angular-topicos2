import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  //estados: Observable<Estado[]>;
  
  // datasource
  estados!: MatTableDataSource<Estado>;
  displayedColumns = ['nome', 'sigla', 'acao']

  constructor(
    private estadoService: EstadoService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { 
    this.estadoService.list().subscribe( (dados) => 
      {this.estados = new MatTableDataSource(dados)});
    // this.estados = estadoService.list();
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.estados.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.activateRoute})
  }

}
