import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultaCidadeDialogComponent } from 'src/app/cidade/consulta-cidade-dialog/consulta-cidade-dialog.component';
import { Usuario } from '../model/usuario';

@Component({
  selector: 'app-usuario-form-dialog',
  templateUrl: './usuario-form-dialog.component.html',
  styleUrls: ['./usuario-form-dialog.component.css']
})
export class UsuarioFormDialogComponent implements OnInit {
  formUsuario!: FormGroup;

  imagemFile!: File;
  preview!: string;

  constructor(
    public dialogRef: MatDialogRef<UsuarioFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private dialog: MatDialog
  ) {
    this.createForm(data);
  }

  ngOnInit(): void {
  }

  createForm(usuario: Usuario) {
    this.formUsuario = new FormGroup({
      id: new FormControl(usuario.id),
      nome: new FormControl(usuario.nome, [Validators.required, Validators.minLength(2)]),
      login: new FormControl(usuario.login),
      senha: new FormControl(usuario.senha),
      cidade: new FormGroup({
        id: new FormControl(usuario.cidade.id),
        nome: new FormControl(usuario.cidade.nome)
      }),
      imagemFile: new FormControl(),
      nomeFile: new FormControl()
    })
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.formUsuario.invalid)
      return;
    return this.dialogRef.close(this.formUsuario.value);
  }

  get nome() {
    return this.formUsuario.get('nome')!;
  }

  openConsultaCidadeDialog() {
    const dialogRef = this.dialog.open(ConsultaCidadeDialogComponent, {
      width: '450px',
      data: { nome: null, sigla: null },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // atualizando a cidade do formgroup
      this.formUsuario.patchValue({
        cidade:result
      })
    });
  }

  handleFile(target : any) {
    
  }


}
