export class Lek {
  id: number;
  naziv: string;
  opis: string;
  tip: string;
  cena: number;
  proizvodjac: string;

  constructor(id: number, naziv: string, opis: string, tip: string, cena: number, proizvodjac: string) {
    this.id = id;
    this.naziv = naziv;
    this.opis = opis;
    this.tip = tip;
    this.cena = cena;
    this.proizvodjac = proizvodjac;
  }

}
