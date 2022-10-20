import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaCidadeDialogComponent } from 'src/app/cidade/consulta-cidade-dialog/consulta-cidade-dialog.component';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-usuario-form-dialog',
  templateUrl: './usuario-form-dialog.component.html',
  styleUrls: ['./usuario-form-dialog.component.css']
})
export class UsuarioFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openConsultaCidadeDialog() {
    const dialogRef = this.dialog.open(ConsultaCidadeDialogComponent, {
      width: '450px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(cidade => {
      console.log(cidade);
      this.data.cidade = cidade;
    });
  }

}
