/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: SingleShow
// ====================================================

export interface SingleShow_allSeasons {
  __typename: "Season";
  id: string;
  itemId: number;
  seasonNumber: number;
  firstTime: any | null;
}

export interface SingleShow {
  __typename: "Show";
  id: string;
  itemId: number;
  title: string;
  description: any;
  allSeasons: (SingleShow_allSeasons | null)[] | null;
}
