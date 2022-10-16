import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cidade } from '../model/cidade';

@Component({
  selector: 'app-cidade-form-dialog',
  templateUrl: './cidade-form-dialog.component.html',
  styleUrls: ['./cidade-form-dialog.component.css']
})
export class CidadeFormDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CidadeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cidade
  ) {}

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
