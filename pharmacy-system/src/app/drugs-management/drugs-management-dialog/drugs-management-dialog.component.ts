import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Lek} from "../../models/lek";
import {DrugsService} from "../../services/drugs/drugs.service";

@Component({
  selector: 'app-drugs-management-dialog',
  templateUrl: './drugs-management-dialog.component.html',
  styleUrls: ['./drugs-management-dialog.component.scss']
})
export class DrugsManagementDialogComponent implements OnInit {

  added: boolean = false;
  private lek: Lek | undefined;

  form = new FormGroup({
    id: new FormControl(null),
    naziv: new FormControl(null),
    opis: new FormControl(null),
    tip: new FormControl(null),
    cena: new FormControl(null),
    proizvodjac: new FormControl(null)
  });

  // @ts-ignore
  constructor(@Inject(MAT_DIALOG_DATA) public data,
              private service: DrugsService,
              private dialogRef: MatDialogRef<DrugsManagementDialogComponent>) {
    if (data) {
      this.lek = data.element;
      console.log(this.lek);
    }
  }

  ngOnInit(): void {
    if (this.lek) {
      this.form.setValue(this.lek);
    }
  }

  add() {
    this.lek = this.form.value;
    if (this.lek?.id) {
      this.service.update(this.lek).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.service.saveDrug(this.lek).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
