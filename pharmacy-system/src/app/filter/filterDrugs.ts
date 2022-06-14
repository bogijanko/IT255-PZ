import {genericFilter} from "./filter";
import {Lek} from "../models/lek";

export const filterDrugs = (lek: Lek, searchString: string) => {
  const priceListData = [lek.naziv, String(lek.cena), lek.naziv, lek.opis, lek.tip,
    lek.proizvodjac]
    .filter(f => f); // strip null/undefined values
  return genericFilter(priceListData, searchString);
};
