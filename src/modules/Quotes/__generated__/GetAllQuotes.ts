/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllQuotes
// ====================================================

export interface GetAllQuotes_allQuotes_source {
  __typename: "User";
  id: string;
  fname: string;
  sname: string;
}

export interface GetAllQuotes_allQuotes {
  __typename: "Quote";
  id: string;
  date: any;
  text: any;
  source: GetAllQuotes_allQuotes_source;
}

export interface GetAllQuotes {
  allQuotes: GetAllQuotes_allQuotes[] | null;
}
