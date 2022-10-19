import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { Estado } from 'src/app/estado/model/estado';
import { EstadoService } from 'src/app/estado/services/estado.service';
import { Cidade } from '../model/cidade';

@Component({
  selector: 'app-cidade-form-dialog',
  templateUrl: './cidade-form-dialog.component.html',
  styleUrls: ['./cidade-form-dialog.component.css']
})

export class CidadeFormDialogComponent implements OnInit, AfterViewInit {
  myControl = new FormControl<string | Estado>('');
  options!: Estado[];
  filteredOptions: Observable<Estado[]>;

  @ViewChild(MatAutocompleteTrigger) trigger!: MatAutocompleteTrigger;

  constructor(private estadoService: EstadoService) {
    //estadoService.list().subscribe(estados=> this.options = estados);
    this.filteredOptions = estadoService.list();
    this.filteredOptions.subscribe(estados => {
      this.options = estados;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.nome;
          return name ? this._filter(name as string) : this.options.slice();
        }),
      );
    });

  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.trigger.panelClosingActions.subscribe(e => {
      if (!(e && e.source)) {
        this.myControl.setValue('');
        this.trigger.closePanel();
      }
    });
  }

  displayFn(estado: Estado): string {
    return estado && estado.nome ? estado.nome : '';
  }

  private _filter(value: string): Estado[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.nome.toLowerCase().includes(filterValue));
  }
}




  // constructor(
  //   public dialogRef: MatDialogRef<CidadeFormDialogComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: Cidade
  // ) {}

  // ngOnInit(): void {
  // }

  // onCancel(): void {
  //   this.dialogRef.close();
  // }

