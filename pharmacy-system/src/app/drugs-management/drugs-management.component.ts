import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DrugsService} from "../services/drugs/drugs.service";
import {Lek} from "../models/lek";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DrugsManagementDialogComponent} from "./drugs-management-dialog/drugs-management-dialog.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {filterDrugs} from "../filter/filterDrugs";

@Component({
  selector: 'app-drugs-management',
  templateUrl: './drugs-management.component.html',
  styleUrls: ['./drugs-management.component.scss']
})

export class DrugsManagementComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ["naziv", "opis", "cena", "proizvodjac", "actions"];
  list: any[] = [];


  constructor(private service: DrugsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllDrugs();
  }

  getAllDrugs() {
    this.service.getAllDrugs().subscribe(data => {
      console.log(data)
      if (data) {
        this.list = data;
        this.dataSource.data = this.list;
      }
    });
  }

  // @ts-ignore
  openDialog(element: Lek = null) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = "30%";
    dialogConfig.data = {
      element
    };

    console.log("skrr", element);
    this.dialog.open(DrugsManagementDialogComponent, dialogConfig).afterClosed().toPromise().then(data => {
      if (data) {
        this.getAllDrugs();
      }
    });
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: "50%",
      backdropClass: "background"
    });
    dialogRef.afterClosed().toPromise().then(result => {
      if (result !== undefined) {
        if (result === true) {
          this.service.deleteDrug(id).toPromise().then(() => {
            this.getAllDrugs();
          }, err => {
            console.log(err);
          });
        } else if (result === false) {
          dialogRef.close();
        }
      }
    });
  }

  searchFilter(searchValue: string): void {
    this.dataSource.data = this.list.filter((lek) => {
      return filterDrugs(lek, searchValue);
    });
  }
}
