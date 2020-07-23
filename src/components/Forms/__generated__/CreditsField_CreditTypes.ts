/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CreditsField_CreditTypes
// ====================================================

export interface CreditsField_CreditTypes_allCreditTypes {
  __typename: "CreditType";
  itemId: number;
  text: string;
  value: number;
}

export interface CreditsField_CreditTypes_me {
  __typename: "User";
  itemId: number;
}

export interface CreditsField_CreditTypes {
  allCreditTypes: CreditsField_CreditTypes_allCreditTypes[] | null;
  me: CreditsField_CreditTypes_me | null;
}
