import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Lek} from "../../models/lek";

@Injectable({
  providedIn: 'root'
})
export class DrugsService {
  private BASE_URL = "http://localhost:8080/apoteka/leks/";

  constructor(private http: HttpClient) {
  }

  getAllDrugs(): Observable<any[]> {
    return this.http.get(this.BASE_URL).pipe(
      map((data: any) => data.map((item: any) => this.createDrugFromData(item)))
    );
  }

  saveDrug(data: any) {
    return this.http.post(this.BASE_URL, data).pipe(map((response: any) => response));
  }

  deleteDrug(id: number) {
    const url = this.BASE_URL + "" + id;
    return this.http.delete(url).pipe(map((item: any) => item));
  }

  update(drug: Lek): Observable<any> {
    return this.http.put(`${this.BASE_URL}`, drug, {responseType: "json"});
  }

  private createDrugFromData(item: any) {

    return new Lek(item.id,
      item.naziv, item.opis,
      item.tip, item.cena, item.proizvodjac)
  }
}
