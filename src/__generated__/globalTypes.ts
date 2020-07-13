/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateShowInput {
  title: string;
  description: any;
  credits: ShowCreditInput;
  genres?: number[] | null;
  tags?: string[] | null;
  podcast_explicit?: boolean | null;
  subtype: string;
  mixclouder?: boolean | null;
  location?: number | null;
}

export interface ShowCreditInput {
  memberid: number[];
  credittype: number[];
}

//==============================================================
// END Enums and Input Objects
//==============================================================
