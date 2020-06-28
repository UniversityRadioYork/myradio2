import { makeNoArgRequestor } from "./request";

export interface ShowSubtype {
  id?: number;
  name: string;
  class: string;
}

export const showSubtype = {
  getAll: makeNoArgRequestor<ShowSubtype[]>("GET", "/showSubtype/all"),
};
