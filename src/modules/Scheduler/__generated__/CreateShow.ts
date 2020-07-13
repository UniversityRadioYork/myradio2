/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateShowInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateShow
// ====================================================

export interface CreateShow_createShow {
  __typename: "Show";
  itemId: number;
}

export interface CreateShow {
  createShow: CreateShow_createShow | null;
}

export interface CreateShowVariables {
  input?: CreateShowInput | null;
}
