/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MyShows
// ====================================================

export interface MyShows_me_shows_allSeasons {
  __typename: "Season";
  id: string;
  itemId: number;
  seasonNumber: number;
  firstTime: any | null;
}

export interface MyShows_me_shows {
  __typename: "Show";
  id: string;
  itemId: number;
  title: string;
  description: any;
  allSeasons: (MyShows_me_shows_allSeasons | null)[] | null;
}

export interface MyShows_me {
  __typename: "User";
  itemId: number;
  shows: MyShows_me_shows[] | null;
}

export interface MyShows {
  me: MyShows_me | null;
}

export interface MyShowsVariables {
  thisTerm?: boolean | null;
}
