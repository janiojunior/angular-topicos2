import { Component, OnInit } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { Usuario } from '../model/usuario';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioFormDialogComponent } from '../usuario-form-dialog/usuario-form-dialog.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // datasource
  usuarios!: MatTableDataSource<Usuario>;
  displayedColumns = [ 'imageUrl', 'nome', 'login', 'senha', 'acao']

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {
    // buscando os usuarios
    this.refreshTable();
    // this.usuarios = usuarioService.list();
  }
  thumbnail:any;

  ngOnInit(): void {
  }

  getImagem(nomeImagem: string) {
    return this.sanitizer.bypassSecurityTrustUrl(this.usuarioService.getUrlImagem(nomeImagem));
  }

  refreshTable(): void {
    this.usuarioService.list().subscribe(
      (dados) => this.usuarios = new MatTableDataSource(dados)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usuarios.filter = filterValue.trim().toLowerCase();
  }

  private addMessage(message: string) {
    this.snackBar.open(message, 'fechar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    })
  }

  onAdd() {
    //this.router.navigate(['new'], {relativeTo: this.activateRoute})
    const dialogRef = this.dialog.open(UsuarioFormDialogComponent, {
      width: '350px',
      data: { nome: null, login: null, senha: null, cidade: {nome: null} },
    });

    dialogRef.afterClosed().subscribe(usuario => {
      if (usuario == undefined)
        return ;
      console.log(usuario);
      this.usuarioService.save(usuario).subscribe(() => {
        this.refreshTable();
        this.addMessage("Inclusão realizada com sucesso.")
      });

    });
  }

  onEdit(usuario: Usuario) {
    // copia Deep
    const usuarioClone = JSON.parse(JSON.stringify(usuario));

    const dialogRef = this.dialog.open(UsuarioFormDialogComponent, {
      width: '350px',
      data: usuarioClone,
    });

    dialogRef.afterClosed().subscribe(usuario => {
      if (usuario == undefined)
      return ;
      console.log(usuario);
      this.usuarioService.save(usuario).subscribe(() => this.refreshTable());
    });
  }

  onDelete(usuario: Usuario) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        title: 'Deseja remover o Usuario?',
        confirmButtonLabel: 'Excluir',
        cancelButtonLabel: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.delete(usuario).subscribe(() => this.refreshTable());
      }
    });

  }
}

