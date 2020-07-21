/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreateShowFormData
// ====================================================

export interface CreateShowFormData_allGenres {
  __typename: "Genre";
  value: number;
  text: string;
}

export interface CreateShowFormData_allSubtypes {
  __typename: "ShowSubtype";
  id: string;
  itemId: number;
  name: string;
  class: string;
}

export interface CreateShowFormData_allCreditTypes {
  __typename: "CreditType";
  value: number;
  text: string;
}

export interface CreateShowFormData {
  allGenres: CreateShowFormData_allGenres[] | null;
  allSubtypes: CreateShowFormData_allSubtypes[] | null;
  allCreditTypes: CreateShowFormData_allCreditTypes[] | null;
}
