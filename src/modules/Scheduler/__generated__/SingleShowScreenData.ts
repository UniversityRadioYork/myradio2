/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SingleShowScreenData
// ====================================================

export interface SingleShowScreenData_show_allSeasons {
  __typename: "Season";
  id: string;
  itemId: number;
  seasonNumber: number;
  firstTime: any | null;
}

export interface SingleShowScreenData_show {
  __typename: "Show";
  id: string;
  itemId: number;
  title: string;
  description: any;
  allSeasons: (SingleShowScreenData_show_allSeasons | null)[] | null;
}

export interface SingleShowScreenData {
  show: SingleShowScreenData_show | null;
}

export interface SingleShowScreenDataVariables {
  itemId: number;
}
